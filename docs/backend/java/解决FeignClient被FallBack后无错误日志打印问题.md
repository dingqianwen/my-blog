---
lang: zh-CN  
title: '解决FeignClient被FallBack后无错误日志打印问题'  
description: 页面的描述  
head:

- [meta, {name: keywords, content: '解决FeignClient被FallBack后无错误日志打印问题, FeignClient, 日志, log, fallBack'}]

---

# 解决FeignClient被FallBack后无错误日志打印问题

[[toc]]

由于服务中`@FeignClient`指定了外部客户端接口的回退类`fallback = UserApiHystrix.class`，当触发接口异常或莫名进入到回退类方法时，无任何日志，无法定位具体问题。

## 解决方案一

通过配置文件中配置某个FeignClient服务接口日志级别，因为`FeignClientsConfiguration`中`feignLoggerFactory`方法默认日志实现类为`feign.slf4j.Slf4jLogger`
而日志打印之前会有`logger.isDebugEnabled()`判断，我们生产环境大部分配置的日志级别都为`info`，所以这里需要单独进行配置`**.UserApi=debug`。

```properties
# NONE，无记录（DEFAULT）。  
# BASIC，只记录请求方法和URL以及响应状态代码和执行时间。  
# HEADERS，记录基本信息以及请求和响应标头。  
# FULL，记录请求和响应的头文件，正文和元数据。
feign.client.config.user-service.loggerLevel=BASIC
logging.level.com.feign.UserApi=debug
```

对应的FeignClient接口配置

```java

@FeignClient(
        name = "user-service",
        fallback = UserApiHystrix.class
)
public interface UserApi {

}
```

我们再次请求接口，则会出现以下日志，可见是由于`404`导致执行了回退类方法

```text
2022-07-06 15:24:37.948 DEBUG [localhost] 60421 --- [reakerFactory-1] [TID: N/A] c.UserApi     : [UserApi#get] ---> GET http://localhost:8080/user-api/get HTTP/1.1
2022-07-06 15:24:38.146 DEBUG [localhost] 60421 --- [reakerFactory-1] [TID: N/A] c.UserApi     : [UserApi#get] <--- HTTP/1.1 404 (198ms)
null
```

## 解决方案二

通过`@FeignClient`中`configuration`设置某个服务日志级别等，对应的FeignClient接口配置如下

```java

@FeignClient(
        name = "user-service",
        fallback = UserApiHystrix.class,
        configuration = FeignConfiguration.class
)
public interface UserApi {

}
```

`FeignConfiguration`配置如下

```java
import feign.Logger;
import feign.Request;
import feign.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;

import java.io.IOException;

/**
 * 〈Configuration〉
 *
 * @author 丁乾文
 * @date 2022/7/6 12:39
 * @since 1.0.0
 */
public class FeignConfiguration {

    /**
     * NONE，无记录（DEFAULT）。
     * BASIC，只记录请求方法和URL以及响应状态代码和执行时间。
     * HEADERS，记录基本信息以及请求和响应标头。
     * FULL，记录请求和响应的头文件，正文和元数据。
     *
     * @return Level
     */
    @Bean
    Logger.Level feignLoggerLevel() {
        return Logger.Level.BASIC;
    }

    @Bean
    Logger feignLogger() {
        return new FeignLogger();
    }

}

@Slf4j
class FeignLogger extends feign.Logger {


    @Override
    protected void logRequest(String configKey, Level logLevel, Request request) {
        super.logRequest(configKey, logLevel, request);
    }

    @Override
    protected Response logAndRebufferResponse(String configKey, Level logLevel, Response response, long elapsedTime) throws IOException {
        if (log.isInfoEnabled()) {
            return super.logAndRebufferResponse(configKey, logLevel, response, elapsedTime);
        }
        return response;
    }

    @Override
    protected void log(String configKey, String format, Object... args) {
        if (log.isInfoEnabled()) {
            log.info(String.format(methodTag(configKey) + format, args));
        }
    }

}
```

## 解决方案三

需要改变代码结构，`@FeignClient`中`fallback`改为使用`fallbackFactory`，例如

```java

@FeignClient(
        name = "user-service",
        // fallback = UserApiHystrix.class,
        fallbackFactory = UserApiFallBackFactory.class
)
public interface UserApi {

}
```

`UserApiFallBackFactory`代码实现如下

