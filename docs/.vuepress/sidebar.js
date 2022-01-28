module.exports = {
    sidebar: {
        "/backend": [
            // SidebarItem  https://v2.vuepress.vuejs.org/zh/reference/default-theme/config.html#sidebar
            {
                children: [
                    // {
                    //     text: '简介',
                    //     link: '/backend/README.md',
                    // },
                    {
                        text: 'Java',
                        children: [
                            '/backend/java/java输入一个字符串,要求将该字符串中出现的英文字母,按照顺序 进行输出,区分大小写，且大写优先.md',
                            '/backend/java/架构师成长之路.md',
                            '/backend/java/仓库不支持amd64体系结构，跳过配置文件..的获取.md',
                            '/backend/java/发现了以元素process开头的无效内容.md',
                            '/backend/java/Feign @SpringQueryMap注解.md',
                            '/backend/java/@Pattern注解正则表达式校验逗号分隔字符.md',
                        ],
                    },
                    {
                        text: 'Python',
                        children: [
                            '/backend/python/',
                        ],
                    },
                    {
                        text: 'HBase',
                        children: [
                            '/backend/hbase/CentOS安装HBase.md',
                        ],
                    },
                    {
                        text: 'Redis',
                        children: [
                            '/backend/redis/CentOS安装Redis.md',
                        ],
                    },
                ],
            }
        ],
        "/front": [
            {
                children: [
                    {
                        text: 'Vue',
                        link: '/front/vue/',
                        children: [
                            '/front/vue/VuePress增加备案号.md',
                            '/front/vue/清除缓存.md',
                            '/front/vue/好用的技巧.md',
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
                            '/front/js/Must use import to load ES Module lodash-es.md',
                        ],
                    },
                ],
            }
        ],
        "/diary": [
            {
                children: [
                    '/diary/README.md',
                ],
            }
        ],
        "/message": [
            {
                children: [
                    '/message/MessageBoard.md',
                ],
            }
        ],
        "/music": [
            {
                children: [
                    {
                        text: '音乐台',
                        children: [
                            '/music/天马座的幻想.md',
                            '/music/Butter-Fly.md',
                        ],
                    }
                ]

            },
        ]
    }
}
