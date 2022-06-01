---
lang: zh-CN  
title: 'Illegal group reference: group index is missing'  
description: 页面的描述  
head:

- [meta, {name: keywords, content: 'Matcher appendReplacement 遇到的异常, Illegal group reference: group index is missing'}]

---

# Matcher appendReplacement 遇到的异常

[[toc]]

### 报错信息如下

```text
-- test$

Exception in thread "main" java.lang.IllegalArgumentException: Illegal group reference: group index is missing
	at java.util.regex.Matcher.appendReplacement(Matcher.java:819)
```

或

```text
-- s0.$bds

Exception in thread "main" java.lang.IllegalArgumentException: Illegal group reference
	at java.util.regex.Matcher.appendReplacement(Matcher.java:857)
```

或

```text
-- ic.com/$70cFv

Exception in thread "main" java.lang.IndexOutOfBoundsException: No group 7
	at java.util.regex.Matcher.start(Matcher.java:375)
	at java.util.regex.Matcher.appendReplacement(Matcher.java:880)
```

### 解决方案

主要是被替换的文本中有特殊字符$，$符号处理会按照$1—$*的分组模式进行匹配。 代码改成如下方式即可，增加：`Matcher.quoteReplacement('字符串$')`；

appendReplacement问题：

```java
// bug修复 文本中的$转义
m.appendReplacement(sb,Matcher.quoteReplacement(value));
```

replaceAll问题：

```java
// bug修复 文本中的$转义
System.out.println("test".replaceAll("test",Matcher.quoteReplacement("$1")));
```

<Comment></Comment>
