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
   "2022": {
      "11": {
         "04": [
            {
               "title": "关于作者",
               "path": "/AboutMe.md",
               "createTime": "2022-11-04T11:28:43.223Z"
            },
            {
               "title": "Centos8 yum 阿里源配置的问题",
               "path": "/backend/centos/Centos8Yum阿里源配置的问题.md",
               "createTime": "2022-11-04T11:28:43.227Z"
            },
            {
               "title": "杀死指定名字的所有进程",
               "path": "/backend/centos/杀死指定名字的所有进程.md",
               "createTime": "2022-11-04T11:28:43.228Z"
            },
            {
               "title": "查看端口号占用情况",
               "path": "/backend/centos/查看端口号占用情况.md",
               "createTime": "2022-11-04T11:28:43.228Z"
            },
            {
               "title": "查看进程详细信息",
               "path": "/backend/centos/查看进程详细信息.md",
               "createTime": "2022-11-04T11:28:43.229Z"
            },
            {
               "title": "CentOS安装HBase",
               "path": "/backend/hbase/CentOS安装HBase.md",
               "createTime": "2022-11-04T11:28:43.230Z"
            },
            {
               "title": "@Pattern注解正则表达式校验逗号分隔字符",
               "path": "/backend/java/@Pattern注解正则表达式校验逗号分隔字符.md",
               "createTime": "2022-11-04T11:28:43.231Z"
            },
            {
               "title": "AopContext.currentProxy() Cannot find current proxy",
               "path": "/backend/java/AopContextCurrentProxyCannotFindCurrentProxy.md",
               "createTime": "2022-11-04T11:28:43.232Z"
            },
            {
               "title": "CompletableFuture常见用法",
               "path": "/backend/java/CompletableFuture常见用法.md",
               "createTime": "2022-11-04T11:28:43.232Z"
            },
            {
               "title": "线程工具CountDownLatch",
               "path": "/backend/java/CountDownLatch.md",
               "createTime": "2022-11-04T11:28:43.233Z"
            },
            {
               "title": "fasterxml日期反序列化",
               "path": "/backend/java/fasterxml日期反序列化.md",
               "createTime": "2022-11-04T11:28:43.243Z"
            },
            {
               "title": "Feign @SpringQueryMap注解",
               "path": "/backend/java/Feign@SpringQueryMap注解.md",
               "createTime": "2022-11-04T11:28:43.234Z"
            },
            {
               "title": "Illegal group reference: group index is missing",
               "path": "/backend/java/GroupIndexIsMissing.md",
               "createTime": "2022-11-04T11:28:43.234Z"
            },
            {
               "title": "ReadValue IllegalArgumentException: argument \"content\" is null",
               "path": "/backend/java/JacksonArgumentContentIsNull.md",
               "createTime": "2022-11-04T11:28:43.235Z"
            },
            {
               "title": "java输入一个字符串,要求将该字符串中出现的英文字母,按照顺序 进行输出,区分大小写，且大写优先?",
               "path": "/backend/java/java输入一个字符串,要求将该字符串中出现的英文字母,按照顺序进行输出,区分大小写,且大写优先.md",
               "createTime": "2022-11-04T11:28:43.243Z"
            },
            {
               "title": "JdbcTemplate调用存储过程",
               "path": "/backend/java/JdbcTemplate调用存储过程.md",
               "createTime": "2022-11-04T11:28:43.236Z"
            },
            {
               "title": "Maximum upload size exceeded",
               "path": "/backend/java/MaximumUploadSizeExceeded.md",
               "createTime": "2022-11-04T11:28:43.236Z"
            },
            {
               "title": "MyBatis Plus Parameter 'uuid' not found. Available parameters are [ew, param1]",
               "path": "/backend/java/MyBatisBindingExceptionParameterXXXNotFound.md",
               "createTime": "2022-11-04T11:28:43.237Z"
            },
            {
               "title": "Spring项目中获取当前Request对象工具",
               "path": "/backend/java/RequestContextUtils.md",
               "createTime": "2022-11-04T11:28:43.238Z"
            },
            {
               "title": "Seata快速上手Demo",
               "path": "/backend/java/Seata快速上手Demo.md",
               "createTime": "2022-11-04T11:28:43.239Z"
            },
            {
               "title": "SpringCloud@HystrixCommand进行熔断降级",
               "path": "/backend/java/SpringCloud@HystrixCommand.md",
               "createTime": "2022-11-04T11:28:43.239Z"
            },
            {
               "title": "Spring单元测试事物不提交问题",
               "path": "/backend/java/Spring单元测试事物不提交问题.md",
               "createTime": "2022-11-04T11:28:43.240Z"
            },
            {
               "title": "Spring扫描某个包下带有指定自定义注解的类",
               "path": "/backend/java/Spring扫描某个包下带有指定自定义注解的类.md",
               "createTime": "2022-11-04T11:28:43.241Z"
            },
            {
               "title": "SQLSyntaxErrorException: Table seata-demo.undo_log doesnt exist",
               "path": "/backend/java/TableUndo_logDoesntExist.md",
               "createTime": "2022-11-04T11:28:43.242Z"
            },
            {
               "title": "表单校验工具，手动校验类中注解",
               "path": "/backend/java/ValidationUtils.md",
               "createTime": "2022-11-04T11:28:43.242Z"
            },
            {
               "title": "使用JProfiler排查内存溢出问题",
               "path": "/backend/java/使用JProfiler排查内存溢出问题.md",
               "createTime": "2022-11-04T11:28:43.244Z"
            },
            {
               "title": "几行代码带你解读MyBatis框架的Mapper代理模式",
               "path": "/backend/java/几行代码带你解读MyBatis框架的Mapper代理模式.md",
               "createTime": "2022-11-04T11:28:43.245Z"
            },
            {
               "title": "发现了以元素process开头的无效内容",
               "path": "/backend/java/发现了以元素process开头的无效内容.md",
               "createTime": "2022-11-04T11:28:43.245Z"
            },
            {
               "title": "${***}字符串表达式替换工具",
               "path": "/backend/java/字符串表达式替换工具.md",
               "createTime": "2022-11-04T11:28:43.246Z"
            },
            {
               "title": "Java架构师成长之路-代码优化方案",
               "path": "/backend/java/架构师成长之路.md",
               "createTime": "2022-11-04T11:28:43.247Z"
            },
            {
               "title": "根据集合中指定的对象属性去重复",
               "path": "/backend/java/根据集合对象中指定的属性去重复.md",
               "createTime": "2022-11-04T11:28:43.248Z"
            },
            {
               "title": "用Java检查SQL语法是否有误",
               "path": "/backend/java/用Java检查SQL语法是否有误.md",
               "createTime": "2022-11-04T11:28:43.249Z"
            },
            {
               "title": "解决FeignClient被FallBack后无错误日志打印问题",
               "path": "/backend/java/解决FeignClient被FallBack后无错误日志打印问题.md",
               "createTime": "2022-11-04T11:28:43.250Z"
            },
            {
               "title": "记录一次生产OutOfMemoryError",
               "path": "/backend/java/记录一次生产OutOfMemoryError.md",
               "createTime": "2022-11-04T11:28:43.250Z"
            },
            {
               "title": "通过JdbcTemplate批量更新",
               "path": "/backend/java/通过JdbcTemplate批量更新.md",
               "createTime": "2022-11-04T11:28:43.251Z"
            },
            {
               "title": "集合拆分批量数据处理",
               "path": "/backend/java/集合拆分批量数据处理.md",
               "createTime": "2022-11-04T11:28:43.252Z"
            },
            {
               "title": "记录MAC简易安装Kuboard过程",
               "path": "/backend/kuboard/记录MAC安装Kuboard过程.md",
               "createTime": "2022-11-04T11:28:43.253Z"
            },
            {
               "title": "MySQL排序规则引起的索引失效问题",
               "path": "/backend/mysql/MySQL排序规则引起的索引失效问题.md",
               "createTime": "2022-11-04T11:28:43.254Z"
            },
            {
               "title": "MySQL获取前一天的日期",
               "path": "/backend/mysql/MySQL获取前一天的日期.md",
               "createTime": "2022-11-04T11:28:43.255Z"
            },
            {
               "title": "多条数据只更新最新的一条",
               "path": "/backend/mysql/多条数据只更新最新的一条.md",
               "createTime": "2022-11-04T11:28:43.257Z"
            },
            {
               "title": "nginx: error while loading shared libraries: libssl.so.10",
               "path": "/backend/nginx/error_libsslso.md",
               "createTime": "2022-11-04T11:28:43.262Z"
            },
            {
               "title": "net::ERR_CONTENT_LENGTH_MISMATCH 200 (OK)",
               "path": "/backend/nginx/ERR_CONTENT_LENGTH_MISMATCH200.md",
               "createTime": "2022-11-04T11:28:43.257Z"
            },
            {
               "title": "Nginx开启Gzip压缩",
               "path": "/backend/nginx/Nginx开启Gzip压缩.md",
               "createTime": "2022-11-04T11:28:43.258Z"
            },
            {
               "title": "Nginx限制指定的接口地址访问",
               "path": "/backend/nginx/Nginx限制指定的接口地址访问.md",
               "createTime": "2022-11-04T11:28:43.259Z"
            },
            {
               "title": "nginx: [emerg] the \"ssl\" parameter requires ngx_http_ssl_module",
               "path": "/backend/nginx/Ngx_http_ssl_module.md",
               "createTime": "2022-11-04T11:28:43.260Z"
            },
            {
               "title": "Request Entity Too Large",
               "path": "/backend/nginx/RequestEntityTooLarge.md",
               "createTime": "2022-11-04T11:28:43.261Z"
            },
            {
               "title": "CentOS安装Python",
               "path": "/backend/python/CentOS安装Python.md",
               "createTime": "2022-11-04T11:28:43.263Z"
            },
            {
               "title": "Flask上传下载文件",
               "path": "/backend/python/Flask上传下载文件.md",
               "createTime": "2022-11-04T11:28:43.263Z"
            },
            {
               "title": "Flask接口限流",
               "path": "/backend/python/Flask接口限流.md",
               "createTime": "2022-11-04T11:28:43.271Z"
            },
            {
               "title": "Flask跨域访问",
               "path": "/backend/python/Flask跨域访问.md",
               "createTime": "2022-11-04T11:28:43.272Z"
            },
            {
               "title": "关闭端口号下所有进程工具",
               "path": "/backend/python/kill_port.md",
               "createTime": "2022-11-04T11:28:43.276Z"
            },
            {
               "title": "nohup后台启动Python脚本print不打印日志问题",
               "path": "/backend/python/nohup后台启动Python脚本print不打印日志.md",
               "createTime": "2022-11-04T11:28:43.276Z"
            },
            {
               "title": "ModuleNotFoundError: No module named flask",
               "path": "/backend/python/NoModuleNamedFlask.md",
               "createTime": "2022-11-04T11:28:43.273Z"
            },
            {
               "title": "Python实现RSA加解密",
               "path": "/backend/python/Python实现RSA加解密.md",
               "createTime": "2022-11-04T11:28:43.273Z"
            },
            {
               "title": "Python简单操作Redis",
               "path": "/backend/python/Python简单操作Redis.md",
               "createTime": "2022-11-04T11:28:43.274Z"
            },
            {
               "title": "N: 鉴于仓库 ‘..‘不支持 ‘amd64‘ 体系结构，跳过配置文件 ‘..‘ 的获取。",
               "path": "/backend/raspberrypi/仓库不支持amd64体系结构，跳过配置文件..的获取.md",
               "createTime": "2022-11-04T11:28:43.278Z"
            },
            {
               "title": "使用LED矩阵玩贪吃蛇小游戏",
               "path": "/backend/raspberrypi/使用LED矩阵玩贪吃蛇小游戏.md",
               "createTime": "2022-11-04T11:28:43.279Z"
            },
            {
               "title": "启用树莓派的SPI接口",
               "path": "/backend/raspberrypi/启用树莓派的SPI接口.md",
               "createTime": "2022-11-04T11:28:43.281Z"
            },
            {
               "title": "打开树莓派的IIC功能",
               "path": "/backend/raspberrypi/打开树莓派的IIC功能.md",
               "createTime": "2022-11-04T11:28:43.281Z"
            },
            {
               "title": "树莓派通过16路PCA9685模块驱动舵机",
               "path": "/backend/raspberrypi/树莓派通过16路PCA9685模块驱动舵机.md",
               "createTime": "2022-11-04T11:28:43.282Z"
            },
            {
               "title": "树莓派通过MCP3008芯片驱动控制摇杆",
               "path": "/backend/raspberrypi/树莓派通过MCP3008芯片驱动控制摇杆.md",
               "createTime": "2022-11-04T11:28:43.283Z"
            },
            {
               "title": "通过MAX7219模块驱动矩阵屏",
               "path": "/backend/raspberrypi/通过MAX7219模块驱动矩阵屏.md",
               "createTime": "2022-11-04T11:28:43.284Z"
            },
            {
               "title": "CentOS安装Redis",
               "path": "/backend/redis/CentOS安装Redis.md",
               "createTime": "2022-11-04T11:28:43.285Z"
            },
            {
               "title": "CSS resize属性",
               "path": "/front/css/resize属性.md",
               "createTime": "2022-11-04T11:28:43.290Z"
            },
            {
               "title": "var()函数",
               "path": "/front/css/var()函数.md",
               "createTime": "2022-11-04T11:28:43.290Z"
            },
            {
               "title": "好看的加载动画CSS样式",
               "path": "/front/css/好看的加载动画CSS样式.md",
               "createTime": "2022-11-04T11:28:43.291Z"
            },
            {
               "title": "Must use import to load ES Module lodash-es",
               "path": "/front/js/MustUseImportToLoadESModuleLodash-es.md",
               "createTime": "2022-11-04T11:28:43.292Z"
            },
            {
               "title": "修改Gitalk代理地址，解决无法登录问题",
               "path": "/front/js/修改Gitalk代理地址解决无法登录问题.md",
               "createTime": "2022-11-04T11:28:43.294Z"
            },
            {
               "title": "对象数组深克隆",
               "path": "/front/js/对象数组深克隆.md",
               "createTime": "2022-11-04T11:28:43.295Z"
            },
            {
               "title": "当多个异步方法执行完毕后再执行某个事件",
               "path": "/front/js/当多个异步方法执行完毕后再执行某个事件.md",
               "createTime": "2022-11-04T11:28:43.295Z"
            },
            {
               "title": "日期格式化显示为刚刚、1分钟前等",
               "path": "/front/js/日期格式化显示为刚刚1分钟前等.md",
               "createTime": "2022-11-04T11:28:43.296Z"
            },
            {
               "title": "格式化日期",
               "path": "/front/js/格式化日期.md",
               "createTime": "2022-11-04T11:28:43.297Z"
            },
            {
               "title": "正则表达式取文本中间内容",
               "path": "/front/js/正则表达式取文本中间内容.md",
               "createTime": "2022-11-04T11:28:43.298Z"
            },
            {
               "title": "获取系统主题颜色是否为深色模式",
               "path": "/front/js/获取系统主题颜色是否为暗黑模式.md",
               "createTime": "2022-11-04T11:28:43.298Z"
            },
            {
               "title": "设置JSON对象默认值",
               "path": "/front/js/设置JSON对象默认值.md",
               "createTime": "2022-11-04T11:28:43.299Z"
            },
            {
               "title": "CentOS安装NodeJS",
               "path": "/front/nodejs/CentOS安装NodeJS.md",
               "createTime": "2022-11-04T11:28:43.300Z"
            },
            {
               "title": "fs读取文件,并且替换文件中指定的字符串",
               "path": "/front/nodejs/fs读取文件,并且替换文件中指定的字符串.md",
               "createTime": "2022-11-04T11:28:43.302Z"
            },
            {
               "title": "Package subpath ./templates/dev.html is not defined by \"exports\"",
               "path": "/front/nodejs/PackageSubpathTemplatesDevHtmlIsNotDefinedByExports.md",
               "createTime": "2022-11-04T11:28:43.300Z"
            },
            {
               "title": "UnhandledPromiseRejectionWarning: ReferenceError: queueMicrotask is not defined",
               "path": "/front/nodejs/queueMicrotaskIsNotDefined.md",
               "createTime": "2022-11-04T11:28:43.303Z"
            },
            {
               "title": "require.context is not a function",
               "path": "/front/nodejs/requireContextIsNotAfunction.md",
               "createTime": "2022-11-04T11:28:43.303Z"
            },
            {
               "title": "清除缓存",
               "path": "/front/nodejs/清除缓存.md",
               "createTime": "2022-11-04T11:28:43.304Z"
            },
            {
               "title": "VuePress2+暗色主题图片置暗方式",
               "path": "/front/vue/VuePress2+暗色主题图片置暗方式.md",
               "createTime": "2022-11-04T11:28:43.306Z"
            },
            {
               "title": "Vuepress去除Safari浏览器点击h标签时触发的蓝框效果",
               "path": "/front/vue/Vuepress去除Safari浏览器点击h标签时触发的蓝框效果.md",
               "createTime": "2022-11-04T11:28:43.307Z"
            },
            {
               "title": "VuePress增加备案号",
               "path": "/front/vue/VuePress增加备案号.md",
               "createTime": "2022-11-04T11:28:43.306Z"
            },
            {
               "title": "好用的技巧",
               "path": "/front/vue/好用的技巧.md",
               "createTime": "2022-11-04T11:28:43.308Z"
            },
            {
               "title": "留言板",
               "path": "/message/MessageBoard.md",
               "createTime": "2022-11-04T11:28:43.309Z"
            },
            {
               "title": "Butter-Fly",
               "path": "/music/Butter-Fly.md",
               "createTime": "2022-11-04T11:28:43.310Z"
            },
            {
               "title": "他不爱我",
               "path": "/music/他不爱我.md",
               "createTime": "2022-11-04T11:28:43.312Z"
            },
            {
               "title": "嘉宾",
               "path": "/music/嘉宾.md",
               "createTime": "2022-11-04T11:28:43.313Z"
            },
            {
               "title": "天马座幻想",
               "path": "/music/天马座幻想.md",
               "createTime": "2022-11-04T11:28:43.313Z"
            },
            {
               "title": "彩虹",
               "path": "/music/彩虹.md",
               "createTime": "2022-11-04T11:28:43.314Z"
            },
            {
               "title": "我们做不了任何事",
               "path": "/music/我们做不了任何事.md",
               "createTime": "2022-11-04T11:28:43.315Z"
            },
            {
               "title": "我对于你你对于我",
               "path": "/music/我对于你你对于我.md",
               "createTime": "2022-11-04T11:28:43.316Z"
            },
            {
               "title": "渐渐被你吸引",
               "path": "/music/渐渐被你吸引.md",
               "createTime": "2022-11-04T11:28:43.316Z"
            },
            {
               "title": "时间线",
               "path": "/Timeline.md",
               "createTime": "2022-11-04T11:28:43.224Z"
            },
            {
               "title": "AES在线加解密",
               "path": "/tools/AES.md",
               "createTime": "2022-11-04T11:28:43.319Z"
            },
            {
               "title": "JSON格式化",
               "path": "/tools/JsonFormat.md",
               "createTime": "2022-11-04T11:28:43.319Z"
            },
            {
               "title": "生成随机数",
               "path": "/tools/Random.md",
               "createTime": "2022-11-04T11:28:43.321Z"
            },
            {
               "title": "RSA在线加解密",
               "path": "/tools/RSA.md",
               "createTime": "2022-11-04T11:28:43.320Z"
            },
            {
               "title": "跨平台复制",
               "path": "/tools/Transfer.md",
               "createTime": "2022-11-04T11:28:43.321Z"
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
