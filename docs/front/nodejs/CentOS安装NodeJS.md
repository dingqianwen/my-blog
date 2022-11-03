---
lang: zh-CN   
title: CentOS安装NodeJS  
description: 页面的描述  
head:

- [meta, {name: keywords, content: 'CentOS安装NodeJS, Linux安装NodeJS'}]

---

# CentOS安装NodeJS

[[toc]]

### 快速安装

[Node.js官网](https://nodejs.org/en/)

> 安装版本：`v16.15.0`

```shell
cd /usr/local

# 可自行指定版本即可
wget https://nodejs.org/download/release/v16.15.0/node-v16.15.0-linux-x64.tar.gz
tar -zxvf node-v16.15.0-linux-x64.tar.gz 

# 创建软链
ln -s /usr/local/app/node-v16.15.0-linux-x64/bin/npm /usr/bin/npm
ln -s /usr/local/app/node-v16.15.0-linux-x64/bin/node /usr/bin/node

# 采用TaoBao的镜像地址提升下载速度(可选)
npm config set registry https://registry.npm.taobao.org 
```

验证：

```shell
[root@iZ2ze1asovzc5my2rnfo2lZ app]# node -v
v16.15.0
```

### 针对安装问题解决

#### ln: failed to create symbolic link '/usr/bin/node': File exists

说明此软链已经存在，先删除再创建新的即可

```shell
rm /usr/bin/node
# yes
```

<Comment></Comment>
