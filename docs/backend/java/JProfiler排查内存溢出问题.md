---
lang: zh-CN   
title: JProfiler排查内存溢出问题   
description: 页面的描述
---

# JProfiler排查内存溢出问题

[[toc]]

## 事件原因

因我的某一个服务出现莫名重启问题，通过Grafana分析JVM得知是内存溢出导致，老年代瞬间飙升到峰值。 大致初步认定为接口执行没有进行参数校验，导致SQL执行缺少关键参数，查询出数据量太多内存溢出了。

## 分享如何处理

### 须知

以下处理过程不是我真实生产处理，只是线下模拟，记录并撰写博客使用

### 获取快照文件

首先拿到dump快照文件，这个没有的话需要在服务启动时增加如下启动参数，当内存泄漏时自动生成内存dump文件到你的指定目录

```text:no-line-numbers
-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/dev/test_service_jvmDump.hprof
```

### JProfiler工具使用

使用JProfiler程序打开拿到的dump快照文件，如下所示

<img src="https://oss-xuxin.oss-cn-beijing.aliyuncs.com/blog/img/7LEOVp.png" alt="none" style="width: 100%;height: 80%;border-radius: 6px;">

发现此对象`RuleEngineUser`占用了`640MB`内存，实例数量直接达到`10000000`

<img src="https://oss-xuxin.oss-cn-beijing.aliyuncs.com/blog/img/R749km.png" alt="none" style="width: 100%;height: 80%;border-radius: 6px;">

进一步了解，双击第一行数据，然后选择`incoming references`显示这个对象被谁引用，默认项是`outcoming references`显示这个对象引用的其他对象。

<img src="https://oss-xuxin.oss-cn-beijing.aliyuncs.com/blog/img/ZeJnem.png" alt="none" style="width: 100%;height: 80%;border-radius: 6px;">

依次点开第一行数据，再点击最右侧`show more`然后即可以很清晰的看到报错行数等相关信息，如下图所示：

<img src="https://oss-xuxin.oss-cn-beijing.aliyuncs.com/blog/img/fZBLDj.png" alt="none" style="width: 100%;height: 80%;border-radius: 6px;">


根据相关提示，我们找到测试代码，至此问题得到解决。

