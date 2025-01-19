---
lang: zh-CN
title: Doris stream_load方式删除标志不生效问题
description: 页面的描述
head:

  - [ meta, { name: keywords, content: 'stream_load方式删除标志不生效问题, stream_load, __DORIS_DELETE_SIGN__' } ]

---

# Doris stream_load方式删除标志不生效问题

[stream-load-manual](https://doris.apache.org/zh-CN/docs/data-operate/import/import-way/stream-load-manual)

使用StreamLoad往Doris批量推送数据，给记录增加删除标志，但是不生效，代码如下

```java
map.put("__DORIS_DELETE_SIGN__",0);
```

解决方案，需要在请求头增加

```java
headers.set("hidden_columns","__DORIS_DELETE_SIGN__");
```

> 备注：取值为 0 时代表 UPSERT 操作，取值为 1 时代表 DELETE 操作。

<Comment></Comment>
