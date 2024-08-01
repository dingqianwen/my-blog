---
lang: zh-CN  
title: 时间线  
description: 页面的描述  
head:

- [meta, {name: keywords, content: '丁乾文的博客, 时间线'}]

---

# 时间线

<div class="archives-body">
    <div class="archives-box overflow-initial" v-if="Object.keys(maps).length!==0">
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
    <div v-else>
         <br>
            <blockquote><p>暂无内容</p></blockquote>
         <br>
    </div>
</div>

<script>
    export default {
    name: 'Timeline',
    data() {
        return {
          /*timeline.data.start*/
 maps: {
   "2021": {
      "11": {
         "30": [
            {
               "title": "N: 鉴于仓库 ‘..‘不支持 ‘amd64‘ 体系结构，跳过配置文件 ‘..‘ 的获取。",
               "path": "/backend/raspberrypi/仓库不支持amd64体系结构，跳过配置文件..的获取.md",
               "createTime": "2021-11-30T03:28:11.000Z"
            }
         ]
      },
      "12": {
         "14": [
            {
               "title": "CentOS安装Redis",
               "path": "/backend/redis/CentOS安装Redis.md",
               "createTime": "2021-12-14T10:44:03.000Z"
            }
         ],
         "22": [
            {
               "title": "VuePress增加备案号",
               "path": "/front/vue/VuePress增加备案号.md",
               "createTime": "2021-12-22T11:00:28.000Z"
            }
         ],
         "24": [
            {
               "title": "清除缓存",
               "path": "/front/nodejs/清除缓存.md",
               "createTime": "2021-12-24T02:19:02.000Z"
            }
         ],
         "07": [
            {
               "title": "CentOS安装HBase",
               "path": "/backend/hbase/CentOS安装HBase.md",
               "createTime": "2021-12-07T12:22:30.000Z"
            }
         ],
         "06": [
            {
               "title": "java输入一个字符串,要求将该字符串中出现的英文字母,按照顺序 进行输出,区分大小写，且大写优先?",
               "path": "/backend/java/java输入一个字符串,要求将该字符串中出现的英文字母,按照顺序进行输出,区分大小写,且大写优先.md",
               "createTime": "2021-12-06T07:31:20.000Z"
            }
         ],
         "01": [
            {
               "title": "发现了以元素process开头的无效内容",
               "path": "/backend/java/发现了以元素process开头的无效内容.md",
               "createTime": "2021-12-01T03:15:26.000Z"
            },
            {
               "title": "留言板",
               "path": "/message/MessageBoard.md",
               "createTime": "2021-12-01T08:29:21.000Z"
            }
         ],
         "03": [
            {
               "title": "对象数组深克隆",
               "path": "/front/js/对象数组深克隆.md",
               "createTime": "2021-12-03T07:51:14.000Z"
            },
            {
               "title": "日期格式化显示为刚刚、1分钟前等",
               "path": "/front/js/日期格式化显示为刚刚1分钟前等.md",
               "createTime": "2021-12-03T07:57:41.000Z"
            },
            {
               "title": "格式化日期",
               "path": "/front/js/格式化日期.md",
               "createTime": "2021-12-03T08:15:11.000Z"
            },
            {
               "title": "设置JSON对象默认值",
               "path": "/front/js/设置JSON对象默认值.md",
               "createTime": "2021-12-03T08:13:27.000Z"
            }
         ]
      }
   },
   "2022": {
      "11": {
         "14": [
            {
               "title": "AES在线加解密",
               "path": "/tools/AES.md",
               "createTime": "2022-11-14T02:35:59.000Z"
            },
            {
               "title": "主机监控",
               "path": "/tools/System.md",
               "createTime": "2022-11-14T02:35:59.000Z"
            },
            {
               "title": "跨平台复制",
               "path": "/tools/Transfer.md",
               "createTime": "2022-11-14T02:35:59.000Z"
            }
         ],
         "21": [
            {
               "title": "获取请求头",
               "path": "/backend/php/PHP获取请求头.md",
               "createTime": "2022-11-21T14:41:06.000Z"
            },
            {
               "title": "自定义打印日志",
               "path": "/backend/php/自定义打印日志.md",
               "createTime": "2022-11-21T14:38:20.000Z"
            }
         ],
         "24": [
            {
               "title": "PHP获取请求的JSON数据",
               "path": "/backend/php/PHP获取请求的JSON数据.md",
               "createTime": "2022-11-24T09:06:16.000Z"
            }
         ],
         "25": [
            {
               "title": "FeignClient请求超时时间设置",
               "path": "/backend/java/FeignClient请求超时时间设置.md",
               "createTime": "2022-11-25T08:10:49.000Z"
            }
         ],
         "04": [
            {
               "title": "net::ERR_CONTENT_LENGTH_MISMATCH 200 (OK)",
               "path": "/backend/nginx/ERR_CONTENT_LENGTH_MISMATCH200.md",
               "createTime": "2022-11-04T09:22:49.000Z"
            },
            {
               "title": "Request Entity Too Large",
               "path": "/backend/nginx/RequestEntityTooLarge.md",
               "createTime": "2022-11-04T09:30:20.000Z"
            },
            {
               "title": "Flask上传下载文件",
               "path": "/backend/python/Flask上传下载文件.md",
               "createTime": "2022-11-04T09:43:02.000Z"
            },
            {
               "title": "生成随机数",
               "path": "/tools/Random.md",
               "createTime": "2022-11-04T03:59:59.000Z"
            }
         ],
         "07": [
            {
               "title": "Package subpath ./templates/dev.html is not defined by \"exports\"",
               "path": "/front/nodejs/PackageSubpathTemplatesDevHtmlIsNotDefinedByExports.md",
               "createTime": "2022-11-07T01:04:11.000Z"
            }
         ]
      },
      "04": {
         "26": [
            {
               "title": "${***}字符串表达式替换工具",
               "path": "/backend/java/字符串表达式替换工具.md",
               "createTime": "2022-04-26T13:35:59.000Z"
            },
            {
               "title": "他不爱我",
               "path": "/music/他不爱我.md",
               "createTime": "2022-04-26T09:07:13.000Z"
            }
         ],
         "27": [
            {
               "title": "Illegal group reference: group index is missing",
               "path": "/backend/java/GroupIndexIsMissing.md",
               "createTime": "2022-04-27T02:09:08.000Z"
            },
            {
               "title": "记录MAC简易安装Kuboard过程",
               "path": "/backend/kuboard/记录MAC安装Kuboard过程.md",
               "createTime": "2022-04-27T05:27:06.000Z"
            }
         ],
         "28": [
            {
               "title": "Spring项目中获取当前Request对象工具",
               "path": "/backend/java/RequestContextUtils.md",
               "createTime": "2022-04-28T09:03:59.000Z"
            },
            {
               "title": "根据集合中指定的对象属性去重复",
               "path": "/backend/java/根据集合对象中指定的属性去重复.md",
               "createTime": "2022-04-28T09:18:09.000Z"
            },
            {
               "title": "集合拆分批量数据处理",
               "path": "/backend/java/集合拆分批量数据处理.md",
               "createTime": "2022-04-28T09:25:50.000Z"
            }
         ],
         "29": [
            {
               "title": "JdbcTemplate调用存储过程",
               "path": "/backend/java/JdbcTemplate调用存储过程.md",
               "createTime": "2022-04-29T06:44:51.000Z"
            },
            {
               "title": "CentOS安装Python",
               "path": "/backend/python/CentOS安装Python.md",
               "createTime": "2022-04-29T07:36:03.000Z"
            },
            {
               "title": "Flask接口限流",
               "path": "/backend/python/Flask接口限流.md",
               "createTime": "2022-04-29T13:38:28.000Z"
            },
            {
               "title": "Flask跨域访问",
               "path": "/backend/python/Flask跨域访问.md",
               "createTime": "2022-04-29T08:44:39.000Z"
            },
            {
               "title": "ModuleNotFoundError: No module named flask",
               "path": "/backend/python/NoModuleNamedFlask.md",
               "createTime": "2022-04-29T07:48:12.000Z"
            },
            {
               "title": "Python简单操作Redis",
               "path": "/backend/python/Python简单操作Redis.md",
               "createTime": "2022-04-29T07:18:40.000Z"
            }
         ],
         "30": [
            {
               "title": "nohup后台启动Python脚本print不打印日志问题",
               "path": "/backend/python/nohup后台启动Python脚本print不打印日志.md",
               "createTime": "2022-04-30T11:25:46.000Z"
            }
         ],
         "08": [
            {
               "title": "关于作者",
               "path": "/AboutMe.md",
               "createTime": "2022-04-08T07:30:06.000Z"
            }
         ],
         "07": [
            {
               "title": "几行代码带你解读MyBatis框架的Mapper代理模式",
               "path": "/backend/java/几行代码带你解读MyBatis框架的Mapper代理模式.md",
               "createTime": "2022-04-07T13:10:45.000Z"
            },
            {
               "title": "获取系统主题颜色是否为深色模式",
               "path": "/front/js/获取系统主题颜色是否为暗黑模式.md",
               "createTime": "2022-04-07T02:51:45.000Z"
            }
         ]
      },
      "02": {
         "21": [
            {
               "title": "Butter-Fly",
               "path": "/music/Butter-Fly.md",
               "createTime": "2022-02-21T12:43:14.000Z"
            },
            {
               "title": "天马座幻想",
               "path": "/music/天马座幻想.md",
               "createTime": "2022-02-21T12:43:14.000Z"
            },
            {
               "title": "渐渐被你吸引",
               "path": "/music/渐渐被你吸引.md",
               "createTime": "2022-02-21T12:43:14.000Z"
            }
         ],
         "22": [
            {
               "title": "Spring单元测试事物不提交问题",
               "path": "/backend/java/Spring单元测试事物不提交问题.md",
               "createTime": "2022-02-22T12:30:09.000Z"
            },
            {
               "title": "通过JdbcTemplate批量更新",
               "path": "/backend/java/通过JdbcTemplate批量更新.md",
               "createTime": "2022-02-22T12:34:26.000Z"
            }
         ],
         "23": [
            {
               "title": "MySQL排序规则引起的索引失效问题",
               "path": "/backend/mysql/MySQL排序规则引起的索引失效问题.md",
               "createTime": "2022-02-23T08:11:17.000Z"
            },
            {
               "title": "fs读取文件,并且替换文件中指定的字符串",
               "path": "/front/nodejs/fs读取文件,并且替换文件中指定的字符串.md",
               "createTime": "2022-02-23T11:23:38.000Z"
            }
         ],
         "24": [
            {
               "title": "正则表达式取文本中间内容",
               "path": "/front/js/正则表达式取文本中间内容.md",
               "createTime": "2022-02-24T12:08:40.000Z"
            }
         ],
         "26": [
            {
               "title": "查看端口号占用情况",
               "path": "/backend/centos/查看端口号占用情况.md",
               "createTime": "2022-02-25T18:03:08.000Z"
            },
            {
               "title": "查看进程详细信息",
               "path": "/backend/centos/查看进程详细信息.md",
               "createTime": "2022-02-25T18:06:47.000Z"
            },
            {
               "title": "CentOS安装NodeJS",
               "path": "/front/nodejs/CentOS安装NodeJS.md",
               "createTime": "2022-02-25T17:48:20.000Z"
            },
            {
               "title": "UnhandledPromiseRejectionWarning: ReferenceError: queueMicrotask is not defined",
               "path": "/front/nodejs/queueMicrotaskIsNotDefined.md",
               "createTime": "2022-02-25T17:43:59.000Z"
            }
         ],
         "09": [
            {
               "title": "CentOS8 yum 阿里源配置的问题",
               "path": "/backend/centos/CentOS8Yum阿里源配置的问题.md",
               "createTime": "2022-02-09T03:18:37.000Z"
            },
            {
               "title": "杀死指定名字的所有进程",
               "path": "/backend/centos/杀死指定名字的所有进程.md",
               "createTime": "2022-02-09T04:12:00.000Z"
            },
            {
               "title": "nginx: error while loading shared libraries: libssl.so.10",
               "path": "/backend/nginx/error_libsslso.md",
               "createTime": "2022-02-09T03:26:38.000Z"
            }
         ],
         "07": [
            {
               "title": "Spring扫描某个包下带有指定自定义注解的类",
               "path": "/backend/java/Spring扫描某个包下带有指定自定义注解的类.md",
               "createTime": "2022-02-07T05:43:56.000Z"
            }
         ],
         "08": [
            {
               "title": "Vuepress去除Safari浏览器点击h标签时触发的蓝框效果",
               "path": "/front/vue/Vuepress去除Safari浏览器点击h标签时触发的蓝框效果.md",
               "createTime": "2022-02-08T04:04:46.000Z"
            }
         ]
      },
      "06": {
         "01": [
            {
               "title": "安装Flink环境",
               "path": "/backend/flink/安装Flink环境.md",
               "createTime": "2022-06-01T03:19:39.000Z"
            },
            {
               "title": "ReadValue IllegalArgumentException: argument \"content\" is null",
               "path": "/backend/java/JacksonArgumentContentIsNull.md",
               "createTime": "2022-06-01T10:41:21.000Z"
            }
         ],
         "02": [
            {
               "title": "Python实现RSA加解密",
               "path": "/backend/python/Python实现RSA加解密.md",
               "createTime": "2022-06-02T09:50:15.000Z"
            },
            {
               "title": "JSON格式化",
               "path": "/tools/JsonFormat.md",
               "createTime": "2022-06-02T12:35:01.000Z"
            }
         ]
      },
      "01": {
         "20": [
            {
               "title": "Feign @SpringQueryMap注解",
               "path": "/backend/java/Feign@SpringQueryMap注解.md",
               "createTime": "2022-01-20T09:02:40.000Z"
            }
         ],
         "26": [
            {
               "title": "Must use import to load ES Module lodash-es",
               "path": "/front/js/MustUseImportToLoadESModuleLodash-es.md",
               "createTime": "2022-01-26T09:57:56.000Z"
            }
         ],
         "28": [
            {
               "title": "@Pattern注解正则表达式校验逗号分隔字符",
               "path": "/backend/java/@Pattern注解正则表达式校验逗号分隔字符.md",
               "createTime": "2022-01-28T10:48:10.000Z"
            },
            {
               "title": "好用的技巧",
               "path": "/front/vue/好用的技巧.md",
               "createTime": "2022-01-28T10:29:00.000Z"
            }
         ],
         "29": [
            {
               "title": "我们做不了任何事",
               "path": "/music/我们做不了任何事.md",
               "createTime": "2022-01-29T07:02:57.000Z"
            },
            {
               "title": "我对于你你对于我",
               "path": "/music/我对于你你对于我.md",
               "createTime": "2022-01-29T07:08:27.000Z"
            }
         ],
         "31": [
            {
               "title": "require.context is not a function",
               "path": "/front/nodejs/requireContextIsNotAfunction.md",
               "createTime": "2022-01-30T18:50:21.000Z"
            },
            {
               "title": "VuePress2+暗色主题图片置暗方式",
               "path": "/front/vue/VuePress2+暗色主题图片置暗方式.md",
               "createTime": "2022-01-30T17:35:00.000Z"
            }
         ]
      },
      "03": {
         "11": [
            {
               "title": "MyBatis Plus Parameter 'uuid' not found. Available parameters are [ew, param1]",
               "path": "/backend/java/MyBatisBindingExceptionParameterXXXNotFound.md",
               "createTime": "2022-03-11T10:32:54.000Z"
            }
         ],
         "15": [
            {
               "title": "AopContext.currentProxy() Cannot find current proxy",
               "path": "/backend/java/AopContextCurrentProxyCannotFindCurrentProxy.md",
               "createTime": "2022-03-15T07:19:14.000Z"
            }
         ],
         "04": [
            {
               "title": "CompletableFuture常见用法",
               "path": "/backend/java/CompletableFuture常见用法.md",
               "createTime": "2022-03-04T06:27:29.000Z"
            }
         ]
      },
      "07": {
         "19": [
            {
               "title": "fasterxml日期反序列化",
               "path": "/backend/java/fasterxml日期反序列化.md",
               "createTime": "2022-07-19T08:55:30.000Z"
            }
         ],
         "01": [
            {
               "title": "线程工具CountDownLatch",
               "path": "/backend/java/CountDownLatch.md",
               "createTime": "2022-07-01T07:27:39.000Z"
            }
         ],
         "06": [
            {
               "title": "解决FeignClient被FallBack后无错误日志打印问题",
               "path": "/backend/java/解决FeignClient被FallBack后无错误日志打印问题.md",
               "createTime": "2022-07-06T07:09:09.000Z"
            }
         ],
         "08": [
            {
               "title": "MySQL获取前一天的日期",
               "path": "/backend/mysql/MySQL获取前一天的日期.md",
               "createTime": "2022-07-08T06:05:58.000Z"
            }
         ],
         "03": [
            {
               "title": "PHP实现RSA加解密",
               "path": "/backend/php/PHP实现RSA加解密.md",
               "createTime": "2022-07-03T11:12:12.000Z"
            },
            {
               "title": "RSA在线加解密",
               "path": "/tools/RSA.md",
               "createTime": "2022-07-03T12:23:30.000Z"
            }
         ]
      },
      "05": {
         "20": [
            {
               "title": "记录一次生产OutOfMemoryError",
               "path": "/backend/java/记录一次生产OutOfMemoryError.md",
               "createTime": "2022-05-20T10:17:59.000Z"
            },
            {
               "title": "彩虹",
               "path": "/music/彩虹.md",
               "createTime": "2022-05-20T11:58:52.000Z"
            }
         ],
         "21": [
            {
               "title": "Maximum upload size exceeded",
               "path": "/backend/java/MaximumUploadSizeExceeded.md",
               "createTime": "2022-05-21T14:55:15.000Z"
            },
            {
               "title": "var()函数",
               "path": "/front/css/var()函数.md",
               "createTime": "2022-05-21T15:19:12.000Z"
            }
         ],
         "22": [
            {
               "title": "Nginx开启Gzip压缩",
               "path": "/backend/nginx/Nginx开启Gzip压缩.md",
               "createTime": "2022-05-22T05:46:32.000Z"
            },
            {
               "title": "好看的加载动画CSS样式",
               "path": "/front/css/好看的加载动画CSS样式.md",
               "createTime": "2022-05-21T17:48:08.000Z"
            }
         ],
         "24": [
            {
               "title": "修改Gitalk代理地址，解决无法登录问题",
               "path": "/front/js/修改Gitalk代理地址解决无法登录问题.md",
               "createTime": "2022-05-24T08:17:56.000Z"
            }
         ],
         "25": [
            {
               "title": "使用LED矩阵玩贪吃蛇小游戏",
               "path": "/backend/raspberrypi/使用LED矩阵玩贪吃蛇小游戏.md",
               "createTime": "2022-05-25T13:37:39.000Z"
            },
            {
               "title": "启用树莓派的SPI接口",
               "path": "/backend/raspberrypi/启用树莓派的SPI接口.md",
               "createTime": "2022-05-25T09:32:33.000Z"
            },
            {
               "title": "打开树莓派的IIC功能",
               "path": "/backend/raspberrypi/打开树莓派的IIC功能.md",
               "createTime": "2022-05-25T10:53:41.000Z"
            },
            {
               "title": "树莓派通过16路PCA9685模块驱动舵机",
               "path": "/backend/raspberrypi/树莓派通过16路PCA9685模块驱动舵机.md",
               "createTime": "2022-05-25T09:44:29.000Z"
            },
            {
               "title": "树莓派通过MCP3008芯片驱动控制摇杆",
               "path": "/backend/raspberrypi/树莓派通过MCP3008芯片驱动控制摇杆.md",
               "createTime": "2022-05-25T06:18:44.000Z"
            }
         ],
         "28": [
            {
               "title": "通过MAX7219模块驱动矩阵屏",
               "path": "/backend/raspberrypi/通过MAX7219模块驱动矩阵屏.md",
               "createTime": "2022-05-28T12:10:55.000Z"
            }
         ],
         "29": [
            {
               "title": "CSS resize属性",
               "path": "/front/css/resize属性.md",
               "createTime": "2022-05-29T10:45:13.000Z"
            }
         ],
         "31": [
            {
               "title": "SpringCloud@HystrixCommand进行熔断降级",
               "path": "/backend/java/SpringCloud@HystrixCommand.md",
               "createTime": "2022-05-31T07:03:11.000Z"
            },
            {
               "title": "使用JProfiler排查内存溢出问题",
               "path": "/backend/java/使用JProfiler排查内存溢出问题.md",
               "createTime": "2022-05-31T09:52:07.000Z"
            }
         ],
         "01": [
            {
               "title": "Seata快速上手Demo",
               "path": "/backend/java/Seata快速上手Demo.md",
               "createTime": "2022-04-30T17:33:34.000Z"
            },
            {
               "title": "SQLSyntaxErrorException: Table seata-demo.undo_log doesnt exist",
               "path": "/backend/java/TableUndo_logDoesntExist.md",
               "createTime": "2022-04-30T19:18:58.000Z"
            },
            {
               "title": "Nginx限制指定的接口地址访问",
               "path": "/backend/nginx/Nginx限制指定的接口地址访问.md",
               "createTime": "2022-04-30T16:41:02.000Z"
            }
         ],
         "07": [
            {
               "title": "表单校验工具，手动校验类中注解",
               "path": "/backend/java/ValidationUtils.md",
               "createTime": "2022-05-07T09:15:05.000Z"
            },
            {
               "title": "多条数据只更新最新的一条",
               "path": "/backend/mysql/多条数据只更新最新的一条.md",
               "createTime": "2022-05-07T09:51:11.000Z"
            },
            {
               "title": "嘉宾",
               "path": "/music/嘉宾.md",
               "createTime": "2022-05-07T14:12:29.000Z"
            }
         ],
         "02": [
            {
               "title": "Java架构师成长之路-代码优化方案",
               "path": "/backend/java/架构师成长之路.md",
               "createTime": "2022-05-02T06:41:30.000Z"
            }
         ],
         "06": [
            {
               "title": "用Java检查SQL语法是否有误",
               "path": "/backend/java/用Java检查SQL语法是否有误.md",
               "createTime": "2022-05-06T09:53:37.000Z"
            }
         ],
         "05": [
            {
               "title": "关闭端口号下所有进程工具",
               "path": "/backend/python/kill_port.md",
               "createTime": "2022-05-05T15:02:48.000Z"
            }
         ]
      },
      "09": {
         "30": [
            {
               "title": "nginx: [emerg] the \"ssl\" parameter requires ngx_http_ssl_module",
               "path": "/backend/nginx/Ngx_http_ssl_module.md",
               "createTime": "2022-09-30T05:43:36.000Z"
            }
         ],
         "07": [
            {
               "title": "当多个异步方法执行完毕后再执行某个事件",
               "path": "/front/js/当多个异步方法执行完毕后再执行某个事件.md",
               "createTime": "2022-09-07T10:06:01.000Z"
            }
         ]
      }
   },
   "2023": {
      "11": {
         "11": [
            {
               "title": "解析二维码",
               "path": "/tools/ReadQrCode.md",
               "createTime": "2023-11-11T06:47:12.000Z"
            }
         ],
         "25": [
            {
               "title": "51单片机-开关控制LED",
               "path": "/backend/c/51单片机-开关控制LED.md",
               "createTime": "2023-11-25T09:57:09.000Z"
            },
            {
               "title": "Clion-51单片机环境搭建-MAC",
               "path": "/backend/c/Clion-51单片机环境搭建-MAC.md",
               "createTime": "2023-11-25T08:47:10.000Z"
            }
         ],
         "30": [
            {
               "title": "C语言控制台实现贪吃蛇",
               "path": "/backend/c/C语言控制台实现贪吃蛇.md",
               "createTime": "2023-11-30T08:09:39.000Z"
            },
            {
               "title": "MicroPython-umqtt.simple-阿里物联网平台",
               "path": "/backend/python/MicroPython-umqtt.simple.md",
               "createTime": "2023-11-30T05:43:46.000Z"
            }
         ]
      },
      "12": {
         "11": [
            {
               "title": "树莓派PicoW串口连接Air724UG-AT-4G模块",
               "path": "/backend/raspberrypi/PicoW-Air724UG-AT.md",
               "createTime": "2023-12-11T01:09:00.000Z"
            },
            {
               "title": "树莓派PicoW串口连接Air724UG-DTU-4G模块",
               "path": "/backend/raspberrypi/PicoW-Air724UG-DTU.md",
               "createTime": "2023-12-11T01:09:00.000Z"
            }
         ]
      },
      "07": {
         "14": [
            {
               "title": "Flink-MySQL-CDC同步表数据",
               "path": "/backend/flink/Flink-MySQL-CDC同步数据.md",
               "createTime": "2023-07-14T08:16:33.000Z"
            }
         ],
         "21": [
            {
               "title": "Flink StartupOptions",
               "path": "/backend/flink/Flink-StartupOptions.md",
               "createTime": "2023-07-21T11:36:48.000Z"
            },
            {
               "title": "Flink启用检查点-断点续传",
               "path": "/backend/flink/Flink启用检查点-断点续传.md",
               "createTime": "2023-07-21T11:49:13.000Z"
            },
            {
               "title": "Flink窗口函数",
               "path": "/backend/flink/Flink窗口函数.md",
               "createTime": "2023-07-21T11:51:42.000Z"
            },
            {
               "title": "二维码/条形码",
               "path": "/tools/BarCodeAndQrCode.md",
               "createTime": "2023-07-21T01:16:43.000Z"
            }
         ]
      },
      "09": {
         "03": [
            {
               "title": "实时交易规则",
               "path": "/backend/flink/实时交易规则.md",
               "createTime": "2023-09-03T08:05:15.000Z"
            }
         ]
      },
      "04": {
         "06": [
            {
               "title": "两种好用的动态编译加载Java文件工具",
               "path": "/backend/java/两种好用的动态编译加载Java文件工具.md",
               "createTime": "2023-04-06T05:42:32.000Z"
            },
            {
               "title": "阿里OSS连接池无连接可用问题",
               "path": "/backend/java/阿里OSS连接池无连接可用问题.md",
               "createTime": "2023-04-06T10:43:52.000Z"
            }
         ],
         "03": [
            {
               "title": "终端命令执行工具",
               "path": "/backend/java/终端命令执行工具.md",
               "createTime": "2023-04-03T03:36:07.000Z"
            }
         ]
      },
      "06": {
         "22": [
            {
               "title": "Unicode编码和解码",
               "path": "/tools/Unicode.md",
               "createTime": "2023-06-22T00:01:34.000Z"
            }
         ]
      }
   },
   "2024": {
      "03": {
         "10": [
            {
               "title": "时间线",
               "path": "/Timeline.md",
               "createTime": "2024-03-09T17:30:34.732Z"
            }
         ],
         "16": [
            {
               "title": "1410D0B9_noCipherMatch",
               "path": "/backend/nginx/1410D0B9_noCipherMatch.md",
               "createTime": "2024-03-15T16:47:10.005Z"
            },
            {
               "title": "CentOS7快速安装Nginx",
               "path": "/backend/nginx/CentOS7快速安装Nginx.md",
               "createTime": "2024-03-15T16:38:48.855Z"
            }
         ]
      },
      "07": {
         "23": [
            {
               "title": "CentOS快速安装Java",
               "path": "/backend/centos/CentOS快速安装Java.md",
               "createTime": "2024-07-23T15:56:55.243Z"
            }
         ],
         "31": [
            {
               "title": "家庭搭建太阳能发电记录",
               "path": "/diary/家庭搭建太阳能发电记录.md",
               "createTime": "2024-07-30T17:03:29.653Z"
            }
         ]
      },
      "08": {
         "02": [
            {
               "title": "SpringCloud@Stream链路传递",
               "path": "/backend/java/SpringCloud@Stream链路传递.md",
               "createTime": "2024-08-01T17:10:59.275Z"
            },
            {
               "title": "Spring中父子线程传递MDC等上下文工具",
               "path": "/backend/java/Spring中父子线程传递MDC等上下文工具.md",
               "createTime": "2024-08-01T16:55:23.523Z"
            }
         ]
      },
      "05": {
         "13": [
            {
               "title": "个人洗脑",
               "path": "/diary/个人洗脑.md",
               "createTime": "2024-05-12T17:21:29.340Z"
            }
         ],
         "24": [
            {
               "title": "自建服务器-阿里云动态域名绑定",
               "path": "/backend/python/aliyun-ddns.md",
               "createTime": "2024-05-24T11:50:17.300Z"
            }
         ]
      },
      "06": {
         "07": [
            {
               "title": "开机自启动Java程序",
               "path": "/backend/raspberrypi/开机自启动Java程序.md",
               "createTime": "2024-06-06T21:47:29.587Z"
            },
            {
               "title": "树莓派4B更换阿里源",
               "path": "/backend/raspberrypi/树莓派4B更换阿里源.md",
               "createTime": "2024-06-06T22:19:39.489Z"
            }
         ]
      }
   }
} 
/*timeline.data.end*/
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
.archives-box ul li {
    list-style-type: none;
}
.archives-box ul .article-item {
    list-style-type: disc;
}
.archives-box .list-box{
     padding-left: 23px;
}
</style>

<AdsbyGoogle slot="7889564278" layout="in-article"/>

<Comment></Comment>
