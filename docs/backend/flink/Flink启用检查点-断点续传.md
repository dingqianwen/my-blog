---
lang: zh-CN  
title: Flink启用检查点-断点续传  
description: 页面的描述  
head:

- [meta, {name: keywords, content: 'Flink启用检查点-断点续传'}]
- [meta, {name: description, content: 'Flink启用检查点-断点续传'}]

---

# Flink启用检查点-断点续传  


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
