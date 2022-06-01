---
lang: zh-CN  
title: 'CentOS安装Python'  
description: 页面的描述  
head:

- [meta, {name: keywords, content: 'CentOS安装Python, Linux安装Python'}]

---

# CentOS安装Python

当前系统版本如下

```shell
[root@iZ2ze1asovzc5my2rnfo2lZ ~]# lsb_release -a
LSB Version:    :core-4.1-amd64:core-4.1-noarch
Distributor ID: CentOSStream
Description:    CentOS Stream release 8
Release:        8
Codename:       n/a
```

安装命令如下

```shell
sudo dnf install python3

-- 通过以下命令验证安装
python3 --version
```

设置系统默认Python版本

```shell
sudo alternatives --set python /usr/bin/python3

-- 如果改回默认版本
sudo alternatives --auto python
```

现在就可以执行Python脚本了

```shell
[root@iZ2ze1asovzc5my2rnfo2lZ app]# python my-blog-server.py 
 * Serving Flask app 'my-blog-server' (lazy loading)
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: on
 * Running on all addresses.
   WARNING: This is a development server. Do not use it in a production deployment.
 * Running on http://172.25.37.113:8001/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 393-781-533
```

<Comment></Comment>
