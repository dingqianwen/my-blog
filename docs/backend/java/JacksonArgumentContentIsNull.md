---
lang: zh-CN  
title:  'ReadValue IllegalArgumentException: argument "content" is null'  
description: 页面的描述  
head:

- [meta, {name: keywords, content: 'argument "content" is null, IllegalArgumentException, readValue'}]

---

# ReadValue IllegalArgumentException: argument "content" is null

通过`objectMapper.readValue();`执行报错，异常信息如下

```text
Exception in thread "main" java.lang.IllegalArgumentException: argument "content" is null
	at com.fasterxml.jackson.databind.ObjectMapper._assertNotNull(ObjectMapper.java:4737)
	at com.fasterxml.jackson.databind.ObjectMapper.readValue(ObjectMapper.java:3435)
```

原因是因为调用`readValue(参数, class)`方法时，参数传了一个`null`导致



<Comment></Comment>
