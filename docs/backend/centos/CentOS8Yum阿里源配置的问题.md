---
lang: zh-CN  
title: 'CentOS8 yum 阿里源配置的问题'  
description: 页面的描述  
date: 2022-05-07 18:41:36  
head:

- [meta, {name: keywords, content: 'CentOS8 yum 阿里源配置的问题'}]

---

# CentOS8 yum 阿里源配置的问题

错误信息如下：

```shell
[root@iZ2ze1asovzc5my2rnfo2lZ nginx-1.19.0]# yum install gcc
CentOS-8 - AppStream                                                                                8.8 kB/s | 2.3 kB     00:00    
Errors during downloading metadata for repository 'AppStream':
  - Status code: 404 for http://mirrors.cloud.aliyuncs.com/centos/8/AppStream/x86_64/os/repodata/repomd.xml (IP: 100.100.2.148)
Error: Failed to download metadata for repo 'AppStream': Cannot download repomd.xml: Cannot download repodata/repomd.xml: All mirrors were tried
```

### 解决方案

首先备份原有数据

```shell
cp /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo1
cp /etc/yum.repos.d/CentOS-AppStream.repo /etc/yum.repos.d/CentOS-AppStream.repo1 
```

编辑如下文件

```shell
vim /etc/yum.repos.d/CentOS-Base.repo
# esc 键盘 ： 命令模式下执行：
%s/mirrors.cloud.aliyuncs.com/mirrors.aliyun.com/g 
# 继续执行:
%s/$releasever/$releasever-stream/g

vim /etc/yum.repos.d/CentOS-AppStream.repo
# esc 键盘 ： 命令模式下执行：
%s/mirrors.cloud.aliyuncs.com/mirrors.aliyun.com/g 
# 继续执行:
%s/$releasever/$releasever-stream/g
```

最后

```shell
yum makecache
yum update
```

<Comment></Comment>
