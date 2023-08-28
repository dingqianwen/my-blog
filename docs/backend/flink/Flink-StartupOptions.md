---
lang: zh-CN  
title: Flink StartupOptions        
description: 页面的描述  
head:

- [meta, {name: keywords, content: 'Flink StartupOptions'}]
- [meta, {name: description, content: 'Flink StartupOptions'}]

---

# Flink StartupOptions设置

```java
MySqlSource.<String>builder()..startupOptions(StartupOptions.**())
```

Flink Source支持以下5种（`StartupOptions`）启动参数：

- `StartupOptions.initial()`:  
  第一次启动时读取原表已有的历史数据, 操作类型为READ, 之后不断做检查点存储   
  第二次启动时一定要指明检查点文件的具体位置, 这样就可以断点续传; 即使Flink宕机了, 重启后是从上次offset开始读, 而不是latest
  检查点在打包部署后才有用, 因为那样才可以指明检查点的具体位置；

- `StartupOptions.earliest()`:  
  从BinLog第一行数据开始读, 最好先给这个数据库加上BinLog后, 再去读取创建数据库；

- `StartupOptions.latest()`:  
  读取最新变更数据, 从Flink程序启动后开始算；

- `StartupOptions.timestamp(时间戳)`:  
  可以从BinLog某一时刻的数据开始读；

- `StartupOptions.specificOffset(保存点)`:  
  指明BinLog文件位置和从哪个offset开始读；

<Comment></Comment>
