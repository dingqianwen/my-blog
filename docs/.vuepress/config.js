// https://v2.vuepress.vuejs.org
// sitemap生成：https://sitemap.zhetao.com
// nohup python -u my-blog-server.py &
//  Node.js v16.15.0

/*
 /blog/  nginx配置为

 location /blog {
     alias  html/blog/;
     index index.html;
 }
 */

const {path} = require('@vuepress/utils')
const {sidebar} = require('./sidebar')
const {navbar} = require('./navbar')
const {defaultTheme} = require('vuepress')
const { searchPlugin } = require('@vuepress/plugin-search')
const {registerComponentsPlugin} = require('@vuepress/plugin-register-components')


module.exports = {
    title: "My-Blog",
    base: "/blog/",
    description: '这是dingqw的博客🐮👃! 我只要一步一步一步的往上爬,我要做“赵高”',
    head: [
        ['meta', {name: 'author', content: 'dingqw(761945125@qq.com)'}],
        ['meta', {name: 'keywords', content: '丁乾文, 个人博客, 丁乾文博客, Java, blog, dingqianwen, dingqw.com, apidocs.cn'}],
        ['meta', {name: 'description', content: '丁乾文的博客，希望能够帮助到你！'}],
        ['meta', {name: 'theme-color', content: '#3eaf7c'}],
        ['link', {
            rel: 'icon',
            href: "logo.png"
        }],
        [
            "script",
            {},
            `
            function isIE() {
                 if(!!window.ActiveXObject || "ActiveXObject" in window){
                    return true;
                 }else{
                    return false;
                 }
            }
            if(isIE()){
                alert('当前浏览器版本过低，页面无法适配，请更新或更换浏览器，点击确定继续访问！');
            }
            `
        ],
        [
            "script",
            {
                "src": "/js/jquery.min.js",
            },
            ``
        ],
        [
            "script",
            {
                "src": "/js/MiniDialog-es5.min.js",
            },
            ``
        ],
        [
            "script",
            {
                "src": "/js/modal_dialog.js",
            },
            ``
        ],
        // 添加百度统计
        [
            "script",
            {},
            `var _hmt = _hmt || [];
              (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?45c1104dac3574e37d19c8f470ec185d";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
              })();`
        ],
        // 谷歌广告
        [
            "script",
            {
                "async": "async",
                "src": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6495628091556233",
                "crossorigin": "anonymous"
            },
            ``
        ]
    ],

    dest: './docs/.vuepress/blog',
    evergreen: true,
    theme: defaultTheme({
        logo: 'logo.png',  // 网页顶端导航栏左上角的图标
        navbar,
        sidebar,
        /*
            设为 0 来禁用所有级别的页面标题。
            设为 1 来包含 <h2> 标题。
            设为 2 来包含 <h2> 和 <h3> 标题。
         */
        sidebarDepth: 0,
        lastUpdatedText: '更新日期',
        contributorsText: '作者',
    }),
    plugins: [
        searchPlugin({
            locales: {
                '/': {
                    placeholder: 'Search',
                },
                '/zh/': {
                    placeholder: '搜索',
                },
            },
            // 允许搜索 Frontmatter 中的 `tags`
            // getExtraFields: (page) => [page.frontmatter.tags, page.content, page.filePath, page.path],
        }),
        registerComponentsPlugin({
            componentsDir: path.resolve(__dirname, './components'),
        })
    ],
};
