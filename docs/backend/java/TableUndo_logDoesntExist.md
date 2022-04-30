---
lang: zh-CN  
title: 'SQLSyntaxErrorException: Table seata-demo.undo_log doesnt exist'  
description: 页面的描述
---

# SQLSyntaxErrorException: Table 'seata-demo.undo_log' doesn't exist

报错信息如下：

```text
2022-05-01 03:18:21.053 ERROR 29498 --- [nio-9010-exec-2] o.a.c.c.C.[.[.[/].[dispatcherServlet]    : Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed; nested exception is org.springframework.jdbc.BadSqlGrammarException: 
### Error updating database.  Cause: java.sql.SQLException: java.sql.SQLSyntaxErrorException: Table 'seata-demo.undo_log' doesn't exist
### The error may exist in org/example/store/mapper/OrderMapper.java (best guess)
### The error may involve org.example.store.mapper.OrderMapper.update-Inline
### The error occurred while setting parameters
### SQL: UPDATE `order`  SET name=?      WHERE id = ?
### Cause: java.sql.SQLException: java.sql.SQLSyntaxErrorException: Table 'seata-demo.undo_log' doesn't exist
; bad SQL grammar []; nested exception is java.sql.SQLException: java.sql.SQLSyntaxErrorException: Table 'seata-demo.undo_log' doesn't exist] with root cause

java.sql.SQLSyntaxErrorException: Table 'seata-demo.undo_log' doesn't exist
	at com.mysql.cj.jdbc.exceptions.SQLError.createSQLException(SQLError.java:120) ~[mysql-connector-java-8.0.16.jar:8.0.16]
```

AT模式客户端服务的数据库都需要建表`undo_log`，官方SQL脚本如下

```sql
-- for AT mode you must to init this sql for you business database. the seata server not need it.
CREATE TABLE IF NOT EXISTS `undo_log`
(
    `branch_id`     BIGINT       NOT NULL COMMENT 'branch transaction id',
    `xid`           VARCHAR(128) NOT NULL COMMENT 'global transaction id',
    `context`       VARCHAR(128) NOT NULL COMMENT 'undo_log context,such as serialization',
    `rollback_info` LONGBLOB     NOT NULL COMMENT 'rollback info',
    `log_status`    INT(11)      NOT NULL COMMENT '0:normal status,1:defense status',
    `log_created`   DATETIME(6)  NOT NULL COMMENT 'create datetime',
    `log_modified`  DATETIME(6)  NOT NULL COMMENT 'modify datetime',
    UNIQUE KEY `ux_undo_log` (`xid`, `branch_id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8 COMMENT ='AT transaction mode undo table';
```


<Comment></Comment>
