---
lang: zh-CN
title: Jdbc游标查询resultSet.close()，线程卡死排查
description: 线上定时同步任务无日志卡死，jcmd 导出线程 Dump，grep 线程名定位 WAITING 线程，分析栈找根因。
head:

  - [ meta, { name: keywords, content: 'Java, 同步任务卡死, 线程Dump, jcmd, 虚拟线程, WAITING, 排查' } ]

---

# Jdbc游标查询resultSet.close()，线程卡死排查

[[toc]]

## 现象

线上有一个**定时同步任务**，按设计应周期性跑完并打日志。某次开始：

- 任务状态一直像「在执行」，**长时间不结束**；
- 发现查询数据后发送到下游节点进行保存时，下游节点因连接问题导致写入失败并抛出异常。
- 监控上看进程还在，JVM 未退出，就是**静默挂住**。

## 代码示例

数据分片查询实际执行代码如下，配置了`CURSOR`方式，执行如下第`10`
行代码。
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

`cursorQuery`对应的代码逻辑如下：

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
        // 启动游标查询设置
        statement.setFetchSize(this.cursorQueryFetchSize(limit));
        // 设置参数
        this.setParameterValue(statement, params);
        resultSet = statement.executeQuery();
        BatchPlainRecord records = new BatchPlainRecord();
        while (resultSet.next()) {
            Map<String, Object> record = ColumnMapRowMapper.getInstance().mapRow(resultSet, this::convertValue);
            // 添加记录
            records.add(new PlainRecord(record));
            total++;
            if (records.size() >= limit) {
                // 后续发送
                this.deliverToNext(transmit, context, records);
                // 消费后重置,回收内存,继续下一轮
                records = new BatchPlainRecord();
            }
        }
        if (!records.isEmpty()) {
            // 最后一次发送
            this.deliverToNext(transmit, context, records);
        }
    } finally {
        IoUtils.close(resultSet, statement);
    }
    return total;
}
```
<!-- @formatter:on -->

## 日志排查

- 业务日志停在「开始执行分片查询」行，说明**查询语句已执行**，但**结果未处理完**；
- 但是「分片查询执行耗时」日志没有输出，说明**finally 里也没走完**；
- 并且`deliverToNext`的子组件已经重试三次并结束打印了重试完毕日志，后续再无日志输出。

## 容器内导出线程 Dump

服务跑在容器里时，Java 进程往往是 **PID 1**。

```shell
jcmd <PID> Thread.dump_to_file -format=text /tmp/threaddump.txt
```

输出类似：

```text
1:
Created /tmp/threaddump.txt
```

## 用 grep 按线程名定位

根据之前查询的最后几个日志，得到打印的线程名称，可以先按名字筛：

```shell
grep -n "parallel-ve-483" /tmp/threaddump.txt
# 无输出

