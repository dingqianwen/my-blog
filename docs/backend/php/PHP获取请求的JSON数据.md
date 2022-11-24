---
lang: zh-CN  
title: PHP获取请求的JSON数据          
description: 页面的描述  
head:

- [meta, {name: keywords, content: 'PHP获取请求的JSON数据'}]

---

# PHP获取请求的JSON数据

PHP获取请求的JSON数据实现如下    

```php
$body = file_get_contents('php://input');
$json = json_decode($body);

// 取数据 {"param": {....}}
$param = $json->{'param'};
```


<Comment></Comment>
