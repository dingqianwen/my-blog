---
lang: zh-CN
title: '自建服务器-阿里云动态域名绑定'
description: 页面的描述
head:

  - [ meta, { name: keywords, content: '自建服务器-阿里云动态域名绑定, 华为路由器获取外网IP' } ]

---

# 自建服务器-阿里云动态域名绑定

[[toc]]

## 背景

因为阿里云等云服务器资源过于贵，于是想到自己购买了一台华硕的台式机（6C12T16G）来部署自己的网站，但是需要解决以下问题：

- 停电来电后自动启动
- 公网IP-非固定IP

## 停电来电后自动启动

这个比较简单，只需要在BIOS设置下即可，每个电脑主板不一样，设置路径不一样，这里不做介绍，
或者也可以购买一个向日葵开机棒。

## 公网IP

这个需要与运营商打电话，让家里的宽带改为公网，如果能固定IP地址，则不用看以下步骤。
我这边是因为老家那边宽带不给改，需要拉专线，费用有点高，每隔一段时间，公网IP地址就变了，导致原来域名解析对应的IP变更，
无法访问服务器资源。

## 动态域名-方案1（不稳定）

通过路由器自带的动态域名服务DDNS，基本现在主流的路由器都支持

<img src="https://oss-xuxin.oss-cn-beijing.aliyuncs.com/blog/img/kMICd0.png" alt="none" style="width: 90%;height: 90%;border-radius: 6px;">

缺点是有时候公网IP已经变了很久，但是域名绑定的还是旧的IP地址，更新不及时。

## 动态域名-方案2

想到通过阿里云的相关接口，通过在自建服务器运行Python定时任务，获取当前公网IP地址，然后更新到阿里云的域名解析中，代码参考：

```py
import time
import requests
# pip install aliyun-python-sdk-core
# pip install aliyun-python-sdk-alidns
from aliyunsdkcore.client import AcsClient
from aliyunsdkcore.request import CommonRequest

# 阿里云AccessKey
access_key_id = '************************'
access_key_secret = '************************'
rr = '@'
type = 'A'
# 登录域名列表页面，F12看接口返回查询到域名对应的记录ID dingqw.com
record_id = '86611287****3492096'


# 获取当前主机外网ip
def get_ip():
    try:
        # ipinfo.io/183.178.176.10?token=ce287aa5eedc81
        # http://ifconfig.me/ip
        response = requests.get('http://ifconfig.me/ip', timeout=8)
        if response.status_code == 200:
            # return json.loads(response.content.decode('utf-8').strip())['ip']
            return response.content.decode('utf-8').strip()
        print("无法获取外网IP地址", flush=True)
    except Exception as e:
        print(f'获取地址失败：{e}', flush=True)
    return None


# 更新解析记录
def parse_ip(access_key_id, access_key_secret, record_id, rr, type, ip):
    # 初始化阿里云API客户端
    client = AcsClient(access_key_id, access_key_secret, 'cn-hangzhou')
    # 更新解析记录
    request = CommonRequest()
    request.set_domain('alidns.aliyuncs.com')
    request.set_version('2015-01-09')
    request.set_action_name('UpdateDomainRecord')
    request.add_query_param('RecordId', record_id)
    request.add_query_param('RR', rr)
    request.add_query_param('Type', type)
    request.add_query_param('Value', ip)
    try:
        response = client.do_action_with_exception(request)
        print(response.decode(), flush=True)
    except Exception as e:
        print(e, flush=True)
        pass


# 获取公网IP地址
# ip = requests.get('http://ip.42.pl/raw').text
current_ip = get_ip()
print(f"本机外网 IP 地址为：{current_ip}", flush=True)
parse_ip(access_key_id, access_key_secret, record_id, rr, type, current_ip)

while True:
    ip = get_ip()
    if ip is not None and ip != current_ip:
        print(f"有变更，IP地址为：{ip}", flush=True)
        # 更新解析记录
        parse_ip(access_key_id, access_key_secret, record_id, rr, type, ip)
        current_ip = ip
    time.sleep(10)

```

> pythonw ddns.py

缺点就是因为查询当前电脑主机外网IP时，都是调用的第三方服务接口，即不稳定，有时候这个接口可能会屏蔽掉，
无法使用等情况。

### 升级方案

突然想到路由器是有获取外网IP地址的，作者用的路由器型号为：华为AX3，看下图

<img src="https://oss-xuxin.oss-cn-beijing.aliyuncs.com/blog/img/DoSJ9b.png" alt="none" style="width: 90%;height: 90%;border-radius: 6px;">

