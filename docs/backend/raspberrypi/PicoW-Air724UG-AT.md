---
lang: zh-CN  
title: '树莓派PicoW串口连接Air724UG-AT-4G模块'  
description: 页面的描述   
head:

- [ meta, { name: keywords, content: '树莓派PicoW串口连接Air724UG-AT-4G模块发Http请求, 树莓派' } ]

---

# 树莓派PicoW串口连接Air724UG-AT-4G模块

[[toc]]

## Air724UG-AT-4G模块

Core-Air724 核心板是由银尔达（yinerda）基于合宙Air724模组推出的低功耗，小体积，高性能嵌入式4G
Cat1核心版，支持标准固件AT固件,支持功能电话语音、短信、TCP&UDP、TCP&UDP透传、NTP、HTTP、FTP、MQTT等

<img src="https://oss-xuxin.oss-cn-beijing.aliyuncs.com/blog/img/QXo16W.png" alt="none" style="width: 45%;height: 45%;border-radius: 6px;">

## 让PicoW串口连接Air724UG-AT-4G模块

PicoW官方针脚图如下

<img src="https://oss-xuxin.oss-cn-beijing.aliyuncs.com/blog/img/aHo5Rn.png" alt="none" style="width: 70%;height: 70%;border-radius: 6px;">

与此4G模块串口通信仅需4根线即可，线路对应关系如下

|     PicoW     | Air724UG-AT-4G |
|:-------------:|:-----------:|
|  VBUS（序号40）   |     VCC     |
|   GND（序号38）   |     GND     |
| UART0 TX（序号1） |     RXD     |
| UART0 RX（序号2） |     TXD     |

## 串口测试

编写如下代码，并在PicoW执行，注意`UART`配置波特率要与模块配置的一致，否则无法正常通信，切连接针脚要对应。

```python
import time

from machine import UART, Pin

uart = UART(0, baudrate=115200, bits=8, stop=1, parity=None, tx=Pin(0), rx=Pin(1))


def send_cmd(cmd):
    print('send_cmd----------------------------------------------------------------------------')
    uart.write(cmd + '\r')
    # 读取命令响应
    read_data()


def send_data(cmd):
    print('send_data----------------------------------------------------------------------------')
    uart.write(cmd)


def read_data():
    print('read_data----------------------------------------------------------------------------')
    start = False
    start_time = time.time()
    while True:
        a = uart.any()
        if a != 0:
            start = True
            res = uart.readline()
            print(res)
        elif a == 0 and start:
            # 已经开始读取并且后续没有数据了，读取完毕
            break
        # 超时5秒跳出循环
        if time.time() - start_time > 5:
            print('read timeout')
            break
        time.sleep(0.1)


# 读取模块厂商信息
send_cmd("AT+CGMI")
# 读取固件版本信息
send_cmd("AT+CGMR")
# 查询设置信号质量
send_cmd("AT+CSQ")
print('end----------------------------------------------------------------------------')
```

调试打印日志如下

```text
send_cmd----------------------------------------------------------------------------
read_data----------------------------------------------------------------------------
b'AT+CGMI\r\r\n'
b'+CGMI: "AirM2M"\r\n'
b'\r\n'
b'OK\r\n'
send_cmd----------------------------------------------------------------------------
read_data----------------------------------------------------------------------------
b'AT+CGMR\r\r\n'
b'+CGMR: "AirM2M_Air724UG_V401853_LTE_AT"\r\n'
b'\r\n'
b'OK\r\n'
send_cmd----------------------------------------------------------------------------
read_data----------------------------------------------------------------------------
b'AT+CSQ\r\r\n'
b'+CSQ: 20,99\r\n'
b'\r\n'
b'OK\r\n'
end----------------------------------------------------------------------------
```

## 串口通信传输原理

串口通信是基于二进制的，在串口通信中，数据通过位（bit）来传输，每个位只有两种状态，即`0`和`1`。 以上案例中我们发送了一个为`config,get,imei`的命令，进一步分析如何传输一个`c`字符。
在串口通信通常使用一种叫做`ASCII`码编码方式，在 ASCII 码中，字符`c`对应的十六进制是`x63`，二进制表示为`01100011`。 在串口通信中，典型的传输方式是每个字符由`8`
个连续的位（bit）来表示，按照从左至右的顺序，依次传输每一个位。

[UART通信](https://baijiahao.baidu.com/s?id=1777705258428369997&wfr=spider&for=pc)

## 发送Http请求测试

具体先参见AT指令集用法：[AT指令](http://www.taodudu.cc/news/show-6231708.html?action=onClick)

### GET请求示例

编写如下代码，在PicoW并执行。

```python
# 查询网络注册状态
send_cmd('AT+CREG?')
# 查询附着GPRS网络
send_cmd('AT+CGATT?')
# 设置APN
send_cmd('AT+CSTT="","","" ')
# 激活移动场景，激活后能获取到IP
send_cmd('AT+CIICR')
# 查询IP，只有获取到IP后才能上网
send_cmd('AT+CIFSR')
# 初始化HTTP
send_cmd("AT+HTTPINIT")
# 发起PDP激活的请求
send_cmd('AT+SAPBR=1,1')
# 初始化HTTP url
send_cmd('AT+HTTPPARA="URL","https://apidocs.cn/blog/"')
# HTTP get 数据，收到OK表示发送成功
send_cmd("AT+HTTPACTION=0")
read_data()
# 读取获取到的HTTP数据，收到+HTTPACTION表示接受到数据
send_cmd("AT+HTTPREAD=0,46669")
# 关闭连接
send_cmd("AT+HTTPTERM")
```


### POST请求示例

只需要把`send_cmd("AT+HTTPACTION=0")`改成`send_cmd("AT+HTTPACTION=1")`即可，具体参考以下案例

```python
# 初始化HTTP
send_cmd("AT+HTTPINIT")
# 发起PDP激活的请求
send_cmd('AT+SAPBR=1,1')
# 初始化HTTP url
send_cmd('AT+HTTPPARA="URL","https://****/"')
# POST body数据 数据长度1-102400
send_cmd("AT+HTTPDATA=123456")
# HTTP post 数据，收到OK表示发送成功
send_cmd("AT+HTTPACTION=1")
read_data()
# 读取获取到的HTTP数据，收到+HTTPACTION表示接受到数据
send_cmd("AT+HTTPREAD=0,46669")
# 关闭连接
send_cmd("AT+HTTPTERM")
```


<Comment></Comment>
