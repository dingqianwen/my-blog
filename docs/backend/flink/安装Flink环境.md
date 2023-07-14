---
lang: zh-CN  
title: 安装Flink环境      
description: 页面的描述  
head:

- [meta, {name: keywords, content: '安装Flink环境'}]
- [meta, {name: description, content: '安装Flink环境'}]

---

# 安装Flink环境

[下载地址](https://flink.apache.org/downloads/#apache-flink-1136)

放到指定文件夹后，执行以下命令，解压下载的包并运行

```shell
tar -zxvf flink-1.17.1-bin-scala_2.12.tgz
cd flink-1.17.1
./bin/start-cluster.sh

# 关闭命令
# ./bin/stop-cluster.sh
```

访问WebUI地址：[localhost:8081](http://localhost:8081)


<Comment></Comment>
