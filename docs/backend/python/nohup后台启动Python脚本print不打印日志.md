---
lang: zh-CN  
title: nohup后台启动Python脚本print不打印日志问题  
description: 页面的描述
---

# nohup后台启动Python脚本Print不打印日志问题

通过以下命令执行Python脚本，却没有Print的日志输出

```shell
nohup python mb-server.py &
```

Python的输出有缓冲，导致日志文件并不能够马上看到输出。 执行加上`-u`参数，使得Python不启用缓冲。改为以下方式即可

```shell
nohup python -u mb-server.py &
```

或者print方法增加`flush=True`

```python
print('你好！', flush=True)
```

<Comment></Comment>
