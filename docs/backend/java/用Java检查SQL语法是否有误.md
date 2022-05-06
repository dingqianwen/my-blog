---
lang: zh-CN  
title: '用Java检查SQL语法是否有误'  
description: 页面的描述
---

# 用Java检查SQL语法是否有误

被检查SQL文件如下：

```text
select * from user;
select * fom order;
```

实现代码如下

```java
public class Test {

    public static void validatedSql(String sql, String dbType) {
        if (StrUtil.isBlank(sql)) {
            throw new ValidationException("SQL Cannot be empty");
        }
        SQLStatementParser parser = SQLParserUtils.createSQLStatementParser(sql, dbType);
        parser.parseStatementList();
    }

    public static void main(String[] args) {
        List<String> lines = FileUtil.readLines("test.txt", "utf-8");
        for (String sql : lines) {
            try {
                validatedSql(sql, "mysql");
                System.out.println("SQL正确:" + sql);
            } catch (Exception e) {
                System.out.println("SQL语法错误：" + e.getMessage());
                e.printStackTrace();
            }
        }
    }
}
```

输出

```text
SQL正确:select * from user;
[select * fom order;]SQL语法错误：syntax error, error in :' fom order;', expect IDENTIFIER, actual IDENTIFIER pos 12, line 1, column 13, token IDENTIFIER null
com.alibaba.druid.sql.parser.ParserException: syntax error, error in :' fom order;', expect IDENTIFIER, actual IDENTIFIER pos 12, line 1, column 13, token IDENTIFIER null
	at com.alibaba.druid.sql.parser.SQLParser.printError(SQLParser.java:344)
	at com.alibaba.druid.sql.parser.SQLStatementParser.parseStatementList(SQLStatementParser.java:532)
	at com.alibaba.druid.sql.parser.SQLStatementParser.parseStatementList(SQLStatementParser.java:171)
```

<Comment></Comment>
