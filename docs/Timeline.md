---
lang: zh-CN
title: 时间线
description: 页面的描述
---

# 时间线

<div class="archives-body">
    <div class="archives-box overflow-initial">
        <div v-for="yk in Object.keys(maps).sort((a, b) => {
                                return b - a;
                           })" :key="yk">
            <h3 class="year pointer">{{yk}}年</h3>
            <ul class="list-box">
                <li v-for="mk in Object.keys(maps[yk]).sort((a, b) => {
                                return b - a;
                           })" :key="mk">
                    <span class="month pointer">{{mk}}月</span>
                    <ul class="list-box" style="display: block;">
                        <li class="month-li" v-for="dk in  Object.keys(maps[yk][mk]).sort((a, b) => {
                                                                    return b - a;
                                                           })" :key="dk">
                            <span class="day">{{dk}}日 <span class="num">{{Object.keys(maps[yk][mk][dk]).length}}篇</span> </span>
                            <ul class="list-box" style="display: block;">
                                <li class="article-item" v-for="lk in Object.keys(maps[yk][mk][dk])" :key="lk" >
                                    <router-link :to="maps[yk][mk][dk][lk].path.replace('.md','.html')">{{maps[yk][mk][dk][lk].title}}</router-link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</div>

<Comment></Comment>

