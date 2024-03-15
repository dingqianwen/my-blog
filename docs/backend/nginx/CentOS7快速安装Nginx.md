---
lang: zh-CN
title: 'CentOS7快速安装Nginx'
description: 页面的描述
head:

  - [ meta, { name: keywords, content: 'CentOS7快速安装Nginx' } ]

---

# CentOS7快速安装Nginx

[[toc]]

### 版本

[nginx-1.19.0](http://nginx.org/download/nginx-1.19.0.tar.gz)

### 首先安装所需依赖项

```shell
sudo yum install openssl openssl-devel pcre pcre-devel
```

### 安装Nginx

```shell
cd /usr/local
# 下载
wget http://nginx.org/download/nginx-1.19.0.tar.gz
tar -zxvf nginx-1.19.0.tar.gz
cd nginx-1.19.0
./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module
make
sudo make install
cd ../nginx
# 启动
./sbin/nginx
```

<Comment></Comment>
