---
lang: zh-CN  
title: 'nginx: [emerg] the "ssl" parameter requires ngx_http_ssl_module'  
description: 页面的描述
---

# nginx: [emerg] the "ssl" parameter requires ngx_http_ssl_module in /usr/local/nginx/conf/nginx.conf:35

[[toc]]

### 解决方案如下

如果已经没有源码包可以执行一下`/usr/local/nginx/sbin/nginx -V`命令下载对应的源码，注意版本号与之前一致

```shell
cd /usr/local
# 下载
wget http://nginx.org/download/nginx-1.19.0.tar.gz
tar -zxvf nginx-1.19.0.tar.gz
cd nginx-1.19.0
./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module
make
# 然后备份原有已安装好的nginx
cp /usr/local/nginx/sbin/nginx /usr/local/nginx/sbin/nginx1
# 然后将刚刚编译好的nginx覆盖掉原有的nginx
# 注意，nginx一定要先 停止
./usr/local/nginx/sbin/nginx -s stop
cp ./objs/nginx /usr/local/nginx/sbin/
# 然后启动nginx
./usr/local/nginx/sbin/nginx
```

### 错误解决

#### make时错误信息如下：

```shell
make: *** No rule to make target 'build', needed by 'default'.  Stop.
```

网上解决方案试了很多，没什么用，建议在一台能用的服务器上执行上面所有操作后直接把编辑后的文件scp到目标主机，例如

```shell
scp /usr/local/nginx-1.19.0/objs/nginx  root@***:/usr/local/nginx/sbin/
```

#### 启动nginx时：

```shell
./sbin/nginx: error while loading shared libraries: libssl.so.10: cannot open shared object file: No such file or directory
```

具体解决方案请见：[error while loading shared libraries: libssl.so.10](error_libsslso.md)

<Comment></Comment>
