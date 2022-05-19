---
lang: zh-CN  
title: Nginx限制指定的接口地址访问  
description: 页面的描述
---

# Nginx限制指定的接口地址访问

有时候需要临时或者紧急屏蔽一些接口的调用，可以通过以下Nginx配置实现

```text
location /bs/getPv {
    return 403;
}
```

当再次访问此地址：`https://**/bs/getPv?id=1` 则返回如下内容

```text
403 Forbidden
nginx/1.19.0
```

<Comment></Comment>
