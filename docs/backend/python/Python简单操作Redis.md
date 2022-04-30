---
lang: zh-CN  
title: 'Python简单操作Redis'  
description: 页面的描述
---

# Python简单操作Redis

首先安装`redis`

```shell
pip3 install redis
```

代码如下：

```python
# encoding: utf-8

import flask
import redis

server = flask.Flask(__name__)
redisClient = redis.Redis(host='***', password='***', port=***, db=1, decode_responses=True)


@server.get('/set')
def set():
    key = flask.request.values.get('key')
    value = flask.request.values.get('value')
    print('set value key:%s,value:%s', key, value)
    redisClient.set(key, value)
    return '{"code":0,"msg":"成功！"}'


@server.get('/get')
def get():
    key = flask.request.values.get('key')
    return '{"code":0,"msg":"成功！","data":%s}' % redisClient.get(key)


if __name__ == '__main__':
    server.run(host='0.0.0.0', port=8001, debug=True)

```

使用方式

```text
http://localhost:8001/set?key=test&value=我是张三
// {"code":0,"msg":"成功！"}

http://localhost:8001/get?key=test
// {"code":0,"msg":"成功！","data":我是张三}
```

<Comment></Comment>
