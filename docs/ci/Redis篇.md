---
lang: zh-CN    
title:  Redis篇          
description: 页面的描述   
---

# Redis篇

Redis是用C语言开发的一个开源的高性能键值对数据库。它提供多种数据类型来适用不同场景下的存储需求

- 目前为止redis支持的键值数据类型有五种：  

|名称|说明|
|--|--|
|字符串类型（string）|redis中没有使用C语言的字符串表示，而是自定义一个数据结构叫SDS（simple dynamic string）即简单动态字符串。redis的字符串是二进制安全的。  |
|散列类型（hash）|hash叫散列类型，它提供了字段和字段值的映射。字段值只能是字符串类型，不支持散列类型、集合类型等其它类型。 |
|列表类型(list)|Redis列表是简单的字符串列表，按照插入顺序排序。你可以添加一个元素到列表的头部或者尾部。它的底层是一个链表。|
|集合类型(set)|Redis的Set的histring类型的无序集合。他是通过HashTable实现的。|
|有序集合类型(zset)|Redis zset和set一样也是string类型元素的集合，而且不允许重复的成员。不同的是每个元素都会关联一个double类型的分数。redis正是通过分数来为集合中的成员进行从小到大的排序。zset的成员是唯一的，但分数（score）却可以重复。|


## Redis的哨兵机制

Redis主从之间可以通过哨兵进行检查,如果主节点出现故障,会自动切换从节点为主


## Redis Cluster集群原理

Redis Cluster集群默认16384个hash槽,集群搭建成功之后,需要给每一个主节点分配hash槽。
当外部数据插入的时候,会对key进行crc16然后对16384取模,这样就计算出哪个节点对该数据进行管理。我们在项目当中采用的3主3从的结构,主从之间通过哨兵,出现故障自动切换.

## Redis是单线程执行的，为什么性能这么高?

Redis通过C语言实现了多路复用、轮询的机制,保证了高性能(NIO)

## Redis持久化

Redis支持两种方式的持久化，一种是RDB方式，一种是AOF方式。默认使用Rdb。 

- RDB（快照）  
RDB方式的持久化是通过快照（snapshotting）完成的，当符合一定条件时Redis会自动将内存中的数据进行快照并持久化到硬盘。  

- AOF  
默认情况下Redis没有开启AOF（append only file）方式的持久化，可以通过appendonly参数开启：appendonly yes。开启AOF持久化后每执行一条会更改Redis中的数据的命令，Redis就会将该命令写入硬盘中的AOF文件。AOF文件的保存位置和RDB文件的位置相同，都是通过dir参数设置的，默认的文件名是appendonly.aof 

 