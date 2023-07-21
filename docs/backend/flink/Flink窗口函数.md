---
lang: zh-CN  
title: Flink窗口函数  
description: 页面的描述  
head:

- [meta, {name: keywords, content: 'Flink窗口函数'}]
- [meta, {name: description, content: 'Flink窗口函数'}]

---

# Flink窗口函数  

先聚合一个批次，再写入数据库，减轻数据库的压力，`countWindowAll(10)`表示当数据汇总到10个，执行一次。

```java
env.fromSource(**)
.map(new MapFunction<String, String>() {
   ***
})
.countWindowAll(10)
.apply(new AllWindowFunction<String, List<String>, GlobalWindow>() {
    @Override
    public void apply(GlobalWindow globalWindow, Iterable<String> iterable, Collector<List<String>> collector) throws Exception {
        List<String> skuInfos = Lists.newArrayList(iterable);
        if (skuInfos.size() > 0) {
            collector.collect(skuInfos);
        }
    }
})
.addSink(new RichSinkFunction<List<String>>() {
    @Override
    public void invoke(List<String> value, Context context) {
        ***
    }
});
```

以下`TumblingEventTimeWindows.of(Time.seconds(10))` 表示10秒触发一次操作，具体使用哪个根据业务场景决定。

```js
env.fromSource(***)
.map(new MapFunction<String, String>() {
    ***
})
.windowAll(TumblingEventTimeWindows.of(Time.seconds(10)))
.apply(new AllWindowFunction<String, List<String>, TimeWindow>() {
    @Override
    public void apply(TimeWindow window, Iterable<String> iterable, Collector<List<String>> collector) throws Exception {
        List<String> skuInfos = Lists.newArrayList(iterable);
        if (skuInfos.size() > 0) {
            collector.collect(skuInfos);
        }
    }
})
.addSink(new RichSinkFunction<List<String>>() {
    @Override
    public void invoke(List<String> value, Context context) {
        ***
    }
});
```




<Comment></Comment>
