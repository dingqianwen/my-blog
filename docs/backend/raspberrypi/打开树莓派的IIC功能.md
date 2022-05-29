---
lang: zh-CN  
title: 打开树莓派的IIC功能           
description: 页面的描述
---

# 打开树莓派的IIC功能

树莓派默认IIC关闭，在进行编程前需要打开IIC

```shell
sudo vi /boot/config.txt

# 编辑如下文件 :wq 保存并退出
dtparam=i2c_arm=on

# 然后输入命令
sudo reboot
```

安装完毕之后，输入`i2cdetect -y 0`或`i2cdetect -y 1`结果如下

```shell
pi@raspberrypi:~ $ i2cdetect -y 0
Error: Could not open file /dev/i2c-0' or /dev/i2c/0': No such file or directory
pi@raspberrypi:~ $ i2cdetect -y 1
0 1 2 3 4 5 6 7 8 9 a b c d e f
00: -- -- -- -- -- -- -- --
10: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
20: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
30: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
40: 40 -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
50: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
60: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
70: -- -- -- -- -- -- -- --
pi@raspberrypi:~ $
```

###### 会得到一个地址:`0x40`


<Comment></Comment>
