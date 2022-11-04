---
lang: zh-CN  
title: 'Request Entity Too Large'  
description: 页面的描述  
head:

- [meta, {name: keywords, content: 'Failed to load resource: the server responded with a status of 413 (Request Entity Too Large)'}]

---

# Failed to load resource: the server responded with a status of 413 (Request Entity Too Large)

由于Nginx反向代理服务器`client_max_body_size`默认值为`1MB`，而上传文件大于`1MB`，所以就出现这个错误

### 解决方案

打开Nginx反向代理服务器`nginx.conf`配置文件，修改`client_max_body_size`值

```shell
# http{} 中控制着所有nginx收到的请求
http{
    client_max_body_size 10m;
}
# 控制该server下收到的请求报文大小
server{
    client_max_body_size 10m;
}
# 只对匹配了location路由规则的请求生效（建议）
location{
    client_max_body_size 10m;
}

# 重启nginx
sudo nginx -s relaod
```


<Comment></Comment>
