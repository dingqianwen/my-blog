---
lang: zh-CN  
title: '表单校验工具，手动校验类中注解'  
description: 页面的描述
---

# 表单校验工具，手动校验类中注解

使用方式如下

```java
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class Test {

    public static void main(String[] args) {
        User user = new User();
        user.setName("张三");
        ValidationUtils.validate(user);
    }

}

@Data
class User {

    @NotBlank
    private String name;

    /**
     * 或者 @NotNull(message = "年龄不能为空")  则会提示：javax.validation.ValidationException: 年龄不能为空
     */
    @NotNull
    private Integer age;

}
```

输出

```text
Exception in thread "main" javax.validation.ValidationException: [age]不能为null
	at cn.ruleengine.core.ValidationUtils.validate(Test.java:60)
	at cn.ruleengine.core.Test.main(Test.java:27)
```

### 实现如下

首先导入依赖

```xml
<dependency>
    <groupId>org.hibernate</groupId>
    <artifactId>hibernate-validator</artifactId>
    <version>6.1.7.Final</version>
</dependency>
<dependency>
    <groupId>org.glassfish</groupId>
    <artifactId>jakarta.el</artifactId>
    <version>3.0.3</version>
</dependency>
```

代码如下

```java
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.ValidationException;
import javax.validation.Validator;
import java.util.Iterator;
import java.util.Set;

public final class ValidationUtils {

    private final static Validator VALIDATOR = Validation.buildDefaultValidatorFactory().getValidator();

    /**
     * 校验对象中注解 @NotBlank @NotNull 等
     *
     * @param instance 被校验的类
     */
    public static void validate(Object instance) {
        // 验证某个对象,，其实也可以只验证其中的某一个属性的
        Set<ConstraintViolation<Object>> constraintViolations = VALIDATOR.validate(instance);
        Iterator<ConstraintViolation<Object>> iter = constraintViolations.iterator();
        if (iter.hasNext()) {
            ConstraintViolation<Object> next = iter.next();
            String messageTemplate = next.getMessageTemplate();
            if (messageTemplate.startsWith("{") && messageTemplate.endsWith("}")) {
                throw new ValidationException("[" + next.getPropertyPath().toString() + "]" + next.getMessage());
            } else {
                throw new ValidationException(next.getMessage());
            }
        }
    }

}
```

<Comment></Comment>
