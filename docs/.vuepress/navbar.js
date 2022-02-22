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
                {
                    text: 'Nginx',
                    link: '/backend/nginx/',
                },
                {
                    text: 'CentOS',
                    link: '/backend/centos/',
                },
                {
                    text: 'MySQL',
                    link: '/backend/mysql/',
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
        // {text: '日记本', link: '/diary/'},
        {text: '音乐台', link: '/music/'},
        {text: '留言板', link: '/message/MessageBoard'},
        {
            text: '其他',
            children: [
                {
                    text: '公益捐款',
                    link: '/public-spirited/',
                },
                {
                    text: 'My Gitee',
                    link: 'https://gitee.com/qwding',
                },
                {
                    text: ' My Github',
                    link: 'https://github.com/dingqianwen',
                },
                {
                    text: '无敌牛牛',
                    link: 'https://niucloud.net.cn',
                },
                {
                    text: '苞米豆',
                    link: 'https://baomidou.com/',
                },
            ],
        }
    ],
}
