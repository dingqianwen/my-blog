---
lang: zh-CN   
title: 'Package subpath ./templates/dev.html is not defined by "exports"'    
description: 页面的描述  
head:

- [meta, {name: keywords, content: 'Package subpath ./templates/dev.html is not defined by exports'}]

---

# Package subpath './templates/dev.html' is not defined by "exports"

### 执行 npm run dev 报错

报错信息如下

```text
Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: Package subpath './templates/dev.html' is not defined by "exports" in /Users/***/vueProjects/***/node_modules/@vuepress/cli/node_modules/@vuepress/client/package.json
    at applyExports (internal/modules/cjs/loader.js:491:9)
    at resolveExports (internal/modules/cjs/loader.js:507:23)
    at Function.Module._findPath (internal/modules/cjs/loader.js:635:31)
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:1007:27)
    at Function.resolve (internal/modules/cjs/helpers.js:78:19)
```

### 解决方案

> 当前NodeJS版本：`v14.1.0`  
> 升级版本到：`v16.15.0`

[NodeJS安装方法](CentOS安装NodeJS.md)
