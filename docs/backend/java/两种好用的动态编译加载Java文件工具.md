# 两种好用的动态编译加载Java文件工具

## 第一种

源码地址：[michaelliao.compiler](https://github.com/michaelliao/compiler)

```xml
<dependency>
    <groupId>com.itranswarp</groupId>
    <artifactId>compiler</artifactId>
    <version>1.0</version>
</dependency>
```

使用方式

```java
JavaStringCompiler compiler = new JavaStringCompiler();
Map<String, byte[]> results = compiler.compile("Test.java", Java代码);
Class<?> clazz = compiler.loadClass("com.Test", results);
```


## 第二种

源码地址：[Java-Runtime-Compiler](https://github.com/OpenHFT/Java-Runtime-Compiler)

```sql
<dependency>
    <groupId>net.openhft</groupId>
    <artifactId>compiler</artifactId>
    <version>2.23ea0</version>
</dependency>
```

使用方式

```java
Class clazz = CompilerUtils.CACHED_COMPILER.loadFromJava("com.Test", Java代码);
```

<Comment></Comment>
