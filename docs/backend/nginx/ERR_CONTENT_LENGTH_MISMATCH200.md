---
lang: zh-CN  
title: 'net::ERR_CONTENT_LENGTH_MISMATCH 200 (OK)'  
description: 页面的描述  
head:

- [meta, {name: keywords, content: 'net::ERR_CONTENT_LENGTH_MISMATCH 200 (OK)'}]

---

# net::ERR_CONTENT_LENGTH_MISMATCH 200 (OK)

因为下载文件比较大，需要用到缓存路径`proxy_temp`，执行如下命令解决

```shell
cd /usr/local/nginx

# 更改权限
chmod -R 777 proxy_temp

# 重启nginx
sudo nginx -s relaod
```

<Comment></Comment>
