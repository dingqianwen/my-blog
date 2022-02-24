---
lang: zh-CN  
title: Nginx  
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
    name: './docs/backend/nginx/README.md',
    data() {
        return {
          maps: {"2022":{"02":{"23":[{"title":"nginx: [emerg] the \"ssl\" parameter requires ngx_http_ssl_modul","path":"[emerg]the\"ssl\"parameterRequiresNgx_http_ssl_module.html","createTime":"2022-02-23T11:27:35.786Z"}],"09":[{"title":"nginx: error while loading shared libraries: libssl.so.1","path":"error_libsslso.html","createTime":"2022-02-09T03:53:43.090Z"}]}}}
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
