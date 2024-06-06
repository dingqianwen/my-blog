---
lang: zh-CN
title: 开机自启动Java程序
description: 页面的描述
head:

  - [ meta, { name: keywords, content: '开机自启动Java程序' } ]

---

# 开机自启动Java程序

打开终端，并以管理员权限编辑服务文件

```shell
sudo vim /etc/systemd/system/start-rule-web.service
```

在编辑器中，添加文件内容为：

```shell
[Unit]
Description=Rule engine web server
After=multi-user.target

[Service]
Type=simple
ExecStart=/usr/local/jdk1.8/jre/bin/java -jar -server -Xms2048m -Xmx2048m -Xss512k -XX:SurvivorRatio=8 -XX:+UseConcMarkSweepGC -Dfile.encoding=UTF-8 /home/pi/java/rule-engine-web-3.0.jar --server.port=8010
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

> 注意：Java以及Jar改为自己文件所在目录!

保存并关闭文件，然后启用新创建的服务并重新加载 systemd：

```shell
sudo systemctl enable start-rule-web.service
sudo systemctl daemon-reload
```

手动启动服务：

```shell
sudo systemctl start start-rule-web.service
```

手动终止服务：

```shell
sudo systemctl stop start-rule-web.service
```

查看服务状态：

```shell
sudo systemctl status start-rule-web.service
```

<Comment></Comment>
