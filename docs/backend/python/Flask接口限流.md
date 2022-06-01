---
lang: zh-CN  
title: 'Flask接口限流'  
description: 页面的描述  
head:

- [meta, {name: keywords, content: 'Flask接口限流, flask_limiter'}]

---

# Flask接口限流

首先安装`flask_limiter`

```shell
pip3 install flask_limiter
```

通过接口上增加此注解：`@limiter.limit("40/minute")`

> 40 per minute 每分钟只能访问40次  
> 2000 per hour 每小时只能访问2000次  
> 等等

代码如下

```python
import flask
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address


server = flask.Flask(__name__)

limiter = Limiter(
    server,
    # 根据ip限流
    key_func=get_remote_address,
    # 默认方案 每小时2000，每分钟100，适用于所有路线。如果想忽略此全局配置，方法上增加此注解@limiter.exempt 
    default_limits=["2000 per hour", "100 per minute"]
)


@server.get('/test')
@limiter.limit("40/minute")
def test():

    return '{"code":0,"msg":"成功！"}'
```

自定义限流方法

```python
def getRealIp() -> str:
    """
       读取headers中的X-Real-Ip，如果没有返回 127.0.0.1
    """
    return flask.request.headers.get('X-Real-Ip') or "127.0.0.1"
    
# 修改 key_func=getRealIp,    
```

更多请查看：[Flask-Limiter](https://blog.csdn.net/suiyuejian/article/details/117930250)

<Comment></Comment>
