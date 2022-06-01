---
lang: zh-CN  
title: 'VuePress2+暗色主题图片置暗方式'  
description: 页面的描述  
head:

- [meta, {name: keywords, content: 'VuePress2+暗色主题图片置暗方式, VuePress2, 图片置暗'}]

---

# VuePress2+暗色主题图片置暗方式

在路径`.vuepress/styles`下建立`index.scss`文件，内容如下

```scss
html.dark {
  img {
    -webkit-filter: contrast(70%);
    filter: contrast(70%);
  }
}
```

<Comment></Comment>
