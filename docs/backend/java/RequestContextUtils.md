---
lang: zh-CN  
title: Spring项目中获取当前Request对象工具  
description: 页面的描述  
head:

- [meta, {name: keywords, content: 'Spring项目中获取当前Request对象工具, RequestContextHolder'}]

---

# Spring项目中获取当前Request对象工具

注意不可以在线程内部使用，因为Spring的`RequestContextHolder#requestAttributesHolder`底层方法`setRequestAttributes`
入参`inheritable = false`默认通过`ThreadLocal`实现，数据不具备传递到子线程使用，具体使用方式如下

```java
public class Test {
    public void test() {
        HttpServletRequest request = RequestContextUtils.getRequest();
        HttpServletResponse response = RequestContextUtils.getResponse();
    }
}
```

此工具实现代码如下

```java

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 〈一句话功能简述〉<br>
 * 〈〉
 *
 * @author 丁乾文
 * @date 2019/8/19
 * @since 1.0.0
 */
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class RequestContextUtils {

    /**
     * 获取当前请求的request
     *
     * @return HttpServletRequest
     */
    public static HttpServletRequest getRequest() {
        return getServletRequestAttributes().getRequest();
    }

    /**
     * 获取当前请求的Response
     *
     * @return HttpServletResponse
     */
    public static HttpServletResponse getResponse() {
        return getServletRequestAttributes().getResponse();
    }

    private static ServletRequestAttributes getServletRequestAttributes() {
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (requestAttributes == null) {
            throw new RuntimeException("not request");
        }
        return requestAttributes;
    }

}

```

<Comment></Comment>