<script>
    export default {
    name: 'Timeline',
    data() {
        return {
          maps: {
   "2021": {
      "12": {
         "14": [
            {
               "title": "CentOS安装Redis",
               "path": "/backend/redis/CentOS安装Redis.md",
               "createTime": "2021-12-14T11:23:53.259Z"
            }
         ],
         "24": [
            {
               "title": "Java架构师成长之路-代码优化方案",
               "path": "/backend/java/架构师成长之路.md",
               "createTime": "2021-12-24T05:22:54.469Z"
            }
         ],
         "06": [
            {
               "title": "N: 鉴于仓库 ‘..‘不支持 ‘amd64‘ 体系结构，跳过配置文件 ‘..‘ 的获取。",
               "path": "/backend/java/仓库不支持amd64体系结构，跳过配置文件..的获取.md",
               "createTime": "2021-12-06T07:48:03.614Z"
            }
         ]
      }
   },
   "2022": {
      "02": {
         "16": [
            {
               "title": "@Pattern注解正则表达式校验逗号分隔字符",
               "path": "/backend/java/@Pattern注解正则表达式校验逗号分隔字符.md",
               "createTime": "2022-02-16T09:26:11.352Z"
            }
         ],
         "22": [
            {
               "title": "Spring单元测试事物不提交问题",
               "path": "/backend/java/Spring单元测试事物不提交问题.md",
               "createTime": "2022-02-22T12:35:01.764Z"
            },
            {
               "title": "通过JdbcTemplate批量更新",
               "path": "/backend/java/通过JdbcTemplate批量更新.md",
               "createTime": "2022-02-22T12:46:47.855Z"
            },
            {
               "title": "好用的技巧",
               "path": "/front/vue/好用的技巧.md",
               "createTime": "2022-02-22T06:05:27.419Z"
            }
         ],
         "23": [
            {
               "title": "Centos8 yum 阿里源配置的问题",
               "path": "/backend/centos/Centos8Yum阿里源配置的问题.md",
               "createTime": "2022-02-23T11:28:11.070Z"
            },
            {
               "title": "杀死指定名字的所有进程",
               "path": "/backend/centos/杀死指定名字的所有进程.md",
               "createTime": "2022-02-23T09:59:16.477Z"
            },
            {
               "title": "Feign @SpringQueryMap注解",
               "path": "/backend/java/Feign@SpringQueryMap注解.md",
               "createTime": "2022-02-23T10:59:00.026Z"
            },
            {
               "title": "nginx: [emerg] the \"ssl\" parameter requires ngx_http_ssl_module",
               "path": "/backend/nginx/[emerg]the\"ssl\"parameterRequiresNgx_http_ssl_module.md",
               "createTime": "2022-02-23T11:27:35.786Z"
            },
            {
               "title": "Must use import to load ES Module lodash-es",
               "path": "/front/js/MustUseImportToLoadESModuleLodash-es.md",
               "createTime": "2022-02-23T11:31:42.012Z"
            },
            {
               "title": "require.context is not a function",
               "path": "/front/vue/require.contextIsNotAfunction.md",
               "createTime": "2022-02-23T11:28:31.708Z"
            }
         ],
         "24": [
            {
               "title": "java输入一个字符串,要求将该字符串中出现的英文字母,按照顺序 进行输出,区分大小写，且大写优先?",
               "path": "/backend/java/java输入一个字符串,要求将该字符串中出现的英文字母,按照顺序进行输出,区分大小写,且大写优先.md",
               "createTime": "2022-02-24T12:07:38.480Z"
            },
            {
               "title": "fs读取文件,并且替换文件中指定的字符串",
               "path": "/front/vue/fs读取文件,并且替换文件中指定的字符串.md",
               "createTime": "2022-02-24T04:57:00.293Z"
            }
         ],
         "25": [
            {
               "title": "发现了以元素process开头的无效内容",
               "path": "/backend/java/发现了以元素process开头的无效内容.md",
               "createTime": "2022-02-25T08:33:32.109Z"
            },
            {
               "title": "正则表达式取文本中间内容",
               "path": "/front/js/正则表达式取文本中间内容.md",
               "createTime": "2022-02-25T05:18:35.792Z"
            }
         ],
         "26": [
            {
               "title": "查看端口号占用情况",
               "path": "/backend/centos/查看端口号占用情况.md",
               "createTime": "2022-02-25T18:07:28.083Z"
            },
            {
               "title": "查看进程详细信息",
               "path": "/backend/centos/查看进程详细信息.md",
               "createTime": "2022-02-25T18:07:28.088Z"
            },
            {
               "title": "UnhandledPromiseRejectionWarning: ReferenceError: queueMicrotask is not defined",
               "path": "/front/nodejs/queueMicrotaskIsNotDefined.md",
               "createTime": "2022-02-25T17:49:45.826Z"
            }
         ],
         "27": [
            {
               "title": "CentOS安装NodeJS",
               "path": "/front/nodejs/CentOS安装NodeJS.md",
               "createTime": "2022-02-27T07:38:07.775Z"
            }
         ],
         "07": [
            {
               "title": "Spring扫描某个包下带有指定自定义注解的类",
               "path": "/backend/java/Spring扫描某个包下带有指定自定义注解的类.md",
               "createTime": "2022-02-07T09:00:43.446Z"
            }
         ],
         "09": [
            {
               "title": "nginx: error while loading shared libraries: libssl.so.10",
               "path": "/backend/nginx/error_libsslso.md",
               "createTime": "2022-02-09T03:53:43.090Z"
            }
         ],
         "08": [
            {
               "title": "Vuepress去除Safari浏览器点击h标签时触发的蓝框效果",
               "path": "/front/vue/Vuepress去除Safari浏览器点击h标签时触发的蓝框效果.md",
               "createTime": "2022-02-08T04:08:27.427Z"
            }
         ]
      },
      "01": {
         "26": [
            {
               "title": "对象数组深克隆",
               "path": "/front/js/对象数组深克隆.md",
               "createTime": "2022-01-26T10:08:17.888Z"
            },
            {
               "title": "日期格式刚刚1分钟前等格式化",
               "path": "/front/js/日期格式刚刚1分钟前等格式化.md",
               "createTime": "2022-01-26T10:08:20.124Z"
            },
            {
               "title": "格式化日期",
               "path": "/front/js/格式化日期.md",
               "createTime": "2022-01-26T10:08:21.781Z"
            },
            {
               "title": "设置JSON对象默认值",
               "path": "/front/js/设置JSON对象默认值.md",
               "createTime": "2022-01-26T10:08:24.133Z"
            },
            {
               "title": "VuePress增加备案号",
               "path": "/front/vue/VuePress增加备案号.md",
               "createTime": "2022-01-26T10:08:34.806Z"
            },
            {
               "title": "清除缓存",
               "path": "/front/vue/清除缓存.md",
               "createTime": "2022-01-26T10:08:36.578Z"
            }
         ],
         "31": [
            {
               "title": "CentOS安装HBase",
               "path": "/backend/hbase/CentOS安装HBase.md",
               "createTime": "2022-01-30T17:27:58.314Z"
            },
            {
               "title": "VuePress2+暗色主题图片置暗方式",
               "path": "/front/vue/VuePress2+暗色主题图片置暗方式.md",
               "createTime": "2022-01-30T17:36:46.717Z"
            }
         ]
      },
      "03": {
         "04": [
            {
               "title": "CompletableFuture用法",
               "path": "/backend/java/CompletableFuture用法.md",
               "createTime": "2022-03-04T08:09:40.668Z"
            }
         ],
         "01": [
            {
               "title": "记录一次生产OutOfMemoryError",
               "path": "/backend/java/记录一次生产OutOfMemoryError.md",
               "createTime": "2022-03-01T10:20:42.371Z"
            },
            {
               "title": "MySQL排序规则引起的索引失效问题",
               "path": "/backend/mysql/MySQL排序规则引起的索引失效问题.md",
               "createTime": "2022-03-01T10:21:11.909Z"
            }
         ]
      }
   }
}
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
            