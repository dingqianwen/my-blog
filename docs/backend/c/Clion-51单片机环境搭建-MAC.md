---
lang: zh-CN
title: Clion-51单片机环境搭建-MAC
description: 页面的描述
head:

  - [ meta, { name: keywords, content: 'Clion-51单片机环境搭建-MAC' } ]
  - [ meta, { name: description, content: 'Clion-51单片机环境搭建-MAC' } ]

---

# Clion-51单片机环境搭建-MAC

> 如果只为了点亮LED则毫无意义！

[[toc]]

## 1. 安装SDCC

```bash
brew install sdcc
```

## 2. 安装Clion

作者版本：CLion 2023.2.2 [下载地址](https://www.jetbrains.com/clion/download/#section=mac)

## 3. Clion安装插件

Preferences | Plugins 搜索 `PlatformIO for CLion`

## 4. 新建项目

File | New Project | PlatformIO，选择好对应的单片机型号。

<img src="https://oss-xuxin.oss-cn-beijing.aliyuncs.com/blog/img/8QhF0N.png" alt="none" style="width: 70%;height: 70%;border-radius: 6px;">

## 5. 让LED闪烁

项目目录`src/main.c`中编写如下程序

```c
#include <8052.h>

#define LED_PIN P0

void Delay10ms(unsigned int);

int main() {
    while (1) {
        LED_PIN = 0x00;
        Delay10ms(50);
        LED_PIN = 0xff;
        Delay10ms(50);
    }
}

void Delay10ms(unsigned int c) {
    unsigned char a, b;
    for (; c > 0; c--)
        for (b = 38; b > 0; b--)
            for (a = 130; a > 0; a--);
}
```

LED连线对应关系

| LED | 单片机      | 序号 | 
|-----|----------|----|
| +   | P0.0/AD0 | 39 |
| -   | GND      | 20 |

## 6. 解决代码爆红以及提示问题

* 项目目录中`platformio.ini`文件添加如下内容，`username`替换为你电脑用户名称。

```ini  
lib_extra_dirs =
    /Users/{username}/.platformio/packages/toolchain-sdcc/share/sdcc/include
```

* 点进`#include <8052.h>`文件中，找到`#include <8051.h>`点入进去，头部信息增加如下代码

```c
#include <lint.h>
```

## 7. STC单片机下载器与单片机进行连接

单片机引脚图如下

<img src="https://oss-xuxin.oss-cn-beijing.aliyuncs.com/blog/img/EnqG4p.png" alt="none" style="width: 50%;height: 50%;border-radius: 6px;">

下载器与单片机引脚图对应关系如下

| 下载器 | 单片机      | 序号 | 
|-----|----------|----|
| VCC | VCC      | 40 |
| GND | GND      | 20 |
| RXD | TXD/P3.1 | 11 |
| TXD | RXD/P3.0 | 10 |

::: warning 注意事项
TXD：发送数据（串行输出），RXD：接收数据（串行输入），串口通信的RXD和TXD与单片机需要交叉连接。
:::

## 8. 上传烧录

点击右侧`PlatformIO`的按钮，选择`Upload`，即可把程序烧录到单片机中。

<img src="https://oss-xuxin.oss-cn-beijing.aliyuncs.com/blog/img/R7gbEE.png" alt="none" style="width: 50%;height: 50%;border-radius: 6px;">

::: tip 针对烧录失败或者没有反应处理

* 检查单片机与下载器连接线路是否正常，注意RXD和TXD需要交叉连接。
* 检查USB端口是否正常。
* 烧录时可以尝试断开单片机电源后再进行烧录，烧录完成后再接上单片机电源进行测试。
  :::

<Comment></Comment>

