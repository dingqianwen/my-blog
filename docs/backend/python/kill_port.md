---
lang: zh-CN  
title: 关闭端口号下所有进程工具  
description: 页面的描述  
head:

- [meta, {name: keywords, content: '关闭端口号下所有进程工具, kill_port'}]

---

# 关闭端口号下所有进程工具

平时想关闭指定端口下的进程，首先需要根据端口号查询到进程信息，再去KILL PID，感觉很麻烦，所以本懒人开发了一个小工具，使用方式如下：

```shell
(venv) dingqianwen@localhost pythonProject % python kill_port.py 8011
进程个数为： 2
当前进程信息：
COMMAND   PID        USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
Python  11110 dingqianwen    8u  IPv4 0x5d1d9cde26fe75b3      0t0  TCP *:8011 (LISTEN)
Python  11110 dingqianwen   10u  IPv4 0x5d1d9cde26fe75b3      0t0  TCP *:8011 (LISTEN)
输入回车键确认执行，取消请输入Control+Z！
已关闭： 11110
已关闭： 11110
```

代码如下：

```python
# encoding: utf-8

import sys
import os
import platform

# attachment; filename=kill_port.py

if len(sys.argv) != 2:
    print("正确格式应为：python kill_port.py 8011 | ./kill_port 8011")
else:
    port = sys.argv[1]
    if not port.isdigit():
        print("端口号只能为数字：", port)
    sys = platform.system()
    if sys == 'Darwin' or sys == 'Linux':
        r = os.popen("lsof -i tcp:" + port)
        text = r.read()
        array = text.split("\n")
        print("进程个数为：", 0 if len(array) - 2 <= -1 else len(array) - 2)
        if len(array) > 1:
            print("当前进程信息：")
            for arr in array:
                if len(arr) > 1:
                    print(arr)
            input("输入回车键确认执行，取消请输入Control+Z！")
        for arr in array:
            ar = ' '.join(arr.split()).split(" ")
            if len(ar) > 1:
                pid = ar[1]
                if pid != 'PID':
                    os.system("kill -9 " + pid)
                    print('已关闭：', pid)
        r.close()
    elif sys == 'Windows':
        r = os.popen("netstat -ano | findstr :" + port)
        text = r.read()
        array = text.split("\n")
        print("进程个数为：", len(array) - 1)
        if len(array) > 1:
            print("当前进程信息：")
            for arr in array:
                if len(arr) > 1:
                    print(arr)
            try:
                input("输入回车键确认执行，取消请输入Ctrl+C！")
            except KeyboardInterrupt:
                raise SystemExit
        for arr in array:
            ar = ' '.join(arr.split()).split(" ")
            if len(ar) > 1:
                pid = ar[len(ar) - 1]
                if pid:
                    os.system("taskkill /PID " + pid)
                    print('已关闭：', pid)
        r.close()
    else:
        print("系统暂不支持！")
```

打包为可执行文件，方便使用，首先安装`pyinstaller`

```shell
pip3 install pyinstaller
```

然后执行

```shell
pyinstaller --onefile --nowindowed kill_port.py
```

得到`dist`文件夹，里面有个`kill_port`文件，使用方式如下：

```shell
./kill_port 8080
```

[下载kill_port.py](https://oss-xuxin.oss-cn-beijing.aliyuncs.com/blog/tool/kill_port.py)   
[下载kill_port](https://oss-xuxin.oss-cn-beijing.aliyuncs.com/blog/tool/kill_port) 

```shell
wget https://oss-xuxin.oss-cn-beijing.aliyuncs.com/blog/tool/kill_port.py
# 编译后，可直接执行版本
wget https://oss-xuxin.oss-cn-beijing.aliyuncs.com/blog/tool/kill_port
```

<AdsbyGoogle slot="7889564278" layout="in-article"/>

<Comment></Comment>
