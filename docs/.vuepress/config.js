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
            {text: '指南', link: '/quickstart/'},
            {text: '简介', link: '/bi'},
            {text: 'Gitee', link: 'https://gitee.com/qwding'},
            {text: 'Github', link: 'https://github.com/dingqianwen'},
        ],
        sidebar: [
            // SidebarItem
            {
                text: 'Java',
                //link: '/foo/',
                children: [
                    // SidebarItem
                    // {
                    //     text: 'github',
                    //     link: 'https://github.com',
                    //     children: [],
                    // },
                    // 字符串 - 页面文件路径
                    '/blogs/java/架构师成长之路.md',
                ],
            },
            {
                text: 'Python',
                //link: '/foo/',
                children: [
                    // SidebarItem
                    // {
                    //     text: 'github',
                    //     link: 'https://github.com',
                    //     children: [],
                    // },
                    // 字符串 - 页面文件路径
                    '/blogs/python/README.md',
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

