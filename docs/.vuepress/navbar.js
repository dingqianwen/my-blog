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
                {
                    text: 'Raspberry Pi',
                    link: '/backend/raspberrypi/',
                },
                {
                    text: 'Kuboard',
                    link: '/backend/kuboard/',
                },
            ],
        },
        {
            text: '前端',
            children: [
                {
                    text: 'CSS',
                    link: '/front/css/',
                },
                {
                    text: 'JavaScript',
                    link: '/front/js/',
                },
                {
                    text: 'NodeJS',
                    link: '/front/nodejs/',
                },
                {
                    text: 'Vue',
                    link: '/front/vue/',
                },
            ],
        },
        {text: '笔记', link: '/diary/'},
        {text: '音乐台', link: '/music/'},
        {
            text: '其他',
            children: [
                {
                    text: '关于作者',
                    link: '/AboutMe.html',
                },
                {
                    text: '时间线',
                    link: '/Timeline.html',
                },
                {
                    text: '工具箱',
                    link: '/tools/',
                },
                {
                    text: '留言板',
                    link: '/message/MessageBoard.html',
                },
                {
                    text: '公益捐款',
                    link: '/public-spirited/',
                }
            ],
        }
    ],
}