```java

@Slf4j
@Component
public class UserApiFallBackFactory implements FallbackFactory<UserApi> {

    @Override
    public UserApi create(Throwable cause) {
        log.info("UserApi Throwable", cause);
        return new UserApi() {
            @Override
            public Response<UserData> get(@Valid Request<Param> request) {
                return null;
            }
        };
    }

}
```

再次请求，则会打印如下日志

```text
2022-07-06 15:40:45.677  INFO [localhost] 67702 --- [reakerFactory-1] [TID: N/A] c.f.UserApiFallBackFactory : UserApi Throwable

feign.FeignException$NotFound: [404] during [GET] to [http://localhost:8080/user-api/get] [UserApi#get(Request)]: [{"timestamp":"2022-07-06T07:40:46.042+00:00","status":404,"error":"Not Found","path":"/user-api/get"}]
	at feign.FeignException.clientErrorStatus(FeignException.java:219)
	at feign.FeignException.errorStatus(FeignException.java:194)
	at feign.FeignException.errorStatus(FeignException.java:185)
	at feign.codec.ErrorDecoder$Default.decode(ErrorDecoder.java:92)
	at feign.AsyncResponseHandler.handleResponse(AsyncResponseHandler.java:96)
	at feign.SynchronousMethodHandler.executeAndDecode(SynchronousMethodHandler.java:138)
	at feign.SynchronousMethodHandler.invoke(SynchronousMethodHandler.java:89)
	at org.springframework.cloud.openfeign.FeignCircuitBreakerInvocationHandler.lambda$asSupplier$1(FeignCircuitBreakerInvocationHandler.java:112)
	at org.springframework.cloud.netflix.hystrix.HystrixCircuitBreaker$1.run(HystrixCircuitBreaker.java:45)
	at com.netflix.hystrix.HystrixCommand$2.call(HystrixCommand.java:302)
	at com.netflix.hystrix.HystrixCommand$2.call(HystrixCommand.java:298)
	at rx.internal.operators.OnSubscribeDefer.call(OnSubscribeDefer.java:46)
	at rx.internal.operators.OnSubscribeDefer.call(OnSubscribeDefer.java:35)
	at rx.internal.operators.OnSubscribeLift.call(OnSubscribeLift.java:48)
	at rx.internal.operators.OnSubscribeLift.call(OnSubscribeLift.java:30)
	at rx.internal.operators.OnSubscribeLift.call(OnSubscribeLift.java:48)
	at rx.internal.operators.OnSubscribeLift.call(OnSubscribeLift.java:30)
	at rx.internal.operators.OnSubscribeLift.call(OnSubscribeLift.java:48)
	at rx.internal.operators.OnSubscribeLift.call(OnSubscribeLift.java:30)
	at rx.Observable.unsafeSubscribe(Observable.java:10327)
	at rx.internal.operators.OnSubscribeDefer.call(OnSubscribeDefer.java:51)
	at rx.internal.operators.OnSubscribeDefer.call(OnSubscribeDefer.java:35)
	at rx.Observable.unsafeSubscribe(Observable.java:10327)
	at rx.internal.operators.OnSubscribeDoOnEach.call(OnSubscribeDoOnEach.java:41)
	at rx.internal.operators.OnSubscribeDoOnEach.call(OnSubscribeDoOnEach.java:30)
	at rx.internal.operators.OnSubscribeLift.call(OnSubscribeLift.java:48)
	at rx.internal.operators.OnSubscribeLift.call(OnSubscribeLift.java:30)
	at rx.Observable.unsafeSubscribe(Observable.java:10327)
	at rx.internal.operators.OperatorSubscribeOn$SubscribeOnSubscriber.call(OperatorSubscribeOn.java:100)
	at com.netflix.hystrix.strategy.concurrency.HystrixContexSchedulerAction$1.call(HystrixContexSchedulerAction.java:56)
	at com.netflix.hystrix.strategy.concurrency.HystrixContexSchedulerAction$1.call(HystrixContexSchedulerAction.java:47)
	at com.netflix.hystrix.strategy.concurrency.HystrixContexSchedulerAction.call(HystrixContexSchedulerAction.java:69)
	at rx.internal.schedulers.ScheduledAction.run(ScheduledAction.java:55)
	at java.base/java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:515)
	at java.base/java.util.concurrent.FutureTask.run$$$capture(FutureTask.java:264)
	at java.base/java.util.concurrent.FutureTask.run(FutureTask.java)
	at java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1128)
	at java.base/java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:628)
	at java.base/java.lang.Thread.run(Thread.java:834)
	
null

```

<Comment></Comment>
