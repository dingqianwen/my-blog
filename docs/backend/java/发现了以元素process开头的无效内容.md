---
lang: zh-CN
title: 'org.mybatis.spring.MyBatisSystemException: nested exception is org.apache.ibatis.exceptions.Persiste'
description: 页面的描述
---

## 异常信息
org.activiti.bpmn.exceptions.XMLException: cvc-complex-type.2.4.a: 发现了以元素 'process' 开头的无效内容。
## 解决办法
加上disableSchemaValidation() 禁止校验文件就可以了
```java
    /**
     * 部署流程文件
     */
    @Test
    public void deploy() {
        DeploymentBuilder builder = engineEngine.getRepositoryService().createDeployment();
        Deployment deploy = builder.name("test")
                // org.activiti.bpmn.exceptions.XMLException: cvc-complex-type.2.4.a: 发现了以元素 'process' 开头的无效内容。
                .disableSchemaValidation() //禁用架构验证
                .addClasspathResource("processes/test.bpmn")
                .deploy();
        log.info("部署完成:{}", deploy.getId());
    }

```

<Comment></Comment>
