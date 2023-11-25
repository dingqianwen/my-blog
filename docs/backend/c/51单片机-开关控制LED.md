---
lang: zh-CN
title: 51单片机-开关控制LED
description: 页面的描述
head:

  - [ meta, { name: keywords, content: '51单片机-开关控制LED' } ]
  - [ meta, { name: description, content: '51单片机-开关控制LED' } ]

---

# 51单片机-开关控制LED

> 如果只为了点亮LED则毫无意义！

[[toc]]

## 1. 硬件准备

* LED一颗
* 按钮开关一个
* 51单片机开发板（STC89C52RC）

## 2. 硬件连接

单片机引脚图如下

<img src="https://oss-xuxin.oss-cn-beijing.aliyuncs.com/blog/img/EnqG4p.png" alt="none" style="width: 50%;height: 50%;border-radius: 6px;">

LED连接

| LED引脚 | 51单片机引脚 | 序号 |
|-------|---------|----|
| +     | T2/P1.0 | 1  |
| -     | GND     | 20 |

按钮开关连接

| 按钮开关引脚 | 51单片机引脚 | 序号 |
|--------|---------|----|
| 引脚1    | P2.0/A8 | 21 |
| 引脚2    | GND     | 20 |

## 3. 代码编写

新建`main.c`文件，代码逻辑如下，当点按一次按钮，LED就会亮起，再点按一次，LED就会熄灭。

```c    
#include <8052.h>

#define SWITCH_PIN P2
#define LED_PIN P1

void Delay10ms(unsigned int);

int main() {
    SWITCH_PIN = 0xFF;
    LED_PIN = 0x00; // 初始状态下关闭LED

    while (1) {
        // 检测开关状态
        if ((SWITCH_PIN & 1) == 0) {
            LED_PIN = !LED_PIN;  // 如果开关被按下，则打开LED
            Delay10ms(50);  // 延时500ms，防止抖动
        }
    }
}

void Delay10ms(unsigned int c) {
    unsigned char a, b;
    for (; c > 0; c--)
        for (b = 38; b > 0; b--)
            for (a = 130; a > 0; a--);
}
```

## 4. 代码烧录下载

### 4.1 SDCC编译

[SDCC官网](http://sdcc.sourceforge.net)

```shell
sdcc main.c
# sdcc默认生成的文件后缀不是hex而是ihx，需要使用packihx转换。
packihx main.ihx > main.hex && ls
```

### 4.1 烧录工具

* [STC-ISP官网](http://www.stcmcudata.com)
* [STC-ISP下载](http://www.stcmcudata.com/STCISP/stc-isp-15xx-v6.92G.zip)

### 4.2 烧录

* 选择对应的单片机型号 (STC89C52RC）
* 选择对应的串口号
* 选择`main.hex`文件
* 点击下载

<Comment></Comment>
