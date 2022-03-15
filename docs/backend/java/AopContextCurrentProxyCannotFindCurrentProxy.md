---
lang: zh-CN  
title: 'AopContext.currentProxy() Cannot find current proxy'
description: 页面的描述
---

# AopContext.currentProxy() Cannot find current proxy


错误信息如下:

```text
Cannot find current proxy: set‘expogeProxy’property on advis ed to make it available，and ensure that AopContext.currentProxy() is invoked in the 8ame threasd as the aoe invocation context.
```

### 解决方案

#### 第一种

没有添加：

```java
@EnableAspectJAutoProxy(exposeProxy = true)
```

#### 第二种

排查是否在线程中使用`AopContext.currentProxy()` 类似如下代码：

```java
@Async
public void asyncExecute() {
    System.out.println(AopContext.currentProxy());
}
```

<Comment></Comment>
