# 阿里OSS连接池无连接可用问题


## 问题

现状是调用`ossClient.getObject()`时线程阻塞，且无法释放，经过代码排查后，
发现阿里OSS默认从连接管理器检索可用连接的超时时间为-1（不限制），则一直等待，最终需要服务重启。


## 解决过程

本地模拟，首先设置最大连接数为3，连接管理器检索可用连接的超时时间改为10秒后则会出现以下情况，多个线程调用第4次`ossClient.getObject()`
10秒后出现以下异常

```text
2023-04-06 19:32:59.953 [Thread-39] WARN [com.aliyun.oss] - [ExecutorService]The wait 10000 timed out: null
2023-04-06 19:32:59.954 [Thread-39] WARN [com.aliyun.oss] - [Client]Unable to execute HTTP request: null
[ErrorCode]: RequestTimeout
[RequestId]: Unknown
Exception in thread "Thread-39" com.aliyun.oss.ClientException: null
[ErrorCode]: RequestTimeout
[RequestId]: Unknown
	at com.aliyun.oss.common.comm.TimeoutServiceClient.sendRequestCore(TimeoutServiceClient.java:94)
	at com.aliyun.oss.common.comm.ServiceClient.sendRequestImpl(ServiceClient.java:149)
	at com.aliyun.oss.common.comm.ServiceClient.sendRequest(ServiceClient.java:85)
	at com.aliyun.oss.internal.OSSOperation.send(OSSOperation.java:134)
	at com.aliyun.oss.internal.OSSOperation.doOperation(OSSOperation.java:192)
	at com.aliyun.oss.internal.OSSOperation.doOperation(OSSOperation.java:153)
	at com.aliyun.oss.internal.OSSObjectOperation.getObject(OSSObjectOperation.java:369)
	at com.aliyun.oss.OSSClient.getObject(OSSClient.java:689)
	at com.aliyun.oss.OSSClient.getObject(OSSClient.java:679)
	..
Caused by: java.util.concurrent.TimeoutException
	at java.util.concurrent.FutureTask.get(FutureTask.java:205)
	at com.aliyun.oss.common.comm.TimeoutServiceClient.sendRequestCore(TimeoutServiceClient.java:72)
	... 10 more
```

通过这次过程分析到，应该是没有连接可用了，为啥没有连接呢，难道用完没有回收吗，通过debug后发现以下内容

<img src="https://oss-xuxin.oss-cn-beijing.aliyuncs.com/blog/img/企业微信截图_16807770951204.png" alt="none" style="width: 70%;height: 70%;border-radius: 6px;">

关键信息如下

> leased = 2   
> available = 0

表示当前可获取的线程池数量为0，被持有的有2两个没有释放

### 原因

通过以上排查流程，最后明显定位到OSS用完后，没有操作`OSSObject.close();`，或者返回的数据没有`InputStream.close();`导致。
最后通过在数据使用完毕后，手动`InputStream.close();`，问题得以解决。

我们遇到的问题是因为有部分业务异常导致没有正常的`close`，如果出现过多次没有`close`的情况，导致最终没有连接卡死情况，最后需要重启服务器。
