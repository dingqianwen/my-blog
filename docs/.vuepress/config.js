// https://v2.vuepress.vuejs.org
const {path} = require('@vuepress/utils')
module.exports = {
    title: "My-Blog",
    base: "/blog/",
    // /blog/  nginx配置为
    // location /blog {
    // alias  html/blog/;
    // index index.html;
    // }
    description: '这是丁乾文的博客🐮👃!',
    head: [
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],

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
                ],
            },
            {
                text: '前端',
                children: [
                    {
                        text: 'Vue',
                        link: '/front/vue/',
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
                link: '/backend/',
                children: [
                    {
                        text: 'Java',
                        link: '/backend/java/',
                        children: [
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
                ],
            },
            {
                text: '前端',
                link: '/front/',
                children: [
                    {
                        text: 'Vue',
                        link: '/front/vue/',
                        children: [
                            '/front/vue/README.md',
                        ],
                    },
                ],
            },
            {
                text: '个人日记',
                link: '/diary/',
                children: [
                    '/diary/README.md',
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
        ],
        [
            '@vuepress/pwa'
        ],
        [
            '@vuepress/plugin-pwa-popup',
            {
                locales: {
                    '/': {
                        message: 'New content is available.',
                        buttonText: 'Refresh',
                    },
                    '/zh/': {
                        message: '发现新内容可用',
                        buttonText: '刷新',
                    },
                },
            },
        ],
    ],
};
