---
lang: zh-CN  
title: 通过JdbcTemplate批量更新  
description: 页面的描述  
head:

- [meta, {name: keywords, content: '通过JdbcTemplate批量更新'}]

---

# 通过JdbcTemplate批量更新

一次把SQL发送服务端去执行，减少每次IO时间消耗

例如：

```java
public class Test {

    @Resource
    private JdbcTemplate jdbcTemplate;

    @Test
    public void test() {
        StringBuilder sqls = new StringBuilder();
        sqls.append("update user set name = 'a' where id = 1;");
        sqls.append("update user set name = 'b' where id = 2;");
        sqls.append("update user set name = 'c' where id = 3;");
        // 执行sql
        jdbcTemplate.execute(sqls.toString());
    }

}
```

<Comment></Comment>
