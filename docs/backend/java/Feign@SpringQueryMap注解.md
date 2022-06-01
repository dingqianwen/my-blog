---
lang: zh-CN  
title: Feign @SpringQueryMap注解  
description: 页面的描述  
head:

- [meta, {name: keywords, content: 'Feign解决Get方式传输对象参数问题'}]

---

# Feign @SpringQueryMap注解

[[toc]]

### 解决Get方式传输对象参数问题

```java

@FeignClient("demo")
public interface DemoFeign {

    @GetMapping(path = "/demo")
    String demo(@SpringQueryMap Params params);
}

```

<Comment></Comment>
