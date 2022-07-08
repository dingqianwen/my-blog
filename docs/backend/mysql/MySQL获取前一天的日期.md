---
lang: zh-CN  
title: MySQL获取前一天的日期      
description: 页面的描述  
head:

- [meta, {name: keywords, content: 'MySQL获取前一天的日期, INTERVAL, mysql'}]

---

# MySQL获取前一天的日期

例如今日日期为`2022-07-08 12:06:12`，获取前一天日期SQL语法如下

```sql
select sysdate() + INTERVAL -1 DAY;
```

输出如下

```text:no-line-numbers
2022-07-07 12:06:12
```

获取未来一天的日期

```sql
select sysdate() + INTERVAL 1 DAY;
```

输出如下

```text:no-line-numbers
2022-07-09 12:06:12
```

其他常用语法

```sql
select sysdate() + INTERVAL '-1 2' DAY_HOUR; -- 过去一天2小时
select sysdate() + INTERVAL '-1 1:1:1' DAY_SECOND; -- 过去一天1小时1分钟1秒
```

<Comment></Comment>
