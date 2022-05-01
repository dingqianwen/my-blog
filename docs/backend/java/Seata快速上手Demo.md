---
lang: zh-CN  
title: 'Seata快速上手Demo'  
description: 页面的描述
---

# Seata快速上手Demo


### 部署Nacos服务

下载nacos-server-2.1.0.tar.gz：[nacos:releases](https://github.com/alibaba/nacos/releases)

启动nacos服务

```text
cd nacos/bin/
sh startup.sh -m standalone
```

访问:`http://192.168.3.59:8848/nacos/index.html`
默认账号密码：`nacos`

### 部署Seata服务

下载seata-server-1.4.2.tar.gz：[seata:releases](https://github.com/seata/seata/releases)

首先修改`application.yml` 参考如下配置：
```yml
seata:
  config:
    # support: nacos, consul, apollo, zk, etcd3
    type: nacos
    nacos:
      server-addr: 127.0.0.1:8848
      group: SEATA_GROUP
      data-id: seataServer.properties
  registry:
    # support: nacos, eureka, redis, zk, consul, etcd3, sofa
    type: nacos
    nacos:
      application: seata-server
      server-addr: 127.0.0.1:8848
      group: SEATA_GROUP
      cluster: default
```
启动seata服务。

```shell
cd seata/bin/
sh seata-server.sh
```

访问：`http://localhost:7091/`
默认账号密码：`seata`

然后创建官方SQL脚本如下

```sql
-- for AT mode you must to init this sql for you business database. the seata server not need it.
CREATE TABLE IF NOT EXISTS `undo_log`
(
    `branch_id`     BIGINT       NOT NULL COMMENT 'branch transaction id',
    `xid`           VARCHAR(128) NOT NULL COMMENT 'global transaction id',
    `context`       VARCHAR(128) NOT NULL COMMENT 'undo_log context,such as serialization',
    `rollback_info` LONGBLOB     NOT NULL COMMENT 'rollback info',
    `log_status`    INT(11)      NOT NULL COMMENT '0:normal status,1:defense status',
    `log_created`   DATETIME(6)  NOT NULL COMMENT 'create datetime',
    `log_modified`  DATETIME(6)  NOT NULL COMMENT 'modify datetime',
    UNIQUE KEY `ux_undo_log` (`xid`, `branch_id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8 COMMENT ='AT transaction mode undo table';
```

### 快速上手

下载Demo：[seata-demo](https://gitee.com/qwding/seata-demo)

创建此项目所用的两张表，以及SQL；
```sql
CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `user` (
                        `id` int(11) NOT NULL AUTO_INCREMENT,
                        `username` varchar(255) COLLATE utf8_bin NOT NULL,
                        `age` int(3) NOT NULL,
                        PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

INSERT INTO `seata-demo`.`order` (`id`, `name`) VALUES (1, '测试');
```

依次启动以下两个项目，注意application.yml数据库地址改为自己的。
```java
org.example.ProviderOrder;
org.example.ProviderUser;
```

被测试用户服务代码如下
```java
@Slf4j
@Service
public class UserService {

    @Resource
    private OrderApi orderApi;

    @GlobalTransactional
    public Boolean update() {
        log.info("开始更新订单服务数据");
        Boolean update = orderApi.update();
        log.info("更新完毕：" + update);
        if (update) {
            // 模拟先订单更新成功后，用户服务后续业务场景失败问题，然后通知订单服务数据是否正常回滚
            throw new RuntimeException();
        }
        return true;
    }

}
```

通过PostMan请求接口进行测试分布式事务：`localhost:9020/user/update`

<AdsbyGoogle slot="7889564278" layout="in-article"/>

<Comment></Comment>
