---
lang: zh-CN  
title: Nginx开启Gzip压缩  
description: 页面的描述
---

# Nginx开启Gzip压缩

Gzip是一种压缩技术，通过在网站服务器安装该功能，可以减少传输宇节。

### 例如

本站响应的`jquery.min.js`文件开启Gzip前后对比如下：

- 开启前：`89.8kB`
- 开启后：`31.5kB`

### 如何启用？

修改配置文件`nginx.conf`增加如下代码

```text
http {
    gzip  on;   #开启gzip
    gzip_min_length 1k; #低于1kb的资源不压缩
    gzip_comp_level 5; #压缩级别【1-9】，越大压缩率越高，同时消耗cpu资源也越多，建议设置在4左右。
    gzip_types text/plain application/javascript application/x-javascript text/javascript text/xml text/css;  #需要压缩哪些响应类型的资源，多个空格隔开。不建议压缩图片。
    gzip_disable "MSIE [1-6]\.";  #配置禁用gzip条件，支持正则。此处表示ie6及以下不启用gzip（因为ie低版本不支持）
    gzip_vary on;  #是否添加“Vary: Accept-Encoding”响应头
}
```

重启Nginx

```shell
nginx -s reload
```

### 验证是否生效

再次请求自己网站，会发现响应Header有如下键值`Content-Encoding: gzip`。



<Comment></Comment>
