---
lang: zh-CN  
title: 好看的加载动画CSS样式  
description: 页面的描述
---

# 好看的加载动画CSS样式

演示效果如下，具体参考[musicplayer](https://github.com/daodaolee/vuepress-plugin-awesome-musicplayer)

<div class="loading">
    <div class="bars">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
    </div>
</div>

<style scoped>
.loading {
  height: 150px;
  position: relative;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
}

.bars {
    height: 30px;
    left: 50%;
    margin: -30px 0 0 -20px;
    position: absolute;
    top: 60%;
    width: 40px;
}

.bar {
    background: var(--c-brand);
    bottom: 1px;
    height: 3px;
    position: absolute;
    width: 3px;
    animation: sound 0ms -800ms linear infinite alternate;
}

@keyframes sound {
    0% {
        opacity: .35;
        height: 3px;
    }
    100% {
        opacity: 1;
        height: 28px;
    }
}

.bar:nth-child(1) {
    left: 1px;
    animation-duration: 474ms;
}

.bar:nth-child(2) {
    left: 5px;
    animation-duration: 433ms;
}

.bar:nth-child(3) {
    left: 9px;
    animation-duration: 407ms;
}

.bar:nth-child(4) {
    left: 13px;
    animation-duration: 458ms;
}

.bar:nth-child(5) {
    left: 17px;
    animation-duration: 400ms;
}

.bar:nth-child(6) {
    left: 21px;
    animation-duration: 427ms;
}

.bar:nth-child(7) {
    left: 25px;
    animation-duration: 441ms;
}

.bar:nth-child(8) {
    left: 29px;
    animation-duration: 419ms;
}

.bar:nth-child(9) {
    left: 33px;
    animation-duration: 487ms;
}

.bar:nth-child(10) {
    left: 37px;
    animation-duration: 442ms;
}

</style>


实现代码如下

```html
<div class="loading">
    <div class="bars">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
    </div>
</div>

<style scoped>
    .loading {
        height: 150px;
        position: relative;
        margin: 0 auto;
        justify-content: center;
        align-items: center;
    }

    .bars {
        height: 30px;
        left: 50%;
        margin: -30px 0 0 -20px;
        position: absolute;
        top: 60%;
        width: 40px;
    }

    .bar {
        background: var(--c-brand);
        bottom: 1px;
        height: 3px;
        position: absolute;
        width: 3px;
        animation: sound 0ms -800ms linear infinite alternate;
    }

    @keyframes sound {
        0% {
            opacity: .35;
            height: 3px;
        }
        100% {
            opacity: 1;
            height: 28px;
        }
    }

    .bar:nth-child(1) {
        left: 1px;
        animation-duration: 474ms;
    }

    .bar:nth-child(2) {
        left: 5px;
        animation-duration: 433ms;
    }

    .bar:nth-child(3) {
        left: 9px;
        animation-duration: 407ms;
    }

    .bar:nth-child(4) {
        left: 13px;
        animation-duration: 458ms;
    }

    .bar:nth-child(5) {
        left: 17px;
        animation-duration: 400ms;
    }

    .bar:nth-child(6) {
        left: 21px;
        animation-duration: 427ms;
    }

    .bar:nth-child(7) {
        left: 25px;
        animation-duration: 441ms;
    }

    .bar:nth-child(8) {
        left: 29px;
        animation-duration: 419ms;
    }

    .bar:nth-child(9) {
        left: 33px;
        animation-duration: 487ms;
    }

    .bar:nth-child(10) {
        left: 37px;
        animation-duration: 442ms;
    }

</style>

```  

<Comment></Comment>
