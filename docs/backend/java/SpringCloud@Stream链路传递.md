---
lang: zh-CN
title: SpringCloud@Stream链路传递
description: 页面的描述
head:

  - [ meta, { name: keywords, content: 'SpringCloud@Stream链路传递' } ]

---

# SpringCloud@Stream链路传递

@GlobalChannelInterceptor(patterns = "*-input")：这是 Spring 的消息通道拦截器注解，
用于指定拦截器应该应用于哪些消息通道，这里是所有以 `-input` 结尾的通道。

```java
@Slf4j
@Service
@GlobalChannelInterceptor(patterns = "*-input")
public class MQInputInterceptor implements ChannelInterceptor {
    
    private static final String TRACE_ID = "traceId";

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        String tid = message.getHeaders().get(TRACE_ID, String.class);
        if (tid == null || tid.isEmpty()) {
            tid = UUID.randomUUID().toString();
        }
        MDC.put(TRACE_ID, tid);
        return message;
    }

    @Override
    public void afterSendCompletion(Message<?> message, MessageChannel channel, boolean sent, Exception ex) {
        MDC.clear();
    }

}
```

<Comment></Comment>