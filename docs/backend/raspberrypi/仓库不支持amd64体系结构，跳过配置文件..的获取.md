---
lang: zh-CN  
title: 'N: 鉴于仓库 ‘..‘不支持 ‘amd64‘ 体系结构，跳过配置文件 ‘..‘ 的获取。'    
description: 页面的描述
---

# N: 鉴于仓库 ‘..‘不支持 ‘amd64‘ 体系结构，跳过配置文件 ‘..‘ 的获取。

报错信息如下：

```
pi@raspberrypi:~ $ sudo apt-get update
命中:1 http://raspbian.raspberrypi.org/raspbian bullseye InRelease             
命中:2 http://archive.raspberrypi.org/debian bullseye InRelease                
正在读取软件包列表... 完成
N: 鉴于仓库 'http://raspbian.raspberrypi.org/raspbian bullseye InRelease' 不支持 'amd64' 体系结构，跳过配置文件 'main/binary-amd64/Packages' 的获取。
N: 鉴于仓库 'http://raspbian.raspberrypi.org/raspbian bullseye InRelease' 不支持 'amd64' 体系结构，跳过配置文件 'contrib/binary-amd64/Packages' 的获取。
N: 鉴于仓库 'http://raspbian.raspberrypi.org/raspbian bullseye InRelease' 不支持 'amd64' 体系结构，跳过配置文件 'non-free/binary-amd64/Packages' 的获取。
N: 鉴于仓库 'http://raspbian.raspberrypi.org/raspbian bullseye InRelease' 不支持 'amd64' 体系结构，跳过配置文件 'rpi/binary-amd64/Packages' 的获取。

```

解决

```
sudo dpkg --remove-architecture amd64
sudo apt-get update
```

<Comment></Comment>
