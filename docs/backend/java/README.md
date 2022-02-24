---
lang: zh-CN    
title: Java  
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
    name: './docs/backend/java/README.md',
    data() {
        return {
          maps: {"2021":{"12":{"24":[{"title":"Java架构师成长之路-代码优化方案","path":"架构师成长之路.html","createTime":"2021-12-24T05:22:54.469Z"}],"06":[{"title":"N: 鉴于仓库 ‘..‘不支持 ‘amd64‘ 体系结构，跳过配置文件 ‘..‘ 的获取","path":"仓库不支持amd64体系结构，跳过配置文件..的获取.html","createTime":"2021-12-06T07:48:03.614Z"},{"title":"发现了以元素process开头的无效内","path":"发现了以元素process开头的无效内容.html","createTime":"2021-12-06T07:50:32.618Z"}]}},"2022":{"02":{"16":[{"title":"@Pattern注解正则表达式校验逗号分隔字","path":"@Pattern注解正则表达式校验逗号分隔字符.html","createTime":"2022-02-16T09:26:11.352Z"}],"22":[{"title":"Spring单元测试事物不提交问题","path":"Spring单元测试事物不提交问题.html","createTime":"2022-02-22T12:35:01.764Z"},{"title":"通过JdbcTemplate批量更新","path":"通过JdbcTemplate批量更新.html","createTime":"2022-02-22T12:46:47.855Z"}],"23":[{"title":"Feign @SpringQueryMap注解","path":"Feign@SpringQueryMap注解.html","createTime":"2022-02-23T10:59:00.026Z"}],"24":[{"title":"java输入一个字符串,要求将该字符串中出现的英文字母,按照顺序 进行输出,区分大小写，且大写优先?","path":"java输入一个字符串,要求将该字符串中出现的英文字母,按照顺序进行输出,区分大小写,且大写优先.html","createTime":"2022-02-24T12:07:38.480Z"}],"07":[{"title":"Spring扫描某个包下带有指定自定义注解的类","path":"Spring扫描某个包下带有指定自定义注解的类.html","createTime":"2022-02-07T09:00:43.446Z"}]}}}
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
