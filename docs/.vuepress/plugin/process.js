const fs = require('fs')
const rootDir = './docs'
const tag = "type: cds";
const timelineFilePath = "./docs/Timeline.md";
// 时间线数据
const timelineObjs = [];

function Content(title, path, createTime) {
    this.title = title
    this.path = path
    this.createTime = createTime
}

function generateDirectory(dir, callback) {
    let files = fs.readdirSync(dir);
    files.forEach((fileName) => {
        let file = `${dir}/${fileName}`
        if (fileName.indexOf('.') !== 0) {
            let stat = fs.statSync(file);
            if (stat.isDirectory()) {
                generateDirectory(file, callback)
            } else {
                callback(dir, file)
            }
        }
    })
}

function writeDirectoryData(dir, file) {
    if (!file.endsWith("README.md")) {
        return;
    }
    let content = fs.readFileSync(file).toString();
    if (content.indexOf(tag) === -1) {
        return;
    }
    let newTag = '';
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

        /*
             开始生成时间线
             <p>
             statSync return:
             atime: 2022-01-30T17:37:19.610Z,
             mtime: 2022-01-30T17:36:46.718Z,
             ctime: 2022-01-30T17:36:46.718Z,
             birthtime: 2022-01-30T17:35:00.330Z  注意这里有部分系统不支持birthtime
             ...
         */
        let {birthtime} = fs.statSync(dir + "/" + f);
        let content = new Content(title, dir.replace(rootDir, '') + "/" + f, birthtime);
        timelineObjs.push(content)
        // 生成当前目录
        newTag += `- [${title}](${f})  \n`;
    }
    // newTag === '' ?? 内容如何 ？
    if (newTag === "") {
        newTag = '> 暂无内容 \n';
    }

    let newContent = content.replace(/(?<=\[dir.start]: <>)[^]*?(?=\[dir.end]: <>)/, "\n\n" + newTag + "\n");
    fs.writeFileSync(file, newContent);
}


function generateTimeline(file, obj) {
    let map = {}
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

    let content = fs.readFileSync(file).toString();
    let data = `\n maps: ${JSON.stringify(map, null, 3)} \n`;
    let newContent = content.replace(/(?<=\/\*timeline.data.start\*\/)[^]*?(?=\/\*timeline.data.end\*\/)/, data);
    fs.writeFileSync(file, newContent);
}

function processPage() {
    // 生成文件目录
    generateDirectory(rootDir, writeDirectoryData);
    // 生成时间线
    generateTimeline(timelineFilePath, timelineObjs);
    return true;
}


module.exports = {
    processPage
}
