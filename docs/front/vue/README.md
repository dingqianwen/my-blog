---
lang: zh-CN  
title: Vue  
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
    name: './docs/front/vue/README.md',
    data() {
        return {
          maps: {"2022":{"01":{"26":[{"title":"VuePress增加备案号","path":"VuePress增加备案号.html","createTime":"2022-01-26T10:08:34.806Z"},{"title":"清除缓存","path":"清除缓存.html","createTime":"2022-01-26T10:08:36.578Z"}],"31":[{"title":"VuePress2+暗色主题图片置暗方","path":"VuePress2+暗色主题图片置暗方式.html","createTime":"2022-01-30T17:36:46.717Z"}]},"02":{"22":[{"title":"好用的技巧","path":"好用的技巧.html","createTime":"2022-02-22T06:05:27.419Z"}],"23":[{"title":"require.context is not a functio","path":"require.contextIsNotAfunction.html","createTime":"2022-02-23T11:28:31.708Z"}],"24":[{"title":"fs读取文件,并且替换文件中指定的字符串","path":"fs读取文件,并且替换文件中指定的字符串.html","createTime":"2022-02-24T04:57:00.293Z"}],"08":[{"title":"Vuepress去除Safari浏览器点击h标签时触发的蓝框效果","path":"Vuepress去除Safari浏览器点击h标签时触发的蓝框效果.html","createTime":"2022-02-08T04:08:27.427Z"}]}}}
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
