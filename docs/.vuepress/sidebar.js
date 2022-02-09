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
        }));
    if (mds.length !== 0) {
        console.log(mds)
    }
    return mds;
}

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
                        children: read("../backend/java", {ignoreReadmeMd: true}),
                    },
                    {
                        text: 'Python',
                        children: read("../backend/python", {ignoreReadmeMd: true}),
                    },
                    {
                        text: 'HBase',
                        children: read("../backend/hbase", {ignoreReadmeMd: true}),
                    },
                    {
                        text: 'Redis',
                        children: read("../backend/redis", {ignoreReadmeMd: true}),
                    },
                    {
                        text: 'Nginx',
                        children: read("../backend/nginx", {ignoreReadmeMd: true}),
                    },
                    {
                        text: 'CentOS',
                        children: read("../backend/centos", {ignoreReadmeMd: true}),
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
                        children: read("../front/vue", {ignoreReadmeMd: true}),
                    },
                    {
                        text: 'JavaScript',
                        link: '/front/js/',
                        children: read("../front/js", {ignoreReadmeMd: true}),
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
                        children: read("../music", {ignoreReadmeMd: true}),
                    }
                ]

            },
        ]
    }
}
