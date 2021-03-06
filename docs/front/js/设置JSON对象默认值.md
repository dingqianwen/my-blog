---
lang: zh-CN  
title: 设置JSON对象默认值  
description: 页面的描述  
head:

- [meta, {name: keywords, content: 'JS设置JSON对象默认值'}]

---

# 设置JSON对象默认值

例如

```javascript
var obj = {age: 18, name: '张三'};
console.log(setDefaultValue(obj, null));
```

输出

```json
{"age":null,"name":null}
```

代码实现如下

```javascript

/**
 * 设置默认值
 *
 * @param obj
 * @param defaultValue 不传默认值undefined
 * @returns {*[]|*}
 */
export function setDefaultValue(obj, defaultValue) {
    const newObj = obj ? obj.constructor === Array ? [] : {} : defaultValue;
    // constructor 属性返回对创建此对象的数组函数的引用。创建相同类型的空数据
    if (typeof obj !== 'object') {
        return;
    } else {
        for (const i in obj) {
            // 判断对象的这条属性是否为对象
            if (typeof obj[i] === 'object') {
                // 若是对象进行嵌套调用
                newObj[i] = setDefaultValue(obj[i]);
            } else {
                newObj[i] = defaultValue;
            }
        }
    }
    return newObj;
}

```

<Comment></Comment>
