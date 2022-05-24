---
lang: zh-CN  
title: 修改Gitalk代理地址，解决无法登录问题    
description: 页面的描述
---

# 修改Gitalk代理地址，解决无法登录问题

由于Gitalk配置`proxy`的默认地址`https://cors-anywhere.azm.workers.dev/...`被墙了，导致无法登录。

### 解决方案

首先编写后台接口，Python方式

````python
import requests
import flask
from flask_cors import CORS

server = flask.Flask(__name__)

# 跨域访问问题
CORS(server, resources=r'/*')

# github auth
client_id = "你自己的"
client_secret = "你自己的"


# 接口返回格式 {"access_token":"gho_COSr3lUITUX9b2J7krsKjNlnlNSOBw2g0oZ1","token_type":"bearer","scope":"public_repo"}
@server.post('/get_access_token')
def get_access_token():
    url = 'https://github.com/login/oauth/access_token'
    params = {
        'client_id': client_id,
        'client_secret': client_secret,
        'code': flask.request.json['code']
    }
    headers = {
        'accept': 'application/json'
    }
    result = requests.post(url=url, params=params, headers=headers, verify=False)
    # 存储access_token
    # ..暂时不需要
    return result.json()


if __name__ == '__main__':
    server.run(host='0.0.0.0', port=8011, debug=False)

````

Java方式

````java
略
````

修改Gitalk配置中`proxy`地址，改为我们自己的接口去访问令牌，`clientSecret`配置写在后台同时也增加了安全性。

```javascript
new Gitalk({
    // '''
    proxy: 'https://IP:PORT/get_access_token'
    //clientSecret: '', 此行配置可以去除了
    // '''
})
```

<Comment></Comment>
