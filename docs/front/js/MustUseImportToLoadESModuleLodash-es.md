---
lang: zh-CN
title: Must use import to load ES Module lodash-es
description: 页面的描述
---

# Vuepress打包时出现 Error [ERR_REQUIRE_ESM]: Must use import to load ES Module: lodash-es/lodash.js

### 错误信息

```text
✖ Rendering pages - failed
Error [ERR_REQUIRE_ESM]: Must use import to load ES Module: /Users/xxx/vueProjects/my-blog/node_modules/lodash-es/lodash.js
require() of ES modules is not supported.
require() of /Users/xxx/vueProjects/my-blog/node_modules/lodash-es/lodash.js from /Users/xxx/vueProjects/my-blog/docs/.vuepress/blog/.server/app.js is an ES module file as it is a .js file whose nearest parent package.json contains "type": "module" which defines all .js files in that package scope as ES modules.
Instead rename lodash.js to end in .cjs, change the requiring code to use import(), or remove "type": "module" from /Users/xxx/vueProjects/my-blog/node_modules/lodash-es/package.json.

    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1192:13)
    at Module.load (internal/modules/cjs/loader.js:1040:32)
    at Function.Module._load (internal/modules/cjs/loader.js:929:14)
    at Module.require (internal/modules/cjs/loader.js:1080:19)
    at require (internal/modules/cjs/helpers.js:72:18)

```

### 解决方案

删除 `node_modules/lodash-es/package.json` 文件下
```text
"type": "module",
```


<Comment></Comment>
