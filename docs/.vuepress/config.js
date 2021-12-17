// https://v2.vuepress.vuejs.org
const {path} = require('@vuepress/utils')
module.exports = {
    title: "My-Docs",
    base: "/blog/",
    // /blog/  nginx配置为
    // location /blog {
    // alias  html/blog/;
    // index index.html;
    // }
    description: '这是dingqw的文档🐮👃!',
    head: [
        ['meta', {name: 'theme-color', content: '#3eaf7c'}],

        ['link', {
            rel: 'icon',
            href: "logo.png"
        }],

        // 添加百度统计
        [
            "script",
            {},
            `var _hmt = _hmt || [];
              (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?2c62ea544d9e4e77ddc92a4b634a785f";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
              })();`
        ]
    ],

    dest: './docs/.vuepress/blog',
    evergreen: true,
    themeConfig: {
        logo: 'logo.png',  //网页顶端导航栏左上角的图标
        navbar: [
            {text: '首页', link: '/'},
            {
                text: '后端',
                children: [
                    {
                        text: 'Java',
                        link: '/backend/java/',
                    },
                    {
                        text: 'Python',
                        link: '/backend/python/',
                    },
                    {
                        text: 'HBase',
                        link: '/backend/hbase/',
                    },
                    {
                        text: 'Redis',
                        link: '/backend/redis/',
                    },
                ],
            },
            {
                text: '前端',
                children: [
                    {
                        text: 'Vue',
                        link: '/front/vue/',
                    },
                    {
                        text: 'JavaScript',
                        link: '/front/js/',
                    },
                ],
            },
            {
                text: '我的外链',
                children: [
                    {
                        text: 'Gitee',
                        link: 'https://gitee.com/qwding',
                    },
                    {
                        text: 'Github',
                        link: 'https://github.com/dingqianwen',
                    },
                ],
            },
            {
                text: '友情链接',
                children: [
                    {
                        text: '无敌牛牛',
                        link: 'https://niucloud.net.cn ',
                    },
                    {
                        text: '万能搜索',
                        link: 'https://www.baidu.com ',
                    },
                ],
            }
        ],
        sidebar: [
            // SidebarItem  https://v2.vuepress.vuejs.org/zh/reference/default-theme/config.html#sidebar
            {
                text: '后端',
                children: [
                    {
                        text: 'Java',
                        link: '/backend/java/',
                        children: [
                            '/backend/java/java输入一个字符串,要求将该字符串中出现的英文字母,按照顺序 进行输出,区分大小写，且大写优先.md',
                            '/backend/java/架构师成长之路.md',
                            '/backend/java/仓库不支持amd64体系结构，跳过配置文件..的获取.md',
                            '/backend/java/发现了以元素process开头的无效内容.md',
                        ],
                    },
                    {
                        text: 'Python',
                        link: '/backend/python/',
                        children: [
                            '/backend/python/',
                        ],
                    },
                    {
                        text: 'HBase',
                        link: '/backend/hbase/',
                        children: [
                            '/backend/hbase/CentOS安装HBase.md',
                        ],
                    },
                    {
                        text: 'Redis',
                        link: '/backend/redis/',
                        children: [
                            '/backend/redis/CentOS安装Redis.md',
                        ],
                    },
                ],
            },
            {
                text: '前端',
                children: [
                    {
                        text: 'Vue',
                        link: '/front/vue/',
                        children: [
                            '/front/vue/README.md',
                        ],
                    },
                    {
                        text: 'JavaScript',
                        link: '/front/js/',
                        children: [
                            '/front/js/对象数组深克隆.md',
                            '/front/js/日期格式刚刚1分钟前等格式化.md',
                            '/front/js/设置JSON对象默认值.md',
                            '/front/js/格式化日期.md',
                        ],
                    },
                ],
            },
            {
                text: '个人日记',
                children: [
                    '/diary/README.md',
                ],
            },
            {
                text: '消息',
                children: [
                    '/message/MessageBoard.md',
                ],
            },
        ],
    },
    plugins: [
        [
            '@vuepress/plugin-search',
            {}
        ],
        [
            '@vuepress/register-components',
            {
                componentsDir: path.resolve(__dirname, './components'),
            },
        ]
    ],
};
