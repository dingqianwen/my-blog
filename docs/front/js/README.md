---
lang: zh-CN  
title: JavaScript  
description: 页面的描述  
type: cds  
---


# 归档目录

<div class="archives-body">
    <div class="archives-box overflow-initial">
        <div v-for="yk in Object.keys(maps)" :key="yk">
            <h3 class="year pointer">{{yk}}年</h3>
            <ul class="list-box">
                <li v-for="mk in Object.keys(maps[yk])" :key="mk">
                    <span class="month pointer">{{mk}}月</span>
                    <ul class="list-box" style="display: block;">
                        <li class="month-li" v-for="dk in Object.keys(maps[yk][mk])" :key="dk">
                            <span class="day">{{dk}}日 <span class="num">{{Object.keys(maps[yk][mk][dk]).length}}篇</span> </span>
                            <ul class="list-box" style="display: block;">
                                <li class="article-item" v-for="lk in Object.keys(maps[yk][mk][dk])" :key="lk" >
                                    <a :href="maps[yk][mk][dk][lk].path" class>{{maps[yk][mk][dk][lk].title}}</a> 
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</div>


<script>
    export default {
    name: './docs/front/js/README.md',
    data() {
        return {
          maps: {"2022":{"02":{"23":[{"title":"Must use import to load ES Module lodash-es","path":"MustUseImportToLoadESModuleLodash-es.html","createTime":"2022-02-23T11:31:42.012Z"}],"25":[{"title":"正则表达式取文本中间内容","path":"正则表达式取文本中间内容.html","createTime":"2022-02-24T17:00:29.158Z"}]},"01":{"26":[{"title":"对象数组深克隆","path":"对象数组深克隆.html","createTime":"2022-01-26T10:08:17.888Z"},{"title":"日期格式刚刚1分钟前等格式化","path":"日期格式刚刚1分钟前等格式化.html","createTime":"2022-01-26T10:08:20.124Z"},{"title":"格式化日期","path":"格式化日期.html","createTime":"2022-01-26T10:08:21.781Z"},{"title":"设置JSON对象默认值","path":"设置JSON对象默认值.html","createTime":"2022-01-26T10:08:24.133Z"}]}}}
        }
      }
    }
</script>
<style scoped>
.archives-box .num {
    font-size: 14px;
    font-weight: 100;
}
.archives-box .month{
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 1.25em;
}
.archives-box .day{
    font-size: 15px;
}
.archives-box ul, ol {
    list-style-type: none;
}
.archives-box .list-box{
     padding-left: 23px;
}
</style>
            
<Comment></Comment>
