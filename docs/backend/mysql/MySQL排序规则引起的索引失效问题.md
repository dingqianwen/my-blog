---
lang: zh-CN  
title: MySQL排序规则引起的索引失效问题  
description: 页面的描述   
head:

- [meta, {name: keywords, content: 'MySQL排序规则引起的索引失效问题'}]

---

# MySQL排序规则引起的索引失效问题

[[toc]]


## 事情产生的原因

因为系统涉及到数据同步到TiDB，通过Flink同步某张表（`table_a`）数据时缺少主键报错，然后通过以下方式创建了一个带主键的新表,生产环境进行替换操作

```sql
-- 表数据千万

-- 创建一个带主键的新表
CREATE TABLE `table_a_temp` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `col_1` varchar(50) DEFAULT NULL,
                           `col_2` varchar(50) DEFAULT NULL,
                           PRIMARY KEY (`id`),
                           KEY `table_a_col_1_index` (`col_1`),
                           KEY `table_a_col_2_index` (`col_2`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE = utf8mb4_bin;

-- 填充新表数据
insert into table_a_temp(col_1,col_2) select * from table_a;

-- 替换表名
rename table table_a to table_a_bak;
rename table table_a_temp to table_a;
```

由于操作完成后已经很晚了，大致看了下，没出现什么问题，就回家了。

## 第二天

DBA扫描生产环境慢SQL时发现某一条SQL执行耗时30秒左右，首先我拿到慢SQL在本地通过`explain`分析，均能命中索引，然后拿到SQL去生产执行分析却没有正确命中索引，SQL大致如下

```sql
SELECT a.*
from table_a a
         left join table_b b on a.col_1 = b.col_1
where a.col_2 = 'abc'
order by a.col_1
LIMIT 10
```

`explain`分析命中索引`table_a_col_1_index`,而不是`table_a_col_2_index`，查询耗时大概20多秒，然后如果SQL套用刚被切走的老表如下

```sql
SELECT a.*
from table_a_bak a -- 修改此处为老表
         left join table_b b on a.col_1 = b.col_1
where a.col_2 = 'abc'
order by a.col_1
LIMIT 10
```

则是能正确命中索引，耗时0.几秒内完成，找了各种问题，实验了各种方法，最后发现如果SQL改为如下方式

```sql
SELECT a.*
from table_a a
         left join table_b b on a.col_1 = b.col_1
where a.col_2 = 'abc'
order by a.col_2,a.col_1
LIMIT 10
```

则可以正确命中索引`table_a_col_2_index`,千万数据查询下来大概0.几秒内完成，为了暂时解决这个慢SQL不影响生产环境使用，决定临时增加组合索引

```sql
create index table_a_col_1_col_2_index
	on table_a (col_2, col_1);
```

至此生产问题只是暂时解决；

## 第三天

又出现这个表的另外一个慢SQL，只是查询条件换了以下，之前方式完全不能用了，但也不能一味的增加组合索引去解决这个问题。由于晚上不涉及此表业务，则决定今晚对此表索引重新收集；
> 注意：执行大概锁表几分钟

```sql
analyze table table_a;
optimize table table_a;
```

命令执行完后，生产依然没有解决，本地环境一直都是好好的，我发现已经见鬼了，已经不能用科学去解释了，出现了三体里面的智子了，像双缝干涉实验一样神奇。

## 原因

通过一系列操作，后来DBA通过分析新表`table_a` 与被切换走的表`table_a_bak`的SQL语句得到问题所在，SQL语句的差异性

```sql
-- 新表
COLLATE = utf8mb4_bin
-- 原有的表
COLLATE = utf8mb4_general_ci
```

- utf8mb4_general_ci：ci即case insensitive，不区分大小写。没有实现Unicode排序规则，在遇到某些特殊语言或者字符集，排序结果可能不一致。但是，在绝大多数情况下，这些特殊字符的顺序并不需要那么精确。  
- utf8mb4_bin：将字符串每个字符用二进制数据编译存储，区分大小写，而且可以存二进制的内容。

后面修改了下，至此问题总算解决了，还是由于本人的疏忽导致，没有去对比生产环境的建表语句；

<Comment></Comment>
