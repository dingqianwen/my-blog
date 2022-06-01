---
lang: zh-CN    
title: fs读取文件,并且替换文件中指定的字符串  
description: 页面的描述  
head:

- [meta, {name: keywords, content: 'fs读取文件，并且替换文件中指定的字符串'}]

---

# fs读取文件，并且替换文件中指定的字符串

实现代码如下：

```js
/**
 * 读取文件，并且替换文件中指定的字符串
 */
let replaceFile = function (filePath, sourceRegx, targetStr) {
        fs.readFile(filePath, function (err, data) {
            if (err) {
                return err;
            }
            let str = data.toString();
            str = str.replace(sourceRegx, targetStr);
            fs.writeFile(filePath, str, function (err) {
                if (err) return err;
            });
        });
    }
```

<Comment></Comment>
