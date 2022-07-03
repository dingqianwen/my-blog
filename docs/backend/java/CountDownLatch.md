---
lang: zh-CN  
title: '线程工具CountDownLatch'   
description: 页面的描述  
head:

- [meta, {name: keywords, content: '线程工具CountDownLatch, CountDownLatch'}]

---

# 线程工具CountDownLatch

[[toc]]

### 简介

`CountDownLatch`是一个非常实用的多线程控制工具类，它允许一个或多个线程一直等待，直到其他线程的操作执行完后再执行。

### 原理

`CountDownLatch`是通过一个计数器来实现的，计数器的初始值为线程的数量。每当一个线程完成了自己的任务后，计数器的值就会减`1`。当计数器值到达`0`时，它表示所有的线程已经完成了任务，
然后在主线程中被`await`的方法就可以恢复执行任务。

### 方法

|方法|说明|    
|--|--|  
|await()|使当前线程进入同步队列进行等待，直到设置的值被减到0或者当前线程被中断，当前线程就会被唤醒。|  
|await(long timeout, TimeUnit unit)|如果计数达到零，则为true，如果在计数达到零之前经过等待时间，则为false。|  
|countDown()|减少锁存器的计数，如果计数为零，则释放等待的线程。|
|getCount()|返回当前计数。此方法通常用于调试和测试目的。|


### 例子

下面的`CountDownLatch`值设置为`3`，等待如下`3`个线程执行完毕输出`执行结束了`，`await`设置线程最大等待时间为`5s`，超出时间还未结束抛出异常：`执行超时`

```java
public static void main(String[] args) throws InterruptedException {
    ExecutorService executorService = Executors.newFixedThreadPool(10);

    CountDownLatch countDownLatch = new CountDownLatch(3);
    executorService.execute(() -> {
        try {
            Thread.sleep(3000);
            System.out.println(3);
            countDownLatch.countDown();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    });
    executorService.execute(() -> {
        try {
            Thread.sleep(2000);
            System.out.println(2);
            countDownLatch.countDown();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    });
    executorService.execute(() -> {
        try {
            Thread.sleep(4000);
            System.out.println(4);
            countDownLatch.countDown();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    });
    // 等待上述线程执行完毕，最多等待5s
    boolean await = countDownLatch.await(5, TimeUnit.SECONDS);
    if (!await) {
        throw new RuntimeException("执行超时");
    }
    System.out.println("执行结束了");
    executorService.shutdown();
}
```

::: warning 温馨提示
项目中最好使用`await(long timeout, TimeUnit unit)`方法去等待，防止业务出现异常，无法正常`countDown`导致锁死程序
:::


<Comment></Comment>
