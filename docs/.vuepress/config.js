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
        ['link', {
            rel: 'icon',
            href: "logo.png"
        }]
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
                        link: '/blogs/backend/java',
                    },
                    {
                        text: 'Python',
                        link: '/blogs/backend/python',
                    },
                ],
            },
            {
                text: '前端',
                children: [
                    {
                        text: 'Vue',
                        link: '/blogs/front/vue',
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
                link: '/blogs/backend/',
                children: [
                    {
                        text: 'Java',
                        link: '/blogs/backend/java',
                        children: [
                            '/blogs/backend/java/架构师成长之路.md',
                            '/blogs/backend/java/鉴于仓库不支持 ‘amd64‘ 体系结构，跳过配置文件 ‘..‘ 的获取.md',
                            '/blogs/backend/java/XMLException发现了以元素process开头的无效内容.md',
                        ],
                    },
                    {
                        text: 'Python',
                        link: '/blogs/backend/python',
                        children: [
                            '/blogs/backend/python',
                        ],
                    },
                ],
            },
            {
                text: '前端',
                link: '/blogs/front/',
                children: [
                    {
                        text: 'Vue',
                        link: '/blogs/front/vue',
                        children: [
                            '/blogs/front/vue/README.md',
                        ],
                    },
                ],
            },
            {
                text: '个人日记',
                link: '/blogs/diary/',
                children: [
                    '/blogs/diary/README.md',
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
    ],
};

