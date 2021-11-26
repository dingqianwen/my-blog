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
        sidebar: {
            '/quickstart/': [
                {
                    text: '快速入门',
                    children: ['/quickstart/README.md'],
                },
            ],
            '/directory/': [
                {
                    text: '目录结构',
                    children: ['/directory/README.md'],
                },
            ],
            '/java/': [
                {
                    text: 'Java',
                    children: ['/java/README.md', '/java/架构师成长之路.md'],
                },
            ],
        }
    },
};

