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

编写如下代码，配置数据源以及监听的表。

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

## 窗口函数

先聚合一个批次，再写入数据库，减轻数据库的压力，`countWindowAll(10)`表示当数据汇总到10个，执行一次。

```java
env.fromSource(**)
.map(new MapFunction<String, String>() {
   ***
})
.countWindowAll(10)
.apply(new AllWindowFunction<String, List<String>, GlobalWindow>() {
    @Override
    public void apply(GlobalWindow globalWindow, Iterable<String> iterable, Collector<List<String>> collector) throws Exception {
        List<String> skuInfos = Lists.newArrayList(iterable);
        if (skuInfos.size() > 0) {
            collector.collect(skuInfos);
        }
    }
})
.addSink(new RichSinkFunction<List<String>>() {
    @Override
    public void invoke(List<String> value, Context context) {
        ***
    }
});
```

## 启用检查点

当服务停止后，期间表数据发生变动，启动程序后可以继续从上次读取的`binlog`行数继续读取。

```java
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment(conf);
env.enableCheckpointing(5000)
CheckpointConfig cpf = env.getCheckpointConfig();
// 设置检查点保存路径,可以配置为hdfs地址等
cpf.setCheckpointStorage("file:///Users/dingqianwen/point/");
```

当程序运行的时候，通过配置的`env.enableCheckpointing(5000)`每5秒向该目录存储最新的检查点。路径格式如下：

```text
/Users/dingqianwen/point/1a4f32e1d98a81882f72ede7d3ccaf60/chk-34
```

当程序重新启动的时候，可以拿到最新的保存点去恢复任务继续执行，代码设置如下：

```java
Configuration conf = new Configuration();
conf.setString("execution.savepoint.path", "file:///Users/dingqianwen/point/1a4f32e1d98a81882f72ede7d3ccaf60/chk-34");
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment(conf);
```

通过Flink提供的可视化页面在提交任务执行的时候也可以输入从某保存点继续任务。


<Comment></Comment>
