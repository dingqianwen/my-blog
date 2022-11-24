---
lang: zh-CN  
title: 获取请求头       
description: 页面的描述  
head:

- [meta, {name: keywords, content: 'PHP获取请求头'}]

---

# 自定义打印日志

PHP获取请求头实现如下    

```php
/**
 * 获取请求header
 *
 * @param $param
 * @return array|mixed
 */
function getRequestHeaders($param = null)
{
    $headers = array();
    foreach ($_SERVER as $name => $value) {
        if (substr($name, 0, 5) == 'HTTP_') {
            $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
        }
    }
    if ($param != null) {
        return $headers[$param];
    }
    return $headers;
}


$sign = getRequestHeaders("X-Sign");
$headers = getRequestHeaders();
```


<Comment></Comment>
