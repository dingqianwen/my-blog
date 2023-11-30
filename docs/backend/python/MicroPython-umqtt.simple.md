---
lang: zh-CN
title: 'MicroPython-umqtt.simple-阿里物联网平台'
description: 页面的描述
head:

  - [ meta, { name: keywords, content: 'MicroPython-umqtt.simple-阿里物联网平台' } ]

---

# MicroPython-umqtt.simple-阿里物联网平台

[[toc]]

## 1.介绍

让手中的树莓派`PICO W`连接阿里云物联网平台。

## 2.准备

- 下载并安装MicroPython固件，下载地址：[download/rp2-pico](https://micropython.org/download/rp2-pico/)
- 按住`boot set`按钮，然后将`PICO W`插入电脑，会出现一个名为`RPI-RP2`的U盘，将下载的固件`rp2-pico-**.uf2`
  拖入U盘，等待固件烧录完成，会自动重启。
- 下载Thonny IDE，下载地址：[https://thonny.org/](https://thonny.org/)
- 打开Thonny IDE，右下角选择`PICO W`所在串口，然后点击工具->管理包->搜索`umqtt.simple`，安装`umqtt.simple`包。

## 3.连接阿里云物联网平台

阿里云物联网平台地址：[https://iot.console.aliyun.com/](https://iot.console.aliyun.com/)

<img src="https://oss-xuxin.oss-cn-beijing.aliyuncs.com/blog/img/pzdW35.png" alt="none" style="width: 60%;height: 60%;border-radius: 6px;">

按照图片所示路径以及页面，点击MQTT 连接参数`查看`，弹出框点击一件复制，放在下面所示代码的`info`变量中。

```py
import network
import time
from machine import Pin
from umqtt.simple import MQTTClient

info = {"clientId": "k0j6cIoeXJy.***fVjOdI4hIf1ju0***|securemode=2,signmethod=hmacsha256,timestamp=1701319494601|",
        "username": "bWgfVjOdI4hIf1***f&k0j6cIoeXJy", "mqttHostUrl": "iot-06z0***maph.mqtt.iothub.aliyuncs.com",
        "passwd": "292ead1360f6446c*****70dead32d0e158930dee065d7536cfaa", "port": 1883}
productKey = "k0j***eXJy"
deviceName = "bWgfVj***hIf1ju05Vf"
keepAlive = 100

subTopic = "/" + productKey + "/" + deviceName + "/user/get"
pubTopic = "/" + productKey + "/" + deviceName + "/user/update"
wifiSsid = 'wifi name'.encode("utf-8")
wifiPass = 'wifi password'


def wifi_connect():
    led = Pin("LED", Pin.OUT)
    led.value(1)
    wlan = network.WLAN(network.STA_IF)  # STA模式
    wlan.active(True)  # 激活接口
    start_time = time.time()  # 记录时间做超时判断

    sc = wlan.scan()  # 扫描WIFI
    # 遍历
    for i in sc:
        print(i[0].decode("utf-8"))

    if not wlan.isconnected():
        print('connecting to network...')
        wlan.connect(wifiSsid, wifiPass)  # 输入WIFI账号密码
        while not wlan.isconnected():
            if time.time() - start_time > 15:
                print('WIFI Connected Timeout!')
                return False
    else:
        print('network information:', wlan.ifconfig())
        return True


def mqtt_callback(topic, msg):
    print('topic: {}'.format(topic))
    print('msg: {}'.format(msg))


def mqtt_publish(msg):
    client.publish(pubTopic, msg, qos=0)


if wifi_connect():
    client = MQTTClient(info["clientId"],
                        info["mqttHostUrl"],
                        info["port"],
                        info["username"],
                        info["passwd"], keepalive=keepAlive)
    client.set_callback(mqtt_callback)
    print("mqtt开始连接")
    client.connect()
    print("mqtt连接成功")
    client.subscribe(subTopic)

    client.publish(pubTopic, "你好！")

    while True:
        time.sleep(1)

```

::: warning 注意
代码中所示keepalive一定需要配置，否则连接不上，踩坑弄了很久才发现。
:::

运行以上代码，则会在物联网平台看到设备在线。并可以看到设备往平台发送的消息，日志地址：[https://iot.console.aliyun.com/lk/monitor/log](https://iot.console.aliyun.com/lk/monitor/log)

## 4.如果无法订阅消息看如下处理方案

在阿里云物联网平台，设备在线，但是无法订阅消息。安装的`umqtt.simple`
在`2017`
年之后就没有更新了，我们首先去下载源代码进行排查以及更改：[micropython-umqtt.simple](https://pypi.org/project/micropython-umqtt.simple/#files)

然后把原有导入的代码`from umqtt.simple import MQTTClient`移除掉，把上面下载的代码解压，找到`simple.py`文件完整代码复制到刚删除的地方。
经过debug发现如下代码`12行`返回`0x90`10进制为`144`错误码，导致`while 1`跳出循环。

```py {12}
    def subscribe(self, topic, qos=0):
        assert self.cb is not None, "Subscribe callback is not set"
        pkt = bytearray(b"\x82\0\0\0")
        self.pid += 1
        struct.pack_into("!BH", pkt, 1, 2 + 2 + len(topic) + 1, self.pid)
        #print(hex(len(pkt)), hexlify(pkt, ":"))
        self.sock.write(pkt)
        self._send_str(topic)
        self.sock.write(qos.to_bytes(1, "little"))
        while 1:
            op = self.wait_msg()
            print(op) # 验证订阅返回消息
            if op == 0x90:
                resp = self.sock.read(4)
                #print(resp)
                assert resp[1] == pkt[2] and resp[2] == pkt[3]
                if resp[3] == 0x80:
                    raise MQTTException(resp[3])
                return
```

然后再去平台下发指定，将会在控制台收到如下信息

```shell
topic: b'/sys/k0j6cIoeXJy/bWgfVjOdI4hIf1ju05Vf/thing/service/property/set'
msg: b'{"method":"thing.service.property.set","id":"1024580116","params":{"PowerSwitch_1":0},"version":"1.0.0"}'
```

接下来就可以把业务逻辑写进去了，然后就可以控制、检测设备了。
