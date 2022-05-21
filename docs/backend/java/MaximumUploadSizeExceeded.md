---
lang: zh-CN    
title: Maximum upload size exceeded  
description: 页面的描述
---

# Maximum upload size exceeded; nested exception is java.lang.IllegalStateException

[[toc]]

SpringBoot文件上传报错，是因为文件大小超过默认限制，需要配置允许上传的文件的大小。

### 1.x版本

`properties`配置方式

```properties
spring.http.multipart.max-file-size=10MB
spring.http.multipart.max-request-size=10MB
```

`yaml`配置方式

```yaml
spring:
  http:
    multipart:
      max-file-size: 10MB
      max-request-size: 10MB
```

### 2.x版本

`properties`配置方式

```properties
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
```

`yaml`配置方式

```yaml
spring:
  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 10MB

```

:::tip 配置说明
`spring.servlet.multipart.max-file-size` 单个文件大小限制  
`spring.servlet.multipart.max-request-size` 一次请求中所有上传文件总大小限制
:::

<Comment></Comment>
