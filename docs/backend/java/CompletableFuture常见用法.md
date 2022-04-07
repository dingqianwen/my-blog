---
lang: zh-CN    
title:  CompletableFuture常见用法  
description: 页面的描述
---

# CompletableFuture常见用法

[[toc]]

## 一般使用场景

### 合并两个接口返回数据

适合 合并显示两个服务或者多个接口查询到的数据等，提高程序效率。

```java
public class Test {

    public static void main(String[] args) {
        long startTime = System.currentTimeMillis();
        List<Bean> join = CompletableFuture.supplyAsync(() -> {
            try {
                // 模拟调用接口A 耗时2秒
                Thread.sleep(2000);
            } catch (InterruptedException e1) {
                e1.printStackTrace();
            }
            List<Bean> beans = new ArrayList<>();
            beans.add(new Bean(1, "111"));
            beans.add(new Bean(2, "222"));
            return beans;
        }).thenCombine(CompletableFuture.supplyAsync(() -> {
            try {
                // 模拟调用接口B 耗时2秒
                Thread.sleep(2000);
            } catch (InterruptedException e1) {
                e1.printStackTrace();
            }
            List<Bean> beans = new ArrayList<>();
            beans.add(new Bean(3, "333"));
            beans.add(new Bean(4, "444"));
            return beans;
        }), (a, b) -> {
            // 两个接口数据合并
            a.addAll(b);
            return a;
        }).join();
        System.out.println(join);
        System.out.println(System.currentTimeMillis() - startTime);
    }

    @Data
    @AllArgsConstructor
    public static class Bean {
        private Integer id;
        private String value;
    }

}
```

输出

```text
[ListTest.Bean(id=1, value=111), ListTest.Bean(id=2, value=222), ListTest.Bean(id=3, value=333), ListTest.Bean(id=4, value=444)]
2010
```

### 同时处理两段逻辑

以下模拟，当A业务且B业务执行完毕后输出：`我也执行了`

```java
public class Test {

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        CompletableFuture.allOf(CompletableFuture.runAsync(() -> {
            try {
                // 模拟处理业务 A
                Thread.sleep(2000);
            } catch (InterruptedException e1) {
                e1.printStackTrace();
            }
        }), CompletableFuture.runAsync(() -> {
            try {
                // 模拟处理业务 B
                Thread.sleep(2000);
            } catch (InterruptedException e1) {
                e1.printStackTrace();
            }
        })).get();
        System.out.println("我也执行了");
    }

}
```

### 模拟批量处理数据

大量数据处理，适合Excel文件数据处理。

```java
public class Test {

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        long startTime = System.currentTimeMillis();
        List<String> urls = Arrays.asList("url1", "url2", "url3", "url4");
        List<CompletableFuture<String>> completableFutures = urls.stream().map(m -> {
            //并行查询接口数据文本
            return CompletableFuture.supplyAsync(() -> {
                try {
                    // 模拟调用接口
                    Thread.sleep(2000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                return m + "我是查询到的数据";
            });
        }).collect(Collectors.toList());

        CompletableFuture<List<String>> listCompletableFuture = CompletableFuture.allOf(completableFutures.toArray(new CompletableFuture[0])).
                thenApply(t -> completableFutures.stream().map(CompletableFuture::join)
                        .filter(f -> {
                            // 模拟需要过滤掉的数据
                            return !f.startsWith("url2");
                        })
                        .collect(Collectors.toList()));
        System.out.println(listCompletableFuture.get());
        System.out.println(System.currentTimeMillis() - startTime);
    }

}
```

返回

```text
[url1我是查询到的数据, url3我是查询到的数据, url4我是查询到的数据]
2010
```

## 帮助

### CompletableFuture执行出错不出现异常信息？

看如下代码进行异步操作时，竟然没有打印出任何异常信息

```java
   CompletableFuture.runAsync(()->{
            System.out.println("开始执行");
            System.out.println(1/0);
        });
```

输出

```text
开始执行
```

如果需要获取程序出现的异常可以用以下方式：

```java
CompletableFuture.runAsync(()->{
            System.out.println(1/0);
        }).exceptionally(e->{
            e.printStackTrace();
            return null;
        });
```

输出

```text
开始执行
java.util.concurrent.CompletionException: java.lang.ArithmeticException: / by zero
	at java.base/java.util.concurrent.CompletableFuture.encodeThrowable(CompletableFuture.java:314)
	at java.base/java.util.concurrent.CompletableFuture.completeThrowable(CompletableFuture.java:319)
	at java.base/java.util.concurrent.CompletableFuture$AsyncRun.run(CompletableFuture.java:1739)
	at java.base/java.util.concurrent.CompletableFuture$AsyncRun.exec(CompletableFuture.java:1728)
	at java.base/java.util.concurrent.ForkJoinTask.doExec(ForkJoinTask.java:290)
	at java.base/java.util.concurrent.ForkJoinPool$WorkQueue.topLevelExec(ForkJoinPool.java:1020)
	at java.base/java.util.concurrent.ForkJoinPool.scan(ForkJoinPool.java:1656)
	at java.base/java.util.concurrent.ForkJoinPool.runWorker(ForkJoinPool.java:1594)
	at java.base/java.util.concurrent.ForkJoinWorkerThread.run(ForkJoinWorkerThread.java:183)
Caused by: java.lang.ArithmeticException: / by zero
	at test.lambda$main$1(TerminalBaseDetailedServiceImpl.java:80)
	at java.base/java.util.concurrent.CompletableFuture$AsyncRun.run(CompletableFuture.java:1736)
	... 6 more
```

<Comment></Comment>
