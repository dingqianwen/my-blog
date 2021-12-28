module.exports = {
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
                    link: 'https://niucloud.net.cn',
                },
                {
                    text: '万能搜索',
                    link: 'https://www.baidu.com',
                },
                {
                    text: '苞米豆',
                    link: 'https://baomidou.com/',
                },
            ],
        }
    ],
}
