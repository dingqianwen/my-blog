---
lang: zh-CN    
title:  MQ篇            
description: 页面的描述   
---  

# MQ篇 

MQ称为消息队列，主要作用请求削峰，异步处理，系统通过将消息的发送和接收分离来实现应用程序的异步和解偶。


## RabbitMQ的消息发布模式

RabbitMQ支持了点对点，通配符，广播模式等发送方式。

- 点对点，发送消息指定消息routing key为a.b，只有接收端交换机和队列使用a.b绑定的时候才可以使用
- exchange发布订阅，群发模式。

## RabbitMQ如何保证消息不会丢失?

- 关闭 RabbitMQ提供的自动ACK消息确认机制，改为消费者处理完消息之后,手动ACK(基于tcp的ack事务包)
- 开启事务
- 开启重试机制


