---
lang: zh-CN  
title: VuePress增加备案号  
description: 页面的描述  
head:

- [meta, {name: keywords, content: 'VuePress增加备案号, VuePress2'}]

---

# VuePress增加备案号

首页`---`描述里增加如下代码即可

```text
---
footer: "Apache-2.0 Licensed | Copyright © 2020 
  <br>
  <a href='https://beian.miit.gov.cn' target='_blank' style='color: var(--c-text-lighter);'>待备案号</a>"
footerHtml: true
---
```  

效果展示

```
Apache-2.0 Licensed | Copyright © 2020
               待备案号
```

<Comment></Comment>
