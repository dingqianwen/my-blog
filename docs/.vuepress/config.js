// https://v2.vuepress.vuejs.org
const {path} = require('@vuepress/utils')
const {sidebar} = require('./sidebar')
const {navbar} = require('./navbar')
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
        navbar,
        sidebar
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
