---
lang: zh-CN  
title: SpringCloud@HystrixCommand进行熔断降级   
description: 页面的描述  
head:

- [meta, {name: keywords, content: 'SpringCloud@HystrixCommand进行熔断降级, Hystrix'}]

---

# SpringCloud@HystrixCommand进行熔断降级

[[toc]]

Hystrix 是 Spring Cloud Netflix 子项目的核心组件之一，具有服务容错及线程隔离等一系列服务保护功能。
能保证服务调用者在调用异常服务时快速返回结果，避免大量的同步等待，并且熔断器能在一段时间后继续侦测请求执行结果，提供恢复服务调用的可能。


### 何时触发降级

- 执行方法抛出异常  
- 熔断器打开导致命令短路（保险丝断了）  
- 命令的线程池和队列或信号量的容量超额，命令被拒绝  
- 命令执行超时


### 测试案例

首先我们导入所需依赖

```xml

<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-hystrix</artifactId>
    <!--<version>2.2.10.RELEASE</version>-->
</dependency>
```

简单使用如下，当我们调用`hello`方法时，出现`/ by zero`异常时，执行降级方法`fallbackMethod`并返回相应的数据。

> 注意: 启动类需要增加：`@EnableHystrix` 注解后才会启用。

```java

@EnableHystrix
@RestController
public class TestController {

    @PostMapping("/hello")
    @HystrixCommand(
            // 指定服务降级处理方法
            fallbackMethod = "fallbackMethod"
    )
    public String hello(String param) {
        System.out.println(1 / 0);
        return "收到";
    }

    public String fallbackMethod(String param) {
        System.out.println("出现了异常：" + param);
        return "你请求我失败了！";
    }

}
```

### 附常用配置

例如`HystrixCommandProperties`配置默认超时为`1s`，所以在耗时比较长的业务中很容易触发降级，所以可以适当增长超时时间，如下`3s`内访问都成功，超过`3s`才触发降级。

```java
@HystrixCommand(fallbackMethod = "fallbackMethod",
        
        // 忽略某些异常，不触发服务降级
        ignoreExceptions = {NullPointerException.class},
        // 线程池名称，用于划分线程池（舱壁模式，线程隔离的⼿段）
        threadPoolKey = "hello_method_fallback_pool",
        
        commandProperties = {
                // 请求超时时间
                @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "3000"),

                // 判断熔断的最少请求数，默认是10；只有在一个统计窗口内处理的请求数量达到这个阈值，才会进行熔断与否的判断
                @HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "10"),
                // 判断熔断的阈值，表示在一个统计窗口内有50%的请求处理失败，会触发熔断，默认是50
                @HystrixProperty(name = "circuitBreaker.errorThresholdPercentage",value = "50"),
                
                // 自我修复检测窗口时长，熔断后自动检测服务是否可用，可用后进行恢复调用
                @HystrixProperty(name = "circuitBreaker.sleepWindowInMilliseconds",value = "3000")
        }
)
```

<Comment></Comment>
