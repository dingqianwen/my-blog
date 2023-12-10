---
lang: zh-CN
title: '树莓派PicoW串口连接Air724UG-DTU-4G模块'
description: 页面的描述
head:

  - [ meta, { name: keywords, content: '树莓派PicoW串口连接Air724UG-DTU-4G模块发Http请求, 树莓派' } ]

---

# 树莓派PicoW串口连接Air724UG-DTU-4G模块

[[toc]]

## Air724UG-DTU-4G模块

Core-Air724 核心板是由银尔达（yinerda）基于合宙Air724模组推出的低功耗，小体积，高性能嵌入式4G
Cat1核心版，支持标准固件AT固件,支持功能电话语音、短信、TCP&UDP、TCP&UDP透传、NTP、HTTP、FTP、MQTT等

<img src="https://oss-xuxin.oss-cn-beijing.aliyuncs.com/blog/img/QXo16W.png" alt="none" style="width: 50%;height: 50%;border-radius: 6px;">

## 配置Air724UG-DTU-4G模块

本次购买的为DTU固件Air724UG-DTU-4G，首先在银尔达DTU官网：[http://dtu.yinerda.com/](http://dtu.yinerda.com/)
注册账号，然后在设备管理中添加设备，添加设备时需要输入设备的IMEI号，
IMEI号可以在设备标签上查看。然后配置分组，串口参数选择打开，波特率选择`115200`，数据位选择`8`位，校验位选择`无`，停止位选择`1`
位，其他都是默认，然后点击保存参数，最后再让设备重启一下即完成配置。

## 让PicoW串口连接Air724UG-DTU-4G模块

PicoW官方针脚图如下

<img src="https://oss-xuxin.oss-cn-beijing.aliyuncs.com/blog/img/aHo5Rn.png" alt="none" style="width: 70%;height: 70%;border-radius: 6px;">

与此4G模块串口通信仅需4根线即可，线路对应关系如下

|     PicoW     | Air724UG-DTU-4G |
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
    uart.write(cmd + '\r\n')
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


# 发送查询imei命令
send_cmd('config,get,imei')
print('end----------------------------------------------------------------------------')
```

调试打印日志如下，即发送查询imei命令，返回imei号到串口，串口读取到数据后打印出来。

```text
MPY: soft reboot
send_cmd----------------------------------------------------------------------------
read_data----------------------------------------------------------------------------
b'\r\n'
b'config,imei,ok,861658064076782\r\n'
end----------------------------------------------------------------------------
```

## 串口通信传输原理

串口通信是基于二进制的，在串口通信中，数据通过位（bit）来传输，每个位只有两种状态，即`0`和`1`。
以上案例中我们发送了一个为`config,get,imei`的命令，进一步分析如何传输一个`c`字符。
在串口通信通常使用一种叫做`ASCII`码编码方式，在 ASCII 码中，字符`c`对应的十六进制是`x63`，二进制表示为`01100011`。
在串口通信中，典型的传输方式是每个字符由`8`个连续的位（bit）来表示，按照从左至右的顺序，依次传输每一个位。

<img src="https://oss-xuxin.oss-cn-beijing.aliyuncs.com/blog/img/ki3xut.png" alt="none" style="width: 70%;height: 70%;border-radius: 6px;">

## 发送Http请求测试

具体配置参见文档：[http://wiki.yinerda.com/index.php/Core-Air724UG](http://wiki.yinerda.com/index.php/Core-Air724UG)
，找到`银尔达-DTU固件串口配置命令手册.pdf`下载查看。

### GET请求示例

编写如下代码，在PicoW并执行，即绑定串口通道`2`，设置为Http模式，设置Http请求地址为`www.baidu.com`，端口为`80`
，请求路径为`/s?wd=`，请求方式为`GET`。

```python
send_cmd('config,set,http,2,uart,0,www.baidu.com,80,/s?wd=,5,0,0,1,0,0')
send_cmd('config,set,save')
# 等待设备重启结束
time.sleep(10)
send_data("abc")
# 读取响应数据
read_data()
print('end----------------------------------------------------------------------------')
```

调试打印日志如下

```text
MPY: soft reboot
send_cmd----------------------------------------------------------------------------
read_data----------------------------------------------------------------------------
b'\r\n'
b'config,http,ok\r\n'
send_cmd----------------------------------------------------------------------------
read_data----------------------------------------------------------------------------
b'\r\n'
b'config,save,ok\r\n'
send_data----------------------------------------------------------------------------
read_data----------------------------------------------------------------------------
b'<a href="https://wappass.baidu.com/static/captcha/tuxing.html?&amp;logid=12048830718417878884&amp;ak=c27bbc89afca0463650ac9bde68ebe06&amp;backurl=https%3A%2F%2Fwww.baidu.com%2Fs%3Fwd%3Dabc&amp;ext=x9G9QDmMXq%2FNo87gjGO0P2lVgIV%2Bi0DK6z6hWPJSJoxSIPuPx9h9pmFSYtnJpM3ng1T9i%2F9aWxTqDk%2BHyX%'
end----------------------------------------------------------------------------
```

地址只有首次需要配置并绑定串口，后续只需要发送、接收数据即可，如下注释掉绑定串口代码。

```python
# send_cmd('config,set,http,2,uart,0,www.baidu.com,80,/s?wd=,5,0,0,1,0,0')
# send_cmd('config,set,save')
# 等待设备重启结束
# time.sleep(10)
send_data("abc")
# 读取响应数据
read_data()
print('end----------------------------------------------------------------------------')
```

::: tip 踩坑记录  
只有命令指令`uart.write()`才用追加`\r\n`（回车换行），发送数据不需要加，否则会导致请求失败，无法接收到响应数据。
:::

### POST请求示例

代码如下，注意`IP`，`PORT`换成你自己服务的。

```python
send_cmd('config,set,http,1,uart,1,http://IP,PORT,/,5,1,Content-Type=application/octet-stream/0d/0a,0,0,0')
send_cmd('config,set,save')
time.sleep(10)
send_data("body123")
# 读取缓冲区
read_data()
print('end----------------------------------------------------------------------------')
```

调试打印日志如下

```text
MPY: soft reboot
send_cmd----------------------------------------------------------------------------
read_data----------------------------------------------------------------------------
b'\r\n'
b'config,http,ok\r\n'
send_cmd----------------------------------------------------------------------------
read_data----------------------------------------------------------------------------
b'\r\n'
b'config,save,ok\r\n'
send_data----------------------------------------------------------------------------
read_data----------------------------------------------------------------------------
b'200\r\n'
b'Access-Control-Allow-Origin: *\r\n'
b'Content-Length: 1\r\n'
b'Date: Thu, 07 Dec 2023 13:12:46 GMT\r\n'
b'Content-Type: text/html; charset=utf-8\r\n'
b'Server: Werkzeug/2.0.3 Python/3.6.8\r\n'
b'\r\n'
b'2200\r\n'
b'Access-Control-Allow-Origin: *\r\n'
b'Content-Length: 1\r\n'
b'Date: Thu, 07 Dec 2023 13:12:46 GMT\r\n'
b'Content-Type: text/htm'
end----------------------------------------------------------------------------
```

<Comment></Comment>
