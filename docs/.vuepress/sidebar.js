const path = require('path');
const fs = require('fs');

function read(dir, options = {
    ignoreReadmeMd: false, // 不忽略README.md文件
}) {
    let mds = Array.from(fs.readdirSync(path.resolve(__dirname, dir))
        .filter(f => {
            if (options.ignoreReadmeMd) {
                return f !== 'README.md';

            }
        })
        .map((fileName) => {
            if (!dir.endsWith("/")) {
                dir = dir + "/";
            }
            return (dir + fileName).replace("../", "/");
        })
    );
    if (mds.length !== 0) {
        // console.log(mds)
    }
    return mds;
}

module.exports = {
    sidebar: {
        "/backend/": [
            // SidebarItem  https://v2.vuepress.vuejs.org/zh/reference/default-theme/config.html#sidebar
            // {
            //     text: '简介',
            //     link: '/backend/README.md',
            // },
            {
                text: 'Java',
                // link: '/backend/java/',
                collapsible: true,
                children: read("../backend/java", {ignoreReadmeMd: true}),
            },
            {
                text: 'Python',
                // link: '/backend/python/',
                collapsible: true,
                children: read("../backend/python", {ignoreReadmeMd: true}),
            },
            {
                text: 'C',
                // link: '/backend/c/',
                collapsible: true,
                children: read("../backend/c", {ignoreReadmeMd: true}),
            },
            {
                text: 'Flink',
                // link: '/backend/flink/',
                collapsible: true,
                children: read("../backend/flink", {ignoreReadmeMd: true}),
            },
            {
                text: 'PHP',
                // link: '/backend/php/',
                collapsible: true,
                children: read("../backend/php", {ignoreReadmeMd: true}),
            },
            {
                text: 'HBase',
                // link: '/backend/hbase/',
                collapsible: true,
                children: read("../backend/hbase", {ignoreReadmeMd: true}),
            },
            {
                text: 'Redis',
                // link: '/backend/redis/',
                collapsible: true,
                children: read("../backend/redis", {ignoreReadmeMd: true}),
            },
            {
                text: 'Nginx',
                // link: '/backend/nginx/',
                collapsible: true,
                children: read("../backend/nginx", {ignoreReadmeMd: true}),
            },
            {
                text: 'CentOS',
                // link: '/backend/centos/',
                collapsible: true,
                children: read("../backend/centos", {ignoreReadmeMd: true}),
            },
            {
                text: 'MySQL',
                // link: '/backend/mysql/',
                collapsible: true,
                children: read("../backend/mysql", {ignoreReadmeMd: true}),
            },
            {
                text: 'Raspberry Pi',
                // link: '/backend/raspberrypi/',
                collapsible: true,
                children: read("../backend/raspberrypi", {ignoreReadmeMd: true}),
            },
            {
                text: 'Kuboard',
                // link: '/backend/kuboard/',
                collapsible: true,
                children: read("../backend/kuboard", {ignoreReadmeMd: true}),
            },
        ],
        "/front/": [
            {
                text: 'CSS',
                // link: '/front/js/',
                collapsible: true,
                children: read("../front/css", {ignoreReadmeMd: true}),
            },
            {
                text: 'JavaScript',
                // link: '/front/js/',
                collapsible: true,
                children: read("../front/js", {ignoreReadmeMd: true}),
            },
            {
                text: 'NodeJS',
                // link: '/front/nodejs/',
                collapsible: true,
                children: read("../front/nodejs", {ignoreReadmeMd: true}),
            },
            {
                text: 'Vue',
                // link: '/front/vue/',
                collapsible: true,
                children: read("../front/vue", {ignoreReadmeMd: true}),
            },
        ],
        "/music/": [
            {
                text: '音乐台',
                link: '/music/',
                children: read("../music", {ignoreReadmeMd: true}),
            }
        ],
        "/diary/": [
            {
                text: '笔记',
                link: '/diary/',
                children: read("../diary", {ignoreReadmeMd: true}),
            }
        ],
        "/ci/": [
            {
                text: '面试题',
                link: '/ci/',
                children: read("../ci", {ignoreReadmeMd: true}),
            }
        ],
        "/tools/": [
            {
                text: '工具箱',
                link: '/tools/',
                children: read("../tools", {ignoreReadmeMd: true}),
            }
        ],
        /*"/": [
            {
                text: '其他',
                link: '/',
                children: [
                    '/AboutMe.html',
                    '/Timeline.html',
                    '/message/MessageBoard.html',
                    '/public-spirited/',
                ],
            }
        ]*/
    }
}
