---
lang: zh-CN  
title: CSS resize属性
description: 页面的描述  
head:

- [meta, {name: keywords, content: 'CSS resize属性, resize属性, CSS, resize'}]

---

# CSS resize属性

`resize`属性值介绍：

- both：表示横向纵向均可拉动  
- horizontal：表示只有横向可以拉动  
- vertical：表示只有纵向才可以拉动  
- none：禁止拉动  

### 举例

只允许`<textarea>`上下拖拽大小

<textarea class="demo-textarea" placeholder="请输入"></textarea>

相关代码如下：

```html {7}
<textarea class="demo-textarea" placeholder="请输入"></textarea>

<style scoped>
    .demo-textarea{
        overflow: hidden;
        overflow-wrap: break-word; 
        resize: vertical;
        max-height: 300px;
        min-height: 72px;
        width: 300px;
        border-radius: 5px;
        padding: 0.75em;
        outline: none;
        background-color: var(--c-bg);
        color: var(--c-text);
        border: 1px solid var(--c-border);
    }
}
```

<style scoped>

.demo-textarea{
    overflow: hidden;
    overflow-wrap: break-word; 
    resize: vertical;
    max-height: 200px;
    min-height: 72px;
    width: 300px;
    border-radius: 5px;
    padding: 0.75em;
    outline: none;
    background-color: var(--c-bg);
    color: var(--c-text);
    border: 1px solid var(--c-border);
}

</style>

<Comment></Comment>
