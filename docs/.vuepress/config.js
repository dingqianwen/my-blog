// https://v2.vuepress.vuejs.org
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
            {text: 'Home', link: '/'},
            {text: '后端', link: '/blogs/backend/java'},
            {text: '前端', link: '/blogs/front/'},
            {text: 'Gitee', link: 'https://gitee.com/qwding'},
            {text: 'Github', link: 'https://github.com/dingqianwen'},
        ],
        sidebar: [
            // SidebarItem  https://v2.vuepress.vuejs.org/zh/reference/default-theme/config.html#sidebar
            {
                text: '后端',
                children: [
                    {
                        text: 'Java',
                        children: [
                            '/blogs/backend/java/架构师成长之路.md',
                            '/blogs/backend/java/鉴于仓库不支持 ‘amd64‘ 体系结构，跳过配置文件 ‘..‘ 的获取.md',
                            '/blogs/backend/java/XMLException发现了以元素process开头的无效内容.md',
                        ],
                    },
                    {
                        text: 'Python',
                        children: [
                            '/blogs/backend/python',
                        ],
                    },
                ],
            },
            {
                text: '前端',
                children: [
                    {
                        text: 'Vue',
                        children: [
                            '/blogs/front/vue/README.md',
                        ],
                    },
                ],
            },
            {
                text: '个人日记',
                children: [
                    '/blogs/diary/README.md',
                ],
            },
        ],
    },
    plugins: [
        [
            '@vuepress/plugin-search',
            {
                locales: {
                    '/': {
                        placeholder: 'Search',
                    },
                    '/zh/': {
                        placeholder: '搜索',
                    },
                },
            },
        ],
    ],
};

