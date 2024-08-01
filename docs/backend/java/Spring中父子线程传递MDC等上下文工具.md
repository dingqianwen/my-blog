---
lang: zh-CN
title: 'Spring中父子线程传递MDC等上下文工具'
description: 页面的描述
head:

  - [ meta, { name: keywords, content: 'Spring中父子线程传递MDC等上下文工具' } ]

---

# Spring中父子线程传递MDC等上下文工具

解决`ThreadPoolTaskExecutor`线程池中的线程无法传递`MDC`等上下文问题。主要实现方式是对线程池Runnable进行装饰，
在`Runnable`执行前后设置上下文数据，具体实现如下：

```java

@Slf4j
@Component
@RequiredArgsConstructor
public class ThreadPoolTaskExecutorBeanPostProcessor implements BeanPostProcessor {
    
    private static final String TASK_DECORATOR = "taskDecorator";

    @SneakyThrows
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        if (bean instanceof ThreadPoolTaskExecutor) {
            ThreadPoolTaskExecutor threadPoolTaskExecutor = (ThreadPoolTaskExecutor) bean;
            Field taskDecoratorField = ThreadPoolTaskExecutor.class.getDeclaredField(TASK_DECORATOR);
            taskDecoratorField.setAccessible(true);
            TaskDecorator taskDecorator = (TaskDecorator) taskDecoratorField.get(threadPoolTaskExecutor);
            TracerTaskDecorator tracerTaskDecorator = new TracerTaskDecorator(taskDecorator);
            threadPoolTaskExecutor.setTaskDecorator(tracerTaskDecorator);
            log.info("Processing thread pool:{}-{}-{}.", tracerTaskDecorator, beanName, bean);
            return threadPoolTaskExecutor;
        }
        return bean;
    }

    @RequiredArgsConstructor
    public static class TracerTaskDecorator implements TaskDecorator {

        private final TaskDecorator delegate;

        @Override
        public Runnable decorate(Runnable runnable) {
            Map<String, String> context = MDC.getCopyOfContextMap();
            // 其他需要传递的ThreadLocal数据
            // ..
            Runnable finalRunnable = Objects.nonNull(this.delegate) ? this.delegate.decorate(runnable) : runnable;
            return () -> {
                try {
                    MDC.setContextMap(context);
                    finalRunnable.run();
                } finally {
                    MDC.clear();
                }
            };
        }

    }

}

```

解决`ExecutorService`线程池中的线程无法传递`MDC`等上下文问题，
大致原理是通过`Aspect`拦截`ExecutorService.execute`方法，当执行`execute`时包装`Runnable`，具体实现如下：

```java
@Aspect
@Component
public class ThreadPoolAspect {

    /**
     * 线程池执行时，包装Runnable
     *
     * @param joinPoint j
     * @param runnable  r
     * @return r
     * @throws Throwable t
     */
    @Around(value = "execution(* java.util.concurrent.ExecutorService.execute(Runnable)) && args(runnable)")
    public Object around(ProceedingJoinPoint joinPoint, Runnable runnable) throws Throwable {
        ThreadPoolTaskExecutorBeanPostProcessor.TracerTaskDecorator decorator = new ThreadPoolTaskExecutorBeanPostProcessor.TracerTaskDecorator(null);
        Runnable decorate = decorator.decorate(runnable);
        return joinPoint.proceed(new Object[]{decorate});
    }

}
```

<Comment></Comment>