module.exports = {
    sidebar: [
        // SidebarItem  https://v2.vuepress.vuejs.org/zh/reference/default-theme/config.html#sidebar
        {
            text: '后端',
            children: [
                {
                    text: 'Java',
                    link: '/backend/java/',
                    children: [
                        '/backend/java/java输入一个字符串,要求将该字符串中出现的英文字母,按照顺序 进行输出,区分大小写，且大写优先.md',
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
                {
                    text: 'HBase',
                    link: '/backend/hbase/',
                    children: [
                        '/backend/hbase/CentOS安装HBase.md',
                    ],
                },
                {
                    text: 'Redis',
                    link: '/backend/redis/',
                    children: [
                        '/backend/redis/CentOS安装Redis.md',
                    ],
                },
            ],
        },
        {
            text: '前端',
            children: [
                {
                    text: 'Vue',
                    link: '/front/vue/',
                    children: [
                        '/front/vue/README.md',
                    ],
                },
                {
                    text: 'JavaScript',
                    link: '/front/js/',
                    children: [
                        '/front/js/对象数组深克隆.md',
                        '/front/js/日期格式刚刚1分钟前等格式化.md',
                        '/front/js/设置JSON对象默认值.md',
                        '/front/js/格式化日期.md',
                    ],
                },
            ],
        },
        {
            text: '个人日记',
            children: [
                '/diary/README.md',
            ],
        },
        {
            text: '消息',
            children: [
                '/message/MessageBoard.md',
            ],
        },
    ]
}
