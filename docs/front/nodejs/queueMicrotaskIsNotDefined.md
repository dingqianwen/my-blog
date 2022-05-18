---
lang: zh-CN   
title: 'UnhandledPromiseRejectionWarning: ReferenceError: queueMicrotask is not defined'    
description: 页面的描述
---

# UnhandledPromiseRejectionWarning: ReferenceError: queueMicrotask is not defined

### 执行 node **.js 报错

报错信息如下

```shell
[root@iZ2ze1asovzc5my2rnfo2lZ app]# node service.js 
(node:2535727) UnhandledPromiseRejectionWarning: ReferenceError: queueMicrotask is not defined
    at RedisSocket.cork (/usr/local/app/node_modules/@node-redis/client/dist/lib/client/socket.js:85:9)
    at Commander._RedisClient_tick (/usr/local/app/node_modules/@node-redis/client/dist/lib/client/index.js:431:60)
    at RedisSocket.socketInitiator (/usr/local/app/node_modules/@node-redis/client/dist/lib/client/index.js:331:90)
    at RedisSocket._RedisSocket_connect (/usr/local/app/node_modules/@node-redis/client/dist/lib/client/socket.js:128:77)
    at process._tickCallback (internal/process/next_tick.js:68:7)
```

### 解决方案

> 当前NodeJS版本：`v10.14.2`  
> 升级版本到：`v14.1.0`

[NodeJS安装方法](CentOS安装NodeJS.md)

<Comment></Comment>
