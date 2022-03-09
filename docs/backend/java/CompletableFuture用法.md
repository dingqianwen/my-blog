---
lang: zh-CN    
title:  CompletableFuture用法  
description: 页面的描述
---

# CompletableFuture用法

[[toc]]

### 合并两个接口返回数据

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

### 处理两段逻辑

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
    }

}
```

### 模拟批量处理数据

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

<Comment></Comment>
