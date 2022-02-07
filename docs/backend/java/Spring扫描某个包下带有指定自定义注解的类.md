---
lang: zh-CN
title: Spring扫描某个包下带有指定自定义注解的类
description: 页面的描述
---


# Spring扫描某个包下带有指定自定义注解的类

[[toc]]

### 代码如下：
```java
package com;

import org.springframework.util.CollectionUtils;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.core.type.classreading.MetadataReader;
import org.springframework.core.type.classreading.MetadataReaderFactory;
import org.springframework.core.type.classreading.SimpleMetadataReaderFactory;
import org.springframework.core.type.filter.AnnotationTypeFilter;
import org.springframework.core.type.filter.TypeFilter;
import org.springframework.util.ClassUtils;

import java.io.IOException;
import java.lang.annotation.Annotation;
import java.util.*;

/**
 * 〈一句话功能简述〉<br>
 * 〈〉
 *
 * @author 丁乾文
 * @date 2019/8/13
 * @since 1.0.0
 */
public class LoadPackageClasses {

    private static final String RESOURCE_PATTERN = "/**/*.class";

    private Set<String> packagesList;

    private final List<TypeFilter> typeFilters = new LinkedList<>();

    private final Set<Class<?>> classSet = new HashSet<>();

    /**
     * LoadPackageClasses构造函数
     *
     * @param packagesToScan   指定哪些包需要被扫描,支持多个包"package.a,package.b"并对每个包都会递归搜索
     * @param annotationFilter 指定扫描包中含有特定注解标记的bean,支持多个注解
     */
    @SafeVarargs
    public LoadPackageClasses(Set<String> packagesToScan, Class<? extends Annotation>... annotationFilter) throws IOException, ClassNotFoundException {
        if (CollectionUtils.isEmpty(packagesToScan)) {
            return;
        }
        this.packagesList = Objects.requireNonNull(packagesToScan);
        if (annotationFilter != null) {
            for (Class<? extends Annotation> annotation : annotationFilter) {
                typeFilters.add(new AnnotationTypeFilter(annotation, false));
            }
        }
        this.loadClassSet();
    }

    private void loadClassSet() throws IOException, ClassNotFoundException {
        ResourcePatternResolver resourcePatternResolver = new PathMatchingResourcePatternResolver();
        for (String pkg : this.packagesList) {
            String pattern = ResourcePatternResolver.CLASSPATH_ALL_URL_PREFIX +
                    ClassUtils.convertClassNameToResourcePath(pkg) + RESOURCE_PATTERN;
            Resource[] resources = resourcePatternResolver.getResources(pattern);
            MetadataReaderFactory readerFactory = new SimpleMetadataReaderFactory(resourcePatternResolver);
            for (Resource resource : resources) {
                if (resource.isReadable()) {
                    MetadataReader reader = readerFactory.getMetadataReader(resource);
                    String className = reader.getClassMetadata().getClassName();
                    if (this.matchesEntityTypeFilter(reader, readerFactory)) {
                        this.classSet.add(Class.forName(className));
                    }
                }
            }
        }
    }

    public Set<Class<?>> getClassSet() {
        return this.classSet;
    }


    private boolean matchesEntityTypeFilter(MetadataReader reader, MetadataReaderFactory readerFactory) throws IOException {
        if (!this.typeFilters.isEmpty()) {
            for (TypeFilter filter : this.typeFilters) {
                if (filter.match(reader, readerFactory)) {
                    return true;
                }
            }
        }
        return false;
    }

}

```

### 使用方式：
```java
    public static void main(String[] args) throws IOException, ClassNotFoundException {
        // 扫描某个包下带有指定注解的类
        Set<String> packages = new HashSet<>();
        packages.add("com.*");
        LoadPackageClasses packageClasses = new LoadPackageClasses(packages, 自定义注解.class);
        // 获取扫描到的所有class
        System.out.println(packageClasses.getClassSet());
    }
```


### 具体在Spring中应用场景参考：
先在启动类上加自定义注解扫描的包路径：
```java
@InvokerInterfaceScan(basePackages = "com")
```
找到包下所有被`@InvokerInterface`注解标记的类，然后执行对应的代码逻辑
```java

import cn.hutool.core.util.StrUtil;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.support.BeanDefinitionBuilder;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.context.annotation.ImportBeanDefinitionRegistrar;
import org.springframework.core.type.AnnotationMetadata;
import org.springframework.lang.NonNull;
import org.springframework.util.ClassUtils;
import org.springframework.util.CollectionUtils;


import java.lang.reflect.Proxy;
import java.util.*;

/**
 * 〈一句话功能简述〉<br>
 * 〈〉
 *
 * @author 丁乾文
 * @date 2019/8/13
 * @since 1.0.0
 */
@Slf4j
public class InvokerProxyRegistrar implements ImportBeanDefinitionRegistrar {


    @SneakyThrows
    @Override
    public void registerBeanDefinitions(@NonNull AnnotationMetadata importingClassMetadata,
                                        @NonNull BeanDefinitionRegistry registry) {
        Set<String> basePackages = this.getBasePackages(importingClassMetadata);
        if (CollectionUtils.isEmpty(basePackages)) {
            return;
        }
        LoadPackageClasses loadPackageClasses = new LoadPackageClasses(basePackages, InvokerInterface.class);
        Set<Class<?>> classSet = loadPackageClasses.getClassSet();
        // 注册一个代理类到spring容器中
        for (Class<?> aClass : classSet) {
            // 生成一个代理类
            InvokerProxy invokerProxy = new InvokerProxy(aClass);
            Object proxyInstance = Proxy.newProxyInstance(aClass.getClassLoader(), new Class[]{aClass}, invokerProxy);
            BeanDefinitionBuilder builder = BeanDefinitionBuilder.genericBeanDefinition(proxyInstance.getClass());
            builder.addConstructorArgValue(invokerProxy);
            BeanDefinition beanDefinition = builder.getBeanDefinition();
            String beanName = StrUtil.lowerFirst(aClass.getSimpleName());
            registry.registerBeanDefinition(beanName, beanDefinition);
        }
    }


    protected Set<String> getBasePackages(AnnotationMetadata importingClassMetadata) {
        Map<String, Object> attributes = importingClassMetadata.getAnnotationAttributes(InvokerInterfaceScan.class.getCanonicalName());
        if (CollectionUtils.isEmpty(attributes)) {
            return Collections.emptySet();
        }
        Set<String> basePackages = new HashSet<>();
        for (String pkg : (String[]) attributes.get("basePackages")) {
            if (StrUtil.isNotBlank(pkg)) {
                basePackages.add(pkg);
            }
        }
        if (basePackages.isEmpty()) {
            basePackages.add(ClassUtils.getPackageName(importingClassMetadata.getClassName()));
        }
        return basePackages;
    }

}


```



<Comment></Comment>