grep -n "askExecutor-693" /tmp/threaddump.txt
# 输出 1992:#1892 "SimpleAsyncTaskExecutor-693" virtual WAITING 2026-05-21T17:03:15.369490969Z
```

### 第一路：`parallel-ve-483` 搜不到

`parallel-ve-483` 是 Java 21+ 的 **virtual 线程**，如果它卡死了，理论上应该能在 Dump 里搜到它的名字。**搜不到**
说明它不是卡死的主线程，或者它根本没启动（例如被异常提前结束了）。

### 第二路：`askExecutor-693` 为 virtual + WAITING

返回的线程名是 `SimpleAsyncTaskExecutor-693`，而且状态是 `WAITING`，说明它在等某个事件（锁、I/O、子任务完成等）。

从命中行往下看栈（行号按实际 Dump 调整）：

```shell
sed -n '1992,2030p' /tmp/threaddump.txt
```

典型会看到类似：

```text
sh-5.1# sed -n '1992,2055p' /tmp/threaddump.txt
#1892 "SimpleAsyncTaskExecutor-693" virtual WAITING 2026-05-21T17:03:15.369490969Z
    at java.base/java.lang.VirtualThread.park(VirtualThread.java:738)
    at java.base/java.lang.System$1.parkVirtualThread(System.java:2284)
    at java.base/java.util.concurrent.locks.LockSupport.park(LockSupport.java:367)
    at java.base/sun.nio.ch.Poller.poll(Poller.java:197)
    at java.base/sun.nio.ch.Poller.poll(Poller.java:142)
    at java.base/sun.nio.ch.NioSocketImpl.park(NioSocketImpl.java:174)
    at java.base/sun.nio.ch.NioSocketImpl.park(NioSocketImpl.java:200)
    at java.base/sun.nio.ch.NioSocketImpl.implRead(NioSocketImpl.java:307)
    at java.base/sun.nio.ch.NioSocketImpl.read(NioSocketImpl.java:354)
    at java.base/sun.nio.ch.NioSocketImpl$1.read(NioSocketImpl.java:798)
    at java.base/java.net.Socket$SocketInputStream.implRead(Socket.java:974)
    at java.base/java.net.Socket$SocketInputStream.read(Socket.java:964)
    at com.mysql.cj.protocol.ReadAheadInputStream.fill(ReadAheadInputStream.java:91)
    at com.mysql.cj.protocol.ReadAheadInputStream.readFromUnderlyingStreamIfNecessary(ReadAheadInputStream.java:130)
    at com.mysql.cj.protocol.ReadAheadInputStream.read(ReadAheadInputStream.java:157)
    at java.base/java.io.FilterInputStream.read(FilterInputStream.java:119)
    at com.mysql.cj.protocol.FullReadInputStream.readFully(FullReadInputStream.java:55)
    at com.mysql.cj.protocol.a.SimplePacketReader.readMessageLocal(SimplePacketReader.java:128)
    at com.mysql.cj.protocol.a.SimplePacketReader.readMessage(SimplePacketReader.java:93)
    at com.mysql.cj.protocol.a.SimplePacketReader.readMessage(SimplePacketReader.java:36)
    at com.mysql.cj.protocol.a.TimeTrackingPacketReader.readMessage(TimeTrackingPacketReader.java:53)
    at com.mysql.cj.protocol.a.TimeTrackingPacketReader.readMessage(TimeTrackingPacketReader.java:32)
    at com.mysql.cj.protocol.a.MultiPacketReader.readMessage(MultiPacketReader.java:56)
    at com.mysql.cj.protocol.a.MultiPacketReader.readMessage(MultiPacketReader.java:35)
    at com.mysql.cj.protocol.a.ResultsetRowReader.read(ResultsetRowReader.java:66)
    at com.mysql.cj.protocol.a.ResultsetRowReader.read(ResultsetRowReader.java:33)
    at com.mysql.cj.protocol.a.NativeProtocol.read(NativeProtocol.java:1556)
    at com.mysql.cj.protocol.a.result.ResultsetRowsStreaming.next(ResultsetRowsStreaming.java:206)
    at com.mysql.cj.protocol.a.result.ResultsetRowsStreaming.close(ResultsetRowsStreaming.java:109)
    at com.mysql.cj.jdbc.result.ResultSetImpl.doClose(ResultSetImpl.java:1965)
    at com.mysql.cj.jdbc.result.ResultSetImpl.close(ResultSetImpl.java:578)
    at com.zaxxer.hikari.pool.HikariProxyResultSet.close(HikariProxyResultSet.java)
    at cn.dataplatform.common.util.IoUtils.close(IoUtils.java:27)
    at cn.dataplatform.flow.service.core.component.query.JdbcQueryFlowComponent.streamQuery(Unknown Source)
    at cn.dataplatform.flow.service.core.component.query.JdbcQueryFlowComponent$$FastClassByCGLIB$$5fc8f75d.invoke(<generated>)
    at org.springframework.cglib.proxy.MethodProxy.invoke(MethodProxy.java:231)
    at cn.dataplatform.flow.service.core.proxy.FlowComponentProxy.intercept(FlowComponentProxy.java:191)
    at cn.dataplatform.flow.service.core.component.query.MySQLQueryFlowComponent$$EnhancerByCGLIB$$2e0999b5.streamQuery(Unknown Source)
    at cn.dataplatform.flow.service.core.component.query.partition.JdbcQueryTasklet.runPartition(Unknown Source)
    at cn.dataplatform.flow.service.core.component.query.partition.JdbcQueryTasklet.execute(Unknown Source)
    ...
```

根据线程状态和栈信息，判断出最后执行代码逻辑为`cn.dataplatform.common.util.IoUtils.close(IoUtils.java:27)`

todo

<Comment></Comment>
