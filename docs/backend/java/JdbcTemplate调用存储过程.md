---
lang: zh-CN   
title: JdbcTemplate调用存储过程   
description: 页面的描述  
head:

- [meta, {name: keywords, content: 'JdbcTemplate调用存储过程'}]

---

# JdbcTemplate调用存储过程

例如:根据员工编号,查询所在部门名称和职位信息。

```sql
create
or replace procedure getDNameJob(empNoIn in varchar2,dNameOut out varchar2,jobOut out varchar2)
is
begin
select e.job, d.dname
into jobOut,dNameOut
from emp e,
     dept d
where e.empno = empNoIn
  and d.deptno = e.deptno;
end;
```

JdbcTemplate调用代码如下

```java
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;

import javax.annotation.Resource;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.CallableStatementCallback;
import org.springframework.jdbc.core.CallableStatementCreator;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.dqw.po.Dept;
import com.dqw.po.Emp;

/**
 * 员工持久层实现类
 *
 * @author 丁乾文
 * @date 2019年1月6日
 * @version 1.0
 */
@Repository
public class EmpDaoImpl implements EmpDao {

    @Resource
    private JdbcTemplate jdbcTemplate;

    @Override
    public Emp getDNameJob(Integer empNo) {
        return jdbcTemplate.execute(new CallableStatementCreator() {
            @Override
            public CallableStatement createCallableStatement(Connection conn) throws SQLException {
                String sql = "{call getDNameJob(?,?,?)}";
                CallableStatement prepareCall = conn.prepareCall(sql);
                prepareCall.setInt(1, empNo);
                prepareCall.registerOutParameter(2, Types.VARCHAR);
                prepareCall.registerOutParameter(3, Types.VARCHAR);
                return prepareCall;
            }
        }, new CallableStatementCallback<Emp>() {
            @Override
            public Emp doInCallableStatement(CallableStatement call) throws SQLException, DataAccessException {
                call.execute();
                // 定义员工对象
                Emp ep = new Emp();
                ep.setJob(call.getString(3));
                // 部门
                Dept dept = new Dept();
                dept.setDname(call.getString(2));
                ep.setDept(dept);
                return ep;
            }
        });
    }

}
```

<Comment></Comment>
