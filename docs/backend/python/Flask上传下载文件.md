---
lang: zh-CN  
title: 'Flask上传下载文件'  
description: 页面的描述  
head:

- [meta, {name: keywords, content: 'Flask上传下载文件'}]

---

# Flask上传下载文件


通过Flask上传文件参考如下

```py
@server.post('/upload')
def transfer_upload():
    f = request.files['file']
    dir = "/temp/"
    if not os.path.exists(dir):
        os.makedirs(dir)
    f.save(os.path.join(dir, f.filename))
    return jsonify({"code": 0, "msg": "成功！"})
```

通过Flask下载文件参考如下

```py
@server.get('/download')
def transfer_download():
    with open('/temp/test.png', 'rb') as f:
        stream = f.read()
    response = Response(stream, content_type='application/octet-stream;charset=UTF-8')
    response.headers["Content-Disposition"] = "attachment;filename={}".format(quote(f.name.encode('utf-8')))
    return response
```

需要注意配置以下参数

```py {3}
server = flask.Flask(__name__)
# 限制单次上传文件大小1G
server.config['MAX_CONTENT_LENGTH'] = 1 * 1024 * 1024 * 1024
```

### 相关错误

#### Failed to load resource: the server responded with a status of 413 (Request Entity Too Large)

[解决方案](../nginx/RequestEntityTooLarge.md)

#### net::ERR_CONTENT_LENGTH_MISMATCH 200 (OK)

[解决方案](../nginx/ERR_CONTENT_LENGTH_MISMATCH200.md)

<Comment></Comment>
