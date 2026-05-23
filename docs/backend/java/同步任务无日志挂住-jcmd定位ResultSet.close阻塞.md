---
lang: zh-CN
title: 同步任务无日志挂住：jcmd 定位 ResultSet.close 阻塞
description: 线上定时同步任务跑完查询日志后静默挂住，jcmd 导出线程 Dump，按线程名 grep 到 WAITING 栈，根因在游标 ResultSet 关闭时读 socket 阻塞。
head:

  - [ meta, { name: keywords, content: 'Java, 同步任务卡死, 线程Dump, jcmd, 虚拟线程, WAITING, 游标查询, ResultSet' } ]

---

# 同步任务无日志挂住：jcmd 定位 ResultSet.close 阻塞

[[toc]]

## 现象

线上有个定时同步任务，正常情况下跑完会打结束日志。某次开始：

- 任务状态一直显示在执行，长时间不结束；
- 查库、往下游写数据的过程中，下游因连接问题写入失败，子组件重试三次后打出「重试完毕」日志；
- 进程还在，JVM 没挂，之后再也没有任何业务日志。

## 问题代码

分片查询入口，`CURSOR` 分支就是下面标出来的那行：

<!-- @formatter:off -->
```java {10}
public long runPartition(long jobExecutionId,
                         int partitionIndex, StepExecution workerStepExecution) throws Exception {
    ...
    QueryType queryType = jqc.getQueryType();
    log.info("开始执行分片查询: {}, 当前实例: {}, 切分类型: {}, 切分列: {}, 参数值: {}, 查询语句: {}",
        workerStepExecution.getStepName(), instanceId, splitQuery.getColumnType(),
        splitQuery.getColumn(), params, partitionSql);
    JdbcSource source = jqc.getSourceManager().getSource(
        jqc.getWorkspaceCode(), jqc.getDataSourceCode(), JdbcSource.class);
    TimeInterval timer = DateUtil.timer();
    try (Connection connection = source.getConnection()) {
        long total = switch (queryType) {
            case CURSOR -> jqc.cursorQuery(transmit, context, connection, partitionSql, limit, params);
            case PAGE -> jqc.paginationQuery(transmit, context, connection, partitionSql, limit, params);
            case SCROLL -> jqc.scrollQuery(transmit, context, connection, partitionSql, limit, params);
        };
        log.info("分片查询执行完成: {}, 当前实例: {}, 切分类型: {}, 切分列: {}, 参数值: {}, 处理数据量: {}",
            workerStepExecution.getStepName(), instanceId, splitQuery.getColumnType(),
            splitQuery.getColumn(), params, total);
        return total;
    } finally {
        log.info("分片查询执行耗时: {}", timer.intervalPretty());
    }
    ...
}
```
<!-- @formatter:on -->

`cursorQuery` 里用游标拉数，攒够一批就 `deliverToNext` 往下游送：

<!-- @formatter:off -->
```java
public long cursorQuery(Transmit transmit, Context context, Connection connection, String sql,
                            Long limit, List<Object> params) throws Exception {
    long total = 0;
    PreparedStatement statement = null;
    ResultSet resultSet = null;
    try {
        statement = connection.prepareStatement(sql, ResultSet.TYPE_FORWARD_ONLY, ResultSet.CONCUR_READ_ONLY);
        statement.setQueryTimeout(this.getQueryTimeout());
        statement.setFetchSize(this.cursorQueryFetchSize(limit));
        this.setParameterValue(statement, params);
        resultSet = statement.executeQuery();
        BatchPlainRecord records = new BatchPlainRecord();
        while (resultSet.next()) {
            Map<String, Object> record = ColumnMapRowMapper.getInstance().mapRow(resultSet, this::convertValue);
            records.add(new PlainRecord(record));
            total++;
            if (records.size() >= limit) {
                this.deliverToNext(transmit, context, records);
                records = new BatchPlainRecord();
            }
        }
        if (!records.isEmpty()) {
            this.deliverToNext(transmit, context, records);
        }
    } finally {
        IoUtils.close(resultSet, statement);
    }
    return total;
}
```
<!-- @formatter:on -->

## 日志分析

- 有「开始执行分片查询」，说明 SQL 已经跑起来了；
- 没有「分片查询执行完成」，也没有外层的「分片查询执行耗时」——`finally` 没跑完；
- `deliverToNext` 的重试日志已经打完，随后异常抛出，`while` 退出进入 `finally`，卡死发生在 `finally` 的收尾阶段。

## 导出线程 Dump

服务在容器里跑时，Java 进程经常是 PID 1：

```shell
jcmd <PID> Thread.dump_to_file -format=text /tmp/threaddump.txt
# 1:
# Created /tmp/threaddump.txt
```

## 用 grep 按线程名定位

根据之前查询的最后几个日志，得到打印的线程名称，可以先按名字筛：

```shell
grep -n "parallel-ve-483" /tmp/threaddump.txt
# 无输出

grep -n "askExecutor-693" /tmp/threaddump.txt
# 输出 1992:#1892 "SimpleAsyncTaskExecutor-693" virtual WAITING 2026-05-21T17:03:15.369490969Z
```

### 1. 搜不到 `parallel-ve-483`

