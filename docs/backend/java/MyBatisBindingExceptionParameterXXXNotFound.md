---
lang: zh-CN   
title: MyBatis Plus Parameter 'uuid' not found. Available parameters are [ew, param1]  
description: 页面的描述  
head:

- [meta, {name: keywords, content: 'MyBatis Plus Parameter uuid not found. Available parameters are [ew, param1]'}]

---

# MyBatis Plus Parameter 'uuid' not found. Available parameters are [ew, param1]

通过使用Mybatis Plus 提供的 Remove 方法时出现以下错误信息，类似如下代码

```java
public void temp() {
    User user = new User();
    user.setUsername("abc");
    user.set...
    this.userManager.remove(Wrappers.update(user));
}
```

错误信息如下：

```text
org.mybatis.spring.MyBatisSystemException: nested exception is org.apache.ibatis.binding.BindingException: Parameter 'uuid' not found. Available parameters are [ew, param1]
 at org.mybatis.spring.MyBatisExceptionTranslator.translateExceptionIfPossible(MyBatisExceptionTranslator.java:96)
 at org.mybatis.spring.SqlSessionTemplate$SqlSessionInterceptor.invoke(SqlSessionTemplate.java:441)
 at com.sun.proxy.$Proxy160.delete(Unknown Source)
 at org.mybatis.spring.SqlSessionTemplate.delete(SqlSessionTemplate.java:304)
 at com.baomidou.mybatisplus.core.override.MybatisMapperMethod.execute(MybatisMapperMethod.java:70)
 at com.baomidou.mybatisplus.core.override.MybatisMapperProxy.invoke(MybatisMapperProxy.java:96)
 at com.sun.proxy.$Proxy174.delete(Unknown Source)
 at com.baomidou.mybatisplus.extension.service.IService.remove(IService.java:123)
 at com.baomidou.mybatisplus.extension.service.IService$$FastClassBySpringCGLIB$$f8525d18.invoke(<generated>)
 at org.springframework.cglib.proxy.MethodProxy.invoke(MethodProxy.java:218)
 at org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:688)
```

### 原因：

Mybatis的Mapper文件是根据类名加方法名来唯一区分的，我们在自己的Mapper.xml文件中定义了跟Mybatis-Plus相同的方法名会覆盖Mybatis-Plus的方法，所以出现了问题。

#### 第一种可能

例如本地Mapper.xml重写了Remove Update方法出现问题

#### 第二种可能（我本次踩的坑）

因为是系统框架过度，原用的TkMapper没有去除，导致被TkMapper覆盖了一些Mapper方法

<Comment></Comment>
