---
lang: zh-CN   
title: CentOS安装NodeJS  
description: 页面的描述
---

# CentOS安装NodeJS

### 快速安装

> 安装版本：`v14.1.0`

```shell
cd /usr/local

# 可自行指定版本即可
wget https://nodejs.org/download/release/v14.1.0/node-v14.1.0-linux-x64.tar.gz
tar -zxvf node-v14.1.0-linux-x64.tar.gz 

# 创建软链
ln -s /usr/local/app/node-v14.1.0-linux-x64/bin/npm /usr/bin/npm
ln -s /usr/local/app/node-v14.1.0-linux-x64/bin/node /usr/bin/node
```

验证：

```shell
[root@iZ2ze1asovzc5my2rnfo2lZ app]# node -v
v14.1.0
```

### 针对安装问题解决

#### ln: failed to create symbolic link '/usr/bin/node': File exists

说明此软链已经存在，先删除再创建新的即可

```shell
rm /usr/bin/node
# yes
```

<Comment></Comment>