`parallel-ve-483` 是 Java 21+ 的 **virtual 线程**，如果它卡死了，理论上应该能在 Dump 里搜到它的名字。**搜不到**
说明它不是卡死的主线程，或者它根本没启动（例如被异常提前结束了）。

### 2. 分析 `askExecutor-693` 为 virtual + WAITING

返回的线程名是 `SimpleAsyncTaskExecutor-693`，而且状态是 `WAITING`，说明它在等某个事件（锁、I/O、子任务完成等）。

从命中行往下看栈（行号按实际 Dump 调整）：

```shell
sed -n '1992,2030p' /tmp/threaddump.txt
```

关键几帧：

```text
#1892 "SimpleAsyncTaskExecutor-693" virtual WAITING ...
    at java.base/sun.nio.ch.NioSocketImpl.implRead(NioSocketImpl.java:307)
    ...
    at com.mysql.cj.protocol.a.result.ResultsetRowsStreaming.next(ResultsetRowsStreaming.java:206)
    at com.mysql.cj.protocol.a.result.ResultsetRowsStreaming.close(ResultsetRowsStreaming.java:109)
    at com.mysql.cj.jdbc.result.ResultSetImpl.doClose(ResultSetImpl.java:1965)
    at com.mysql.cj.jdbc.result.ResultSetImpl.close(ResultSetImpl.java:578)
    at cn.dataplatform.common.util.IoUtils.close(IoUtils.java:27)
    at cn.dataplatform.flow.service.core.component.query.JdbcQueryFlowComponent.streamQuery(...)
    at cn.dataplatform.flow.service.core.component.query.partition.JdbcQueryTasklet.runPartition(...)
```

栈顶落在 `IoUtils.close` → `ResultSet.close`，线程在等 MySQL 连接上的 `socket` 读。

## 问题根因

导致线程在 `ResultSet.close()` 时静默挂住的原因主要有三点：

1. **驱动强制“抽干”数据**：因为开启了游标流式查询，当 `while` 循环因异常中断时，MySQL 服务端仍在源源不断地发送剩余数据。MySQL
   驱动为了保证连接后续能复用，在 `ResultSet.close()` 时**必须把通道里残余的数据全部读完并丢弃**（栈中的
   `ResultsetRowsStreaming.close` 正在循环触发 `next()` 读数据）。
2. **QueryTimeout 失效**：`setQueryTimeout()` 只管 SQL 执行，管不到 `ResultSet.close()` 阶段。
3. **Socket 永久等待**：在关闭并“抽干”数据的过程中，如果网络卡顿，底层 `NioSocketImpl.implRead` 就会陷入等待。在没有配置
   `socketTimeout` 的情况下（默认是 0，即永不超时），线程就会在此处死死卡住。

## 解决过程与尝试

针对这个挂住的问题，我先后尝试了三种方案：

### 1. 尝试升级 MySQL 驱动版本（无果）

起初怀疑是老版本驱动的 Bug，尝试将 `mysql-connector-j` 从 **`9.2.0`** 升级到了 **`9.7.0`**。

* **结果**：无济于事。新版本驱动依然保持相同的底层流式清理逻辑，线程 Dump 栈完全没有变化，依旧卡在 `ResultSet.close()`。

### 2. 尝试 `statement.cancel()` 打断（无果）

在下游失败后，尝试在 `finally` 之前显式调用 `statement.cancel()`，期望以此打断服务端的继续流式推送。

* **结果**：依然无效。`cancel()` 需要通过独立连接向 MySQL 发送 `KILL QUERY` 信号，在网络通道已满或阻塞时该指令无法及时生效。驱动依然会固执地在
  `close` 时去“抽干”数据，同样卡死在 `socket` 读上。

### 3. 最终方案：`connection.abort()` 硬断连接（成功）

既然驱动非要为了复用连接而死磕残余数据，那干脆就不要复用了。

如果游标没有正常读完（下游失败或中途异常），`finally` 里不再走正常的 `IoUtils.close()`，而是直接调用 `connection.abort()`
把整条 TCP 连接掐掉。这样逼迫底层 Socket 立即断开，避免驱动在 `close` 阶段去清空 `streaming` 数据：
<!-- @formatter:off -->
```java
boolean successAndFullyRead = false;
try {
    statement = connection.prepareStatement(sql, ResultSet.TYPE_FORWARD_ONLY, ResultSet.CONCUR_READ_ONLY);
    // ...
    while (resultSet.next()) {
        // ...
        this.deliverToNext(transmit, context, records);
    }
    if (!records.isEmpty()) {
        this.deliverToNext(transmit, context, records);
    }
    successAndFullyRead = true;
} finally {
    if (!successAndFullyRead) {
        try {
            connection.abort(Runnable::run);
        } catch (Throwable t) {
            log.error("游标查询连接强制关闭失败", t);
        }
    } else {
        IoUtils.close(resultSet, statement);
    }
}
```
<!-- @formatter:on -->
正常跑完的路径依然走 IoUtils.close 确保连接池复用；只有异常中断时才触发 abort。这样被丢弃的连接会被 HikariCP
作废并从池中剔除，彻底解决了卡死问题。

<Comment></Comment>
