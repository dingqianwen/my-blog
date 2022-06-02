const fs = require('fs')
const rootDir = './docs'
const tag = "type: cds";
const timelineFilePath = "./docs/Timeline.md";
const pageData = [];

function Content(title, path, fileName, dirFilePath, createTime) {
    this.title = title
    this.path = path
    this.dirFilePath = dirFilePath
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
                callback(dir, file)
            }
        }
    })
}

function writePageData(dir, file) {
    if (!file.endsWith("README.md")) {
        return;
    }
    let content = fs.readFileSync(file).toString();
    if (content.indexOf(tag) === -1) {
        return;
    }
    let data = fs.readdirSync(dir);
    for (let i = 0; i < data.length; i++) {
        let f = data[i];
        if (f.endsWith("README.md")) {
            continue;
        }
        let buffer = fs.readFileSync(dir + "/" + f);
        let execArray = /(?<=title:)[^].+?(?=\n)/.exec(buffer.toString());
        let title = f;
        // 如果没有自定义标题
        if (execArray === null || !(title = execArray[0])) {
            if (title.endsWith(".md")) {
                title = title.substr(0, title.length - 3);
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
        let {birthtime} = fs.statSync(dir + "/" + f);
        let content = new Content(title, dir.replace(rootDir, '') + "/" + f, f, file, birthtime);
        pageData.push(content)
    }
}

function generateDirectory() {
    let pageGroup = pageData.reduce((acc, item) => {
        if (acc[item.dirFilePath]) {
            acc[item.dirFilePath].push(item);
        } else {
            acc[item.dirFilePath] = [item];
        }
        return acc;
    }, {});
    Object.keys(pageGroup).forEach(dirFilePath => {
        let element = pageGroup[dirFilePath];
        let newTag = '';
        for (let pd of element) {
            // 生成当前目录
            newTag += `- [${pd.title}](${pd.fileName})  \n`;
        }
        // newTag === '' ?? 内容如何 ？
        if (newTag === "") {
            newTag = '> 暂无内容 \n';
        }
        // 写入目录
        fs.readFile(dirFilePath, function (err, content) {
            let newContent = content.toString().replace(/(?<=\[dir.start]: <>)[^]*?(?=\[dir.end]: <>)/, "\n\n" + newTag + "\n");
            fs.writeFile(dirFilePath, newContent, function (err) {
                if (err) {
                    console.log(err);
                }
            });
        });
    })
}

function generateTimeline(file) {
    let map = {}
    let obj = Array.from(pageData).map(m => ({
        title: m.title,
        path: m.path,
        createTime: m.createTime
    }))
    for (let i = 0; i < obj.length; i++) {
        const to = obj[i];
        let fullYear = to.createTime.getFullYear();
        let mh = ("0" + (to.createTime.getMonth() + 1)).slice(-2);
        let dy = ("0" + to.createTime.getDate()).slice(-2);
        let day = [to]
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

function processPage() {
    listDirectory(rootDir, writePageData)
    // 生成文件目录
    generateDirectory();
    // 生成时间线
    generateTimeline(timelineFilePath);
    return true;
}


module.exports = {
    processPage
}
