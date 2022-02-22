---
lang: zh-CN  
title: Spring单元测试事物不提交问题  
description: 页面的描述
---

# Spring单元测试事物不提交问题

为了使测试数据不对数据库造成污染，在使用Spring-Test进行的单元测试的时候，默认会对事务进行回滚，如果想要测试数据不回滚，可设置@Rollback(value = false)

### 例如：

```java

@Test
@Rollback(value = false)
public void test(){  
    // ...
}  

```

<Comment></Comment>
