---
lang: zh-CN  
title: Vuepress去除Safari浏览器点击h标签时触发的蓝框效果  
description: 页面的描述
---

# Vuepress去除Safari浏览器点击h标签时触发的蓝框效果

在路径`.vuepress/styles`下建立`index.scss`文件，内容如下

```scss
h1, h2, h3, h4, h5, h6 {
  outline-style: none;
}
```

<Comment></Comment>
