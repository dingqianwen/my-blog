---
lang: zh-CN  
title: CentOS安装HBase  
description: 页面的描述
---

# CentOS安装HBase

阿里云服务器Linux(CentOS)简易安装HBase

```shell
cd /usr/local/
mkdir app
sudo chmod -R 777 app
cd app
wget https://dlcdn.apache.org/hbase/2.4.8/hbase-2.4.8-bin.tar.gz 
tar -zxvf hbase-2.4.8-bin.tar.gz
cd /usr/local/app/hbase-2.4.8
```


修改`vim conf/hbase-site.xml`配置文件如下：

```xml
  <property>
    <name>hbase.master.ipc.address</name>
    <value>0.0.0.0</value>
  </property>
  <property>
    <name>hbase.regionserver.ipc.address</name>
    <value>0.0.0.0</value>
  </property>
  <property>
  <name>hbase.master.info.port</name>
    <value>60010</value>
  </property>
```

启动：

```shell
./bin/start-hbase.sh
```

访问管理页面：http://ip:60010

::: warning 注意事项
如果使用的是阿里云服务器，请记得登录进阿里云服务器控制台开启防火墙对应的端口号
:::

停止：

```shell
./bin/stop-hbase.sh
```


<Comment></Comment>