我们只需要获取到以上返回的WAN IP地址即可，打开F12，发现调用接口如：[http://192.168.3.1/api/ntwk/wandetect](http://192.168.3.1/api/ntwk/wandetect)，返回如下数据

```json
{
  "ID": "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.1.WANPPPConnection.1.",
  "IPv6ConnectionStatus": "Connected",
  "AutoFlag": "0",
  "BackupStatus": 1,
  "PVCResult": "",
  "Uptime": 16778,
  "IPv6PrefixLength": 64,
  "ConnectionStatus": "Connected",
  "ExternalIPAddress": "1.196.83.191",
  "HttpStatus": 2,
  "AccessPortCount": 4,
  "ConnectionType": "PPP_Routed",
  "DefaultGateway": "1.196.83.254",
  "IPv6Address": "240e:33c:7900:3d09:81eb:faf7:1498:3b43\/64",
  "ErrReason": "Success",
  "IPv6PrefixList": "240e:33d:7913:2000::\/64",
  "IPv6Enable": true,
  "Status": "Connected",
  ...
}
```

而以上`ExternalIPAddress`就是我们想要的值，如何调用此接口呢，直接调用肯定不能通过，因为需要登录验证。费了一番功夫，才获取到登录会话信息，安全也是没谁了，参考如下Python代码：

```py
import random
import json
import hashlib
import hmac
import requests


class HWRouter:
    def __init__(self, url, username, password):
        self.cookie = None
        self.url = url
        self.username = username
        self.password = password

    def init(self):
        response = requests.get(self.url + "/html/index.html")
        if response.status_code == 200:
            res_data = response.text
            csrf_param_start = res_data.find("csrf_param")
            res_data = res_data[csrf_param_start:]
            csrf_param_start = res_data.find("=\"") + 2
            csrf_param_end = res_data.find("\"/>")
            csrf_param = res_data[csrf_param_start:csrf_param_end].strip()

            csrf_token_start = res_data.find("csrf_token")
            res_data = res_data[csrf_token_start:]
            csrf_token_start = res_data.find("=\"") + 2
            csrf_token_end = res_data.find("\"/>")
            csrf_token = res_data[csrf_token_start:csrf_token_end].strip()

            cookie_path = response.headers.get("Set-Cookie")
            cookie_split = cookie_path.index(";")
            self.cookie = cookie_path[:cookie_split]
            return csrf_param, csrf_token
        else:
            return False

    def login(self):
        csrf_param, csrf_token = self.init()
        first_nonce = self.random_nonce()
        login_nonce = self.user_login_nonce(first_nonce, csrf_param, csrf_token)
        if login_nonce is None:
            return False
        iterations = login_nonce.get('iterations')
        salt = login_nonce.get('salt')
        server_nonce = login_nonce.get('servernonce')
        csrf_token = login_nonce.get('csrf_token')
        csrf_param = login_nonce.get('csrf_param')
        salted_password = self.get_salted_password(self.password, self.hex_to_byte_array(salt), iterations)
        client_key = self.get_hmac("Client Key", salted_password)
        store_key = self.get_store_key(client_key)
        auth_msg = first_nonce + "," + server_nonce + "," + server_nonce
        client_signature = self.get_hmac(auth_msg, store_key)
        new_arr = [0] * len(client_key)
        for i in range(len(client_key)):
            new_arr[i] = client_key[i] ^ client_signature[i]
        client_proof = self.bytes_to_hex(new_arr)
        login = {"data": {"clientproof": client_proof,
                          "finalnonce": server_nonce},
                 "csrf": {"csrf_param": csrf_param,
                          "csrf_token": csrf_token}}
        headers = {
            "Cookie": self.cookie,
            "Content-Type": "application/json"
        }
        response = requests.post(self.url + "/api/system/user_login_proof", headers=headers,
                                 data=json.dumps(login))
        self.cookie = response.headers["Set-Cookie"]
        return True

    def user_login_nonce(self, first_nonce, csrf_param, csrf_token):
        headers = {
            "Cookie": self.cookie,
            "Content-Type": "application/json"
        }
        payload = {
            "csrf": {
                "csrf_param": csrf_param,
                "csrf_token": csrf_token
            },
            "data": {
                "firstnonce": first_nonce,
                "username": self.username
            }
        }
        response = requests.post(self.url + "/api/system/user_login_nonce", headers=headers, data=json.dumps(payload))
        if response.status_code == 200:
            reps_json = response.json()
            if "Set-Cookie" in response.headers:
                self.cookie = response.headers["Set-Cookie"]
            return reps_json
        return None

    def get_salted_password(self, password, salt, iterations):
        salted_password = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, iterations, dklen=32)
        return salted_password

    def get_hmac(self, key, input_data):
        hmac_obj = hmac.new(key.encode('ascii'), input_data, hashlib.sha256)
        return hmac_obj.digest()

    def get_store_key(self, client_key):
        store_key = hashlib.sha256(client_key).digest()
        return store_key

    def hex_to_byte_array(self, in_hex):
        hex_length = len(in_hex)
        result = bytearray()

        if hex_length % 2 == 1:
            hex_length += 1
            in_hex = "0" + in_hex
        for i in range(0, hex_length, 2):
            result.append(int(in_hex[i:i + 2], 16))

        return result

    def bytes_to_hex(self, bytes):
        return ''.join(['{:02x}'.format(byte) for byte in bytes])

    def random_nonce(self):
        rand = "abcdef1234567890"
        sb = []
        for i in range(64):
            number = random.randint(0, len(rand) - 1)
            sb.append(rand[number])
        return ''.join(sb)

    def get(self, url):
        headers = {"Cookie": self.cookie}
        response = requests.get(self.url + url, headers=headers)
        if response.status_code == 200:
            body = response.json()
            new_header = response.headers.get("Set-Cookie")
            if new_header:
                self.cookie = new_header
            return body
        else:
            return None


if __name__ == "__main__":
    # 默认
    url = "http://192.168.3.1"
    # 默认，用户名不用动
    username = "admin"
    # 改为自己路由器的密码
    password = "******"
    m = HWRouter(url, username, password)
    if m.login():
        # 获得主机
        data = m.get("/api/ntwk/wandetect")
        externalIPAddress = data.get("ExternalIPAddress")
        print("ExternalIPAddress : " + externalIPAddress)
```

直接修改下以上代码`password`，其他不用动，基本都是通用的，直接运行即可获取到外网IP地址。
最后开始的`ddns.py`文件，`get_ip()`修改下即可。

<Comment></Comment>