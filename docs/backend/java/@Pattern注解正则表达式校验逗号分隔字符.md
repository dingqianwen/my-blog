---
lang: zh-CN  
title:  '@Pattern注解正则表达式校验逗号分隔字符'  
description: 页面的描述  
---

# @Pattern注解正则表达式校验逗号分隔字符


只允许通过`02或03、04、05` 可以有多个，中间逗号隔开。

### 校验规则如下：
```text
02,05,03  = true
40,04  = false
05,04  = true
```

### 正则表达式如下：
```text
\\G(02|03|04|05|,)+
```

### 代码如下：
```java
@Data
class Bean {

    
    @Pattern(
            regexp = "\\G(02|03|04|05|,)+",
            // 只有'/n'才被认作一行的中止
            flags = {Pattern.Flag.UNIX_LINES}
    )
    public String text;

    public static void main(String[] args) {
        Bean bean = new Bean();
        bean.setText("02,WX");
        System.out.println(doValidator(bean));
    }

    public static boolean doValidator(Object bean) {
        //参数校验,带有注解的属性校验
        Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
        //验证某个对象,，其实也可以只验证其中的某一个属性的
        Set<ConstraintViolation<Object>> constraintViolations = validator.validate(bean);
        Iterator<ConstraintViolation<Object>> iter = constraintViolations.iterator();
        if (iter.hasNext()) {
            ConstraintViolation<Object> next = iter.next();
            System.out.println(next.getMessage());
            return false;
        }
        return true;
    }
    
}
```


<Comment></Comment>
