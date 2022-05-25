---
lang: zh-CN  
title: 启用树莓派的SPI接口        
description: 页面的描述
---

# 启用树莓派的SPI接口

SPI是外设驱动常用的通讯方式之一，相比于IIC，SPI数据传输的速率要更高，因为SPI比IIC多了一根数据线，是全双工的。树莓派默认SPI关闭，在进行编程前需要打开SPI

```shell
sudo vi /boot/config.txt

# 编辑如下文件 :wq 保存并退出
dtparam=spi=on

# 然后输入命令
sudo reboot
```

<Comment></Comment>
