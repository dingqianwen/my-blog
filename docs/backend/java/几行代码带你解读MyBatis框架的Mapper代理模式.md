---
lang: zh-CN   
title: '几行代码带你解读MyBatis框架的Mapper代理模式'  
description: 页面的描述
---

# 几行代码带你解读MyBatis框架的Mapper代理模式。

在IBatis之后的MyBatis提供了一个全新的开发模式,Mapper代理模式,就是所谓Aop面向切面编程,用的方案为JDK提供的Proxy动态代理,或者是Cglib提供的动态代理。

在我们了解了底层之后,就可以动手写代码了,如下：

```java
public class SqlSession {

    /**
     * 获取代理对象  
     * @param clazz class
     * @return T
     */
    public <T> T getMapper(Class<T> clazz) {
        return (T) Proxy.newProxyInstance(clazz.getClassLoader(), new Class[]{clazz}, (proxy, method, args) -> {
          
            /*
             * 在这里就可以进行相应的业务
             * 然后再调用底层执行器来操作数据库
             */
            System.out.println("调用了:" + method.getName());
            /*
             * 根据类名 方法名称查询对应的MappedStatement 并判断执行selectOne 或 selectList 或 update
             */
            
            return null;
        });
    }

}

```

### 例子

Mapper接口代码

```java
public interface EmpMapper {

    /**
     * findALl
     */
    public List<Emp> findALl();

    /**
     * findEmpById
     */
    public Emp findEmpById(Integer id);
}
```

测试代码

```java
public class AppTest {

    @Test
    public void findALl() {
        SqlSession sqlSession = new SqlSession();
        EmpMapper empMapper = sqlSession.getMapper(EmpMapper.class);
        empMapper.findALl();
    }

    @Test
    public void findEmpById() {
        SqlSession sqlSession = new SqlSession();
        EmpMapper empMapper = sqlSession.getMapper(EmpMapper.class);
        empMapper.findEmpById();
    }

}
```

<Comment></Comment>
