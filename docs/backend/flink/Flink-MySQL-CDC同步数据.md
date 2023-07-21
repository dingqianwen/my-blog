---
lang: zh-CN  
title: Flink-MySQL-CDC同步表数据        
description: Flink-MySQL-CDC同步表数据  
head:

- [meta, {name: keywords, content: 'Flink-MySQL-CDC同步表数据,订阅BinLog日志'}]
- [meta, {name: description, content: 'Flink-MySQL-CDC同步表数据'}]

---

# Flink-MySQL-CDC同步表数据

[[toc]]

## 资料

[Flink-CDC Github地址](https://github.com/ververica/flink-cdc-connectors)  
[文档地址](https://ververica.github.io/flink-cdc-connectors/master/)

## 简介

CDC 即 Change Data Capture
变更数据捕获，为Flink 1.11中一个新增功能。我们可以通过 CDC 得知数据源表的更新内容（包含Insert、Update和Delete），并将这些更新内容作为数据流发送到下游系统。捕获到的数据操作具有一个标识符，分别对应数据的增加，修改和删除。

## 常见开源CDC比较

||Flink CDC|Debezium|Canal|  
|-|-|-|-|  
|增量同步|V|V|V|
|断点续传|V|V|V|
|全量同步|V|V|X|
|全量+增量|V|V|X|
|架构|分布式|单机|单机|
|生态|🌟🌟🌟🌟🌟|🌟🌟🌟|🌟🌟🌟|

## Flink CDC 版本介绍

### Flink CDC 1.x  

- 全量 + 增量读取的过程需要保证所有数据的一致性，因此需要通过加锁保证，但是加锁在数据库层面上是一个十分高危的操作。底层 `Debezium` 在保证数据一致性时，需要对读取的库或表加锁，全局锁可能导致数据库锁住，表级锁会锁住表的读，DBA 一般不给锁权限。
- 不支持水平扩展，因为 Flink CDC 底层是基于 `Debezium`，起架构是单节点，所以Flink CDC 只支持单并发。在全量阶段读取阶段，如果表非常大 (亿级别)，读取时间在小时甚至天级别，用户不能通过增加资源去提升作业速度。
- 全量读取阶段不支持 checkpoint：CDC 读取分为两个阶段，全量读取和增量读取，目前全量读取阶段是不支持 checkpoint 的，因此会存在一个问题：当我们同步全量数据时，假设需要 5 个小时，当我们同步了 4 小时的时候作业失败，这时候就需要重新开始，再读取 5 个小时。

###  Flink CDC 2.x

- 无锁
- 水平扩展
- 支持checkpoint

借鉴`Netflix`的DBlog paper 全程无锁  
基于`Flink Flip-27` Source实现


## 简单用法

本文描述监听MySQL某个表数据变动后，处理对应的逻辑，然后落入到新表等，首先引入以下依赖

```xml

<dependencies>
    <dependency>
        <groupId>com.ververica</groupId>
        <artifactId>flink-connector-mysql-cdc</artifactId>
        <version>2.4.0</version>
    </dependency>
    <dependency>
        <groupId>org.apache.flink</groupId>
        <artifactId>flink-java</artifactId>
        <version>1.17.1</version>
    </dependency>
    <dependency>
        <groupId>org.apache.flink</groupId>
        <artifactId>flink-runtime-web</artifactId>
        <version>1.17.1</version>
    </dependency>
    <dependency>
        <groupId>org.apache.flink</groupId>
        <artifactId>flink-streaming-java</artifactId>
        <version>1.17.1</version>
    </dependency>
    <dependency>
        <groupId>org.apache.flink</groupId>
        <artifactId>flink-connector-base</artifactId>
        <version>1.17.1</version>
    </dependency>
    <dependency>
        <groupId>org.apache.flink</groupId>
        <artifactId>flink-table-common</artifactId>
        <version>1.17.1</version>
    </dependency>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.27</version>
        <exclusions>
            <exclusion>
                <groupId>com.google.protobuf</groupId>
                <artifactId>protobuf-java</artifactId>
            </exclusion>
        </exclusions>
    </dependency>
</dependencies>
```

模拟编写如下代码，配置数据源以及监听的表。

```java
package org.example.flink;

import com.ververica.cdc.connectors.mysql.source.MySqlSource;
import com.ververica.cdc.debezium.JsonDebeziumDeserializationSchema;
import lombok.extern.slf4j.Slf4j;
import org.apache.flink.api.common.eventtime.WatermarkStrategy;
import org.apache.flink.api.common.functions.MapFunction;
import org.apache.flink.configuration.Configuration;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;
import org.apache.flink.streaming.api.functions.sink.RichSinkFunction;


/**
 * @author dingqianwen
 */
@Slf4j
public class MySqlSourceExample {

    public static void main(String[] args) throws Exception {
        Configuration conf = new Configuration();
        StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment(conf);
        MySqlSource<String> mySqlSource = MySqlSource.<String>builder()
                .hostname("数据库地址")
                .port(3306)
                .databaseList("监听的数据库")
                .tableList("监听的数据库.表")
                .username("数据库用户")
                .password("数据库密码")
                .deserializer(new JsonDebeziumDeserializationSchema())
                .build();
        // enable checkpoint
        env.enableCheckpointing(5000);
        env.setParallelism(1);
        env.fromSource(mySqlSource, WatermarkStrategy.noWatermarks(), "MySQL Source")
                .map(new MapFunction<String, String>() {
                    @Override
                    public String map(String value) {
                        log.info("对数据做处理转换======>" + value);
                        return value;
                    }
                })
                .addSink(new RichSinkFunction<String>() {
                    @Override
                    public void invoke(String value, Context context) {
                        log.info("后置数据处理======>" + value);
                    }
                });
        env.execute("Print MySQL Snapshot + Binlog");
    }

}
```

启动应用程序后，如果监听的表数据发生变动，则会打印如下信息：

```text
...
16:36:18.613 [Map (11/12)#2] INFO org.example.flink.MySqlSourceExample - 对数据做处理转换======>{"before":{"id":2,"code":"bbb","name":"bbb-1","created":"2023-07-12T09:04:07Z"},"after":{"id":2,"code":"bbb","name":"bbb-2","created":"2023-07-12T09:04:07Z"},"source":{"version":"1.9.7.Final","connector":"mysql","name":"mysql_binlog_source","ts_ms":1689323705000,"snapshot":"false","db":"test","sequence":null,"table":"user","server_id":3306,"gtid":"b01993bc-d9de-11ed-9f73-e4434bb57578:627577","file":"logsmysql-bin.000007","pos":78894988,"row":0,"thread":263022480,"query":null},"op":"u","ts_ms":1689323705736,"transaction":null}
...
```

项目打`jar`后提交到Flink即可运行。


<Comment></Comment>
