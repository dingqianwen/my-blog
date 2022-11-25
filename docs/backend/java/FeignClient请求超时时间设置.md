---
lang: zh-CN  
title: FeignClient请求超时时间设置  
description: 页面的描述  
head:

- [meta, {name: keywords, content: 'FeignClient请求超时时间设置'}]

---

# FeignClient请求超时时间设置  

[[toc]]

### 简介

由于FeignClient接口请求默认超时时间太长，导致很多请求处于阻塞状态，短时间内无法释放线程，最终导致服务无线程可用问题，
我们可以缩短FeignClient默认超时时间来解决。

### 全局设置（所有FeignClient接口都修改）

properties方式：

```properties
# 建立连接超时时间（默认10秒）
feign.client.config.default.connect-timeout=10000
# 接口请求读取超时时间（默认60秒）
feign.client.config.default.read-timeout=10000
```

yml方式：

```yml
feign:
  client:
    config: 
      default:
        connect-timeout: 10000 # 建立连接超时时间（默认10秒）
        read-timeout: 10000 # 接口请求读取超时时间（默认60秒）
```

### 配置具体某个FeignClient接口

例如有以下FeignClient接口，想单独给此接口设置具体超时时间

```java
@FeignClient(name = "user-service")
public interface UserApi {

}
```

properties方式：

```properties
# user-service为具体需要配置的某个服务名称 FeignClient注解中的name方法
# 建立连接超时时间（默认10秒）
feign.client.config.user-service.connect-timeout=10000
# 接口请求读取超时时间（默认60秒）
feign.client.config.user-service.read-timeout=10000
```

yml方式：

```yml
feign:
  client:
    config: 
      user-service: # 服务名称 FeignClient注解中的name方法
        connect-timeout: 10000 # 建立连接超时时间（默认10秒）
        read-timeout: 10000 # 接口请求读取超时时间（默认60秒）
```



### 注意事项

如果FeignClient指定了`contextId`，例如以下写法

```java
@FeignClient(
        name = "user-service",
        contextId = "user-service-api"
)
public interface UserApi {

}
```

此时通过服务名称配置则不会生效，必须改为以下方式或者采用全局配置方式

```yml
feign:
  client:
    config: 
      user-service-api: # contextId FeignClient注解中的contextId方法
        connect-timeout: 10000 # 建立连接超时时间（默认10秒）
        read-timeout: 10000 # 接口请求读取超时时间（默认60秒）
```


<Comment></Comment>
