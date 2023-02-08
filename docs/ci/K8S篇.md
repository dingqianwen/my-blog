---
lang: zh-CN    
title:  K8S篇          
description: 页面的描述   
---

# K8S篇

## k8s的组件有哪些，作用分别是什么？

k8s主要由master节点和node节点构成。master节点负责管理集群，node节点是容器应用真正运行的地方。  
master节点包含的组件有：kube-api-server、kube-controller-manager、kube-scheduler、etcd。  
node节点包含的组件有：kubelet、kube-proxy、container-runtime。

## kubelet的功能、作用是什么？

1、节点管理。
2、pod管理。
3、容器健康检查
4、Metrics Server资源监控。

## k8s中命名空间的作用是什么？

namespace是kubernetes系统中的一种非常重要的资源，namespace的主要作用是用来实现多套环境的资源隔离，或者说是多租户的资源隔离。
  
## pod的存活探针有哪几种？（必须记住3种探测方式，重点，经常问）

kubernetes可以通过存活探针检查容器是否还在运行，可以为pod中的每个容器单独定义存活探针，kubernetes将定期执行探针，
如果探测失败，将杀死容器，并根据restartPolicy策略来决定是否重启容器，kubernetes提供了3种探测容器的存活探针，如下：

- httpGet：通过容器的IP、端口、路径发送http 请求，返回200-400范围内的状态码表示成功。  
- exec：在容器内执行shell命令，根据命令退出状态码是否为0进行判断，0表示健康，非0表示不健康。  
- TCPSocket：与容器的IP、端口建立TCP Socket链接，能建立则说明探测成功，不能建立则说明探测失败。  

