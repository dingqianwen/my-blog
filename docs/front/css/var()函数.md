---
lang: zh-CN  
title: var()函数  
description: 页面的描述  
head:

- [meta, {name: keywords, content: 'CSS var() 函数, var(), CSS, var()函数'}]

---

# CSS var() 函数

非常适合一个属性值在多处被使用，首先定义一个名为 `--bg-color` 的属性

```scss
:root {
  --bg-color: red;
}
```

然后使用 var() 函数调用该属性，。

```scss
#div1 {
  background-color: var(--bg-color);
}

#div1 {
  background-color: var(--bg-color);
}
```

### 实现浅色模式与深色模式

我们定义两套CSS样式，然后在`<html>`标签动态增加`class='dark'`来实现浅色模式与深色模式背景与字体的动态切换。

```scss
/*浅色模式*/
:root {
  --bg-color: #ffffff;
}

/*深色模式*/
html.dark {
  --bg-color: #22272e;
}
```

#### 演示如下

模拟背景与字体切换，当点击
<a href="javascript:void(0);" onclick="(function (){
    let element = document.getElementById('div0');
    if(element.className.indexOf('dk') !== -1){
        element.className='';
    }else{
        element.className='dk';
    }
})()">切换</a>
按钮时，`div1`  切换为CSS `.dk` 对应的背景颜色与字体。

<div id="div0">
    <div id="div1">
        <span id="span1">div1</span>
    </div>
</div>

<style>

:root {
  --bg-color1: #39d48e;
  --font-color1: #121315;
}

.dk {
  --bg-color1: #30a26e;
  --font-color1: #d2c3cd;
}

#div1 {
  border-radius: 6px;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  background-color: var(--bg-color1);
}

#span1 {
  color: var(--font-color1);
}
</style>

此次演示代码如下：

```html
<a href="javascript:void(0);" onclick="(function (){
    let element = document.getElementById('div0');
    if(element.className.indexOf('dk') !== -1){
        element.className='';
    }else{
        element.className='dk';
    }
})()">切换</a>

<br>

<div id="div0">
    <div id="div1">
        <span id="span1">div1</span>
    </div>
    <br>
</div>

<style>
    :root {
        --bg-color1: #39d48e;
        --font-color1: #121315;
    }

    .dk {
        --bg-color1: #30a26e;
        --font-color1: #d2c3cd;
    }

    #div1 {
        border-radius: 6px;
        height: 40px;
        line-height: 40px;
        padding-left: 10px;
        background-color: var(--bg-color1);
    }

    #span1 {
        color: var(--font-color1);
    }
</style>
```

<Comment></Comment>
