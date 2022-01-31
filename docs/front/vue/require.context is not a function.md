---
lang: zh-CN
title: 'require.context is not a function'
description: 页面的描述
---

# require.context is not a function

[[toc]]

### 错误信息
```text
(node:13639) UnhandledPromiseRejectionWarning: TypeError: require.context is not a function
    at read (/Users/dingqianwen/vueProjects/my-blog/docs/.vuepress/sidebar.js:35:25)
    at Object.<anonymous> (/Users/dingqianwen/vueProjects/my-blog/docs/.vuepress/sidebar.js:65:35)
    at Module._compile (internal/modules/cjs/loader.js:1176:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1196:10)
    at Module.load (internal/modules/cjs/loader.js:1040:32)
    at Function.Module._load (internal/modules/cjs/loader.js:929:14)
    at Module.require (internal/modules/cjs/loader.js:1080:19)
    at require (internal/modules/cjs/helpers.js:72:18)
    at Object.<anonymous> (/Users/dingqianwen/vueProjects/my-blog/docs/.vuepress/config.js:3:19)
    at Module._compile (internal/modules/cjs/loader.js:1176:30)

```

### 解决方案：

具体请看：[storybook-issues:2487](https://github.com/storybookjs/storybook/issues/2487)

```javascript
const path = require('path');
const fs = require('fs');

if (typeof require.context === 'undefined') {
    require.context = (base = '.', scanSubDirectories = false, regularExpression = /\.vue$/) => {
        const files = {};

        function readDirectory(directory) {
            fs.readdirSync(directory).forEach((file) => {
                const fullPath = path.resolve(directory, file);

                if (fs.statSync(fullPath).isDirectory()) {
                    if (scanSubDirectories) readDirectory(fullPath);
                    return;
                }

                if (!regularExpression.test(fullPath)) return;

                files[fullPath] = true;
            });
        }

        readDirectory(path.resolve(__dirname, base));

        function Module(file) {
            return require(file);
        }

        Module.keys = () => Object.keys(files);
        return Module;
    };
}
```

### 使用方式
例如：查询某个目录下所有vue的文件
```javascript
console.log(require.context("/", false, /\.vue$/).keys());
```

<Comment></Comment>
