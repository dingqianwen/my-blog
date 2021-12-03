---
lang: zh-CN
title: JS对象数组深克隆
description: 页面的描述
---

# JS对象数组深克隆


```javascript
/**
 * 深拷贝
 *
 * @param source Array/Object  对象/数组
 */
export function deepClone(source) {
    // 判断复制的目标是数组还是对象
    const targetObj = source.constructor === Array ? [] : {};
    // 遍历目标
    for (let keys in source) { 
        if (source.hasOwnProperty(keys)) {
            // 如果值是对象，就递归一下
            if (source[keys] && typeof source[keys] === 'object') { 
                targetObj[keys] = source[keys].constructor === Array ? [] : {};
                targetObj[keys] = deepClone(source[keys]);
            } else { 
                // 如果不是，就直接赋值
                targetObj[keys] = source[keys];
            }
        }
    }
    return targetObj;
}
```

<Comment></Comment>
