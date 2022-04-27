---
lang: zh-CN  
title: '记录MAC简易安装Kuboard过程'  
description: 页面的描述
---

# 记录MAC简易安装Kuboard过程

### Docker

首先安装Docker:[下载链接](https://docs.docker.com/desktop/mac/install/)此次安装的Docker版本如下：

```text
dingqianwen@localhost ~ % docker --version
Docker version 20.10.14, build a224086
```

### Kubernetes

在任务栏点击：`Docker for mac 应用图标 -> Perferences... -> Kubernetes -> Enable Kubernetes`


### Kuboard

然后安装[Kuboard](http://press.demo.kuboard.cn),命令执行：

```shell
kubectl apply -f https://addons.kuboard.cn/kuboard/kuboard-v3.yaml
```

> kubectl 是 Kubernetes 的命令行工具(CLI),是 Kubernetes 用户和管理员必备的管理工具

然后执行指令 `kubectl get pods -n kuboard`，等待 kuboard 名称空间中所有的 Pod 就绪，如下所示

```shell
dingqianwen@localhost ~ % kubectl get pods -n kuboard
NAME                               READY   STATUS    RESTARTS        AGE
kuboard-agent-2-6594fc865d-clnzp   1/1     Running   2 (5m53s ago)   6m48s
kuboard-agent-5d544dcf66-hxmn9     1/1     Running   2 (5m49s ago)   6m48s
kuboard-etcd-jjk8h                 1/1     Running   0               8m12s
kuboard-questdb-5465d9bb88-x67xv   1/1     Running   0               6m48s
kuboard-v3-5fc46b5557-ktkc6        1/1     Running   0               8m12s
dingqianwen@localhost ~ % 
```

预计等待2分钟，然后访问Kuboard,在浏览器中打开链接：`http://localhost:30080` 输入初始用户名和密码，并登录

> 用户名： `admin`  
> 密码： `Kuboard123`


<Comment></Comment>
