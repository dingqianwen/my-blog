const fs = require('fs')
const rootDir = './docs'
const tag = "type: cds";
const timelineFilePath = "./docs/Timeline.md";
const pageData = [];
const sitemapTxtPath = "./docs/.vuepress/public/sitemap.txt";
const sitemapXmlPath = "./docs/.vuepress/public/sitemap.xml";
const sitemapBaseURL = "https://apidocs.cn/blog";

function Content(title, path, dir, fileName, createTime) {
    this.title = title
    this.path = path
    this.dir = dir
    this.fileName = fileName
    this.createTime = createTime
}

function listDirectory(dir, callback) {
    let files = fs.readdirSync(dir);
    files.forEach((fileName) => {
        let file = `${dir}/${fileName}`
        if (fileName.indexOf('.') !== 0) {
            let stat = fs.statSync(file);
            if (stat.isDirectory()) {
                listDirectory(file, callback)
            } else {
                callback(dir, file, fileName)
            }
        }
    })
}

function writePageData(dir, f, fileName) {
    if (f.endsWith("README.md")) {
        return;
    }
    let buffer;
    try {
        buffer = fs.readFileSync(f);
    } catch (e) {
        return
    }
    let execArray = /(?<=\ntitle:)[^]*?(?=\n)/.exec(buffer.toString());
    let title;
    // 如果没有自定义标题
    if (execArray === null || !(title = execArray[0])) {
        // 取文件名称
        if (fileName.endsWith(".md")) {
            title = fileName.substr(0, fileName.length - 3);
        }
    } else {
        // 自定义标题
        title = title.trim();
        if (title.startsWith("'")) {
            title = title.substr(1);
        }
        if (title.endsWith("'")) {
            title = title.substr(0, title.length - 1);
        }
    }
    // 注意这里有部分系统不支持birthtime
    let {birthtime} = fs.statSync(f);
    let content = new Content(title, f.replace(rootDir, ''), dir, fileName, birthtime);
    pageData.push(content)
}

function generateDirectory() {
    let pageGroup = pageData.reduce((acc, item) => {
        if (acc[item.dir]) {
            acc[item.dir].push(item);
        } else {
            acc[item.dir] = [item];
        }
        return acc;
    }, {});
    Object.keys(pageGroup).forEach(dir => {
        let element = pageGroup[dir];
        let newTag = '';
        let dirFile = dir + "/README.md";
        for (let pd of element) {
            if (pd.path.endsWith("README.md")) {
                continue;
            }
            // 生成当前目录
            newTag += `- [${pd.title}](${pd.fileName})  \n`;
        }
        // newTag === '' ?? 内容如何 ？
        if (newTag === "") {
            newTag = '> 暂无内容 \n';
        }
        // 写入目录
        fs.readFile(dirFile, function (err, content) {
            if (!content) {
                return;
            }
            // 排除掉不需要生成目录的readme.md
            if (content.toString().indexOf(tag) === -1) {
                return;
            }
            let newContent = content.toString().replace(/(?<=\[dir.start]: <>)[^]*?(?=\[dir.end]: <>)/, "\n\n" + newTag + "\n");
            fs.writeFile(dirFile, newContent, function (err) {
                if (err) {
                    console.log(err);
                }
            });
        });
    })
}

function generateTimeline(file) {
    let map = {};
    let obj = Array.from(pageData).filter(f => {
        // 排除掉ci目录
        return !f.dir.toString().endsWith('/ci');
    }).map(m => ({
        title: m.title,
        path: m.path,
        createTime: m.createTime
    }));
    for (let i = 0; i < obj.length; i++) {
        const to = obj[i];
        let fullYear = to.createTime.getFullYear();
        let mh = ("0" + (to.createTime.getMonth() + 1)).slice(-2);
        let dy = ("0" + to.createTime.getDate()).slice(-2);
        let day = [to];
        let days = {};
        days[dy] = day;
        let month = {};
        month[mh] = days;
        // 初始化
        if (!map[fullYear]) {
            // 不存在
            map[fullYear] = month;
        } else {
            if (!map[fullYear][mh]) {
                map[fullYear][mh] = days;
            } else {
                if (!map[fullYear][mh][dy]) {
                    map[fullYear][mh][dy] = day;
                } else {
                    map[fullYear][mh][dy].push(to);
                }
            }
        }
    }

    fs.readFile(file, function (err, content) {
        let data = `\n maps: ${JSON.stringify(map, null, 3)} \n`;
        let newContent = content.toString().replace(/(?<=\/\*timeline.data.start\*\/)[^]*?(?=\/\*timeline.data.end\*\/)/, data);
        fs.writeFile(file, newContent, function (err) {
            if (err) {
                console.log(err);
            }
        });
    });
}

function generateSitemap(sitemapTxtPath, sitemapXmlPath, sitemapBaseURL) {
    let sitemapTxt = "";
    let sitemapXml = `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`
    for (let pd of pageData) {
        // /ci
        if(pd.dir.toString().endsWith('/ci')){
            continue;
        }
        // encodeURI(pageUrl)
        let pageUrl = sitemapBaseURL + (pd.path.replace(".md", ".html"));
        sitemapTxt += encodeURI(pageUrl) + "\n";
        sitemapXml += `
    <url>
        <loc>${pageUrl}</loc>
        <priority>1.00</priority>
    </url>
`;
    }
    sitemapXml += "</urlset>";
    fs.writeFile(sitemapTxtPath, sitemapTxt, function (err) {
        if (err) {
            console.log(err);
        }
    });
    fs.writeFile(sitemapXmlPath, sitemapXml, function (err) {
        if (err) {
            console.log(err);
        }
    });
}

function processPage() {
    listDirectory(rootDir, writePageData);
    // 生成文件目录
    generateDirectory();
    // 生成时间线
    generateTimeline(timelineFilePath);
    // 生成网站地图
    generateSitemap(sitemapTxtPath, sitemapXmlPath, sitemapBaseURL);
    return true;
}


module.exports = {
    processPage
};
