---
lang: zh-CN
title: 'CentOS快速安装Java'
description: 页面的描述
date: 2024-07-23 23:58:36
head:

  - [ meta, { name: keywords, content: 'CentOS快速安装Java' } ]

---

# CentOS快速安装Java

首先，确保您的系统包管理器（YUM）是最新的。运行以下命令更新所有包和软件信息：

```bash
sudo yum update
```

安装OpenJDK 1.8

```bash
sudo yum install java-1.8.0-openjdk
```

安装OpenJDK的开发工具，方便执行javac以及jps等常用命令

```bash
sudo yum install java-1.8.0-openjdk-devel
```

最后验证JDK版本

```bash
javac -version
```

<Comment></Comment>
