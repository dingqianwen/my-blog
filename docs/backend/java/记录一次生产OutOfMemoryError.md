---
lang: zh-CN  
title: 记录一次生产OutOfMemoryError  
description: 页面的描述
---

# 记录一次生产OutOfMemoryError

## 事情产生原因

由于是一次较大的项目上线投产，晚上投产完成验证环节，等到了凌晨1点时，突然我这边服务不断重启，先从Grafana分析服务实例，发现内存快速飙升，然后直接宕机，唯一的可能性就是内存溢出导致。然后为了保证服务暂时可用，不影响交易，先扩展实例，扩展JVM内存配置。

然后去Elk查询日志发现以下信息：

```shell
org.springframework.web.util.NestedServletException: Handler dispatch failed; nested exception is java.lang.OutOfMemoryError: Java heap space
	at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1075)
	at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:962)
	at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1006)
	at org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:909)
	at javax.servlet.http.HttpServlet.service(HttpServlet.java:652)
	at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:883)
	at javax.servlet.http.HttpServlet.service(HttpServlet.java:733)
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:227)
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:162)
	at org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:53)
Caused by: java.lang.OutOfMemoryError: Java heap space
	at com.mysql.cj.jdbc.result.ResultSetImpl.getString(ResultSetImpl.java:868)
	at com.zaxxer.hikari.pool.HikariProxyResultSet.getString(HikariProxyResultSet.java)
	at org.apache.shardingsphere.sharding.execute.sql.execute.result.StreamQueryResult.getValue(StreamQueryResult.java:70)
	at org.apache.shardingsphere.underlying.merge.result.impl.stream.StreamMergedResult.getValue(StreamMergedResult.java:47)
	at org.apache.shardingsphere.shardingjdbc.jdbc.core.resultset.ShardingResultSet.getString(ShardingResultSet.java:161)
	at org.apache.ibatis.type.StringTypeHandler.getNullableResult(StringTypeHandler.java:37)
	at org.apache.ibatis.type.StringTypeHandler.getNullableResult(StringTypeHandler.java:26)
	at org.apache.ibatis.type.BaseTypeHandler.getResult(BaseTypeHandler.java:85)
	at org.apache.ibatis.executor.resultset.DefaultResultSetHandler.getPropertyMappingValue(DefaultResultSetHandler.java:511)
	at org.apache.ibatis.executor.resultset.DefaultResultSetHandler.applyPropertyMappings(DefaultResultSetHandler.java:480)
```

## 原因

经过分析日志，非常大概率是因为接口请求参数漏传，接口此参数没有非空判断，导致SQL执行时无带参数，条件缺失，查询到很多的数据。分析后然后拿到日志TID，去查询整个接口调用链路，确实是由于接口漏传参数导致。

<Comment></Comment>
