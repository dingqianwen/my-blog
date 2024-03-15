---
lang: zh-CN
title: '1410D0B9_noCipherMatch'
description: 页面的描述
head:

  - [ meta, { name: keywords, content: 'nginx: [emerg] SSL_CTX_set_cipher_list("PROFILE=SYSTEM") failed (SSL: error:1410D0B9:SSL routines:SSL_CTX_set_cipher_list:no cipher match)' } ]

---

# 1410D0B9_noCipherMatch

[[toc]]

### 启动提示如下错误

```shell
nginx: [emerg] SSL_CTX_set_cipher_list("PROFILE=SYSTEM")
 failed (SSL: error:1410D0B9:SSL routines:SSL_CTX_set_cipher_list:no cipher match)
```

### 修改nginx.conf的内容

```shell
# 注释默认的
# ssl_ciphers PROFILE=SYSTEM;

# 改为
ssl_ciphers DEFAULT;
```

<Comment></Comment>
