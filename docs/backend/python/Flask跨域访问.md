---
lang: zh-CN  
title: 'Flask跨域访问'  
description: 页面的描述  
head:

- [meta, {name: keywords, content: 'Flask跨域访问, flask-cors'}]

---

# Flask跨域访问

报错信息如下

```text
has been blocked by CORS policy: No ‘Access-Control-Allow-Origin‘ header...
```

解决办法,首先执行以下命令

```shell
pip install -U flask-cors
```

然后增加以下代码

```python
import flask
from flask_cors import CORS

server = flask.Flask(__name__)
# 修复跨域访问问题
CORS(server, resources=r'/*')
```

<Comment></Comment>
