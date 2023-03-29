---
lang: zh-CN  
title: CentOS安装Redis  
description: 页面的描述  
head:

- [meta, {name: keywords, content: 'CentOS安装Redis, Linux安装Redis, Redis'}]

---

# CentOS安装Redis

阿里云服务器Linux(CentOS)简易安装Redis

```shell
cd /usr/local/
mkdir app
sudo chmod -R 777 app
cd app
wget https://download.redis.io/releases/redis-6.2.6.tar.gz
tar -zxvf redis-6.2.6.tar.gz
cd redis-6.2.6
make
```

修改`vim redis.conf`配置文件如下：

```shell
#bind 127.0.0.1 -::1
daemonize yes
appendonly yes
requirepass 你的密码
```

启动：

```shell
./src/redis-server redis.conf 
```

执行`netstat -nltp`如下：

```shell
[root@iz2ze5tnrt773egfd88rjwz redis-6.2.6]# netstat -nltp
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name    
tcp        0      0 0.0.0.0:6379            0.0.0.0:*               LISTEN      26408/./src/redis-s 
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      2870/nginx: master  
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      2061/sshd           
tcp6       0      0 :::6379                 :::*                    LISTEN      26408/./src/redis-s 
```

简单使用：

```shell
[root@iz2ze5tnrt773egfd88rjwz redis-6.2.6]# ./src/redis-cli -p 6379
127.0.0.1:6000> auth 你的密码
OK
127.0.0.1:6000> set test 123456
OK
127.0.0.1:6000> get test
"123456"
127.0.0.1:6000> 
```

::: warning 注意事项  
1、如果使用的是阿里云服务器，请记得登录进阿里云服务器控制台开启防火墙对应的端口号;  
2、安全起见建议修改默认端口号;  
:::

<Comment></Comment>
