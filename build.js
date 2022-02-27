const fs = require('fs')
const rootDir = './docs'
const tag = "type: cds";
const timelineFilePath = "./docs/Timeline.md";
// 时间线数据
const timelineObjs = [];

function DContent(title, path, createTime) {
    this.title = title
    this.path = path
    this.createTime = createTime
}

// 生成文件目录
generateDirectory(rootDir, writeData);
// 生成时间线
generateTimeline(timelineFilePath, timelineObjs);

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

function writeData(dir, file) {
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
        // 时间线
        let {ctimeMs} = fs.statSync(dir + "/" + f);
        let dContent = new DContent(title, dir.replace(rootDir, '') + "/" + f, new Date(ctimeMs));
        timelineObjs.push(dContent)
        // 生成当前目录
        newTag += `- [${title}](${f})  \n`;
    }
    // newTag === '' ?? 内容如何 ？
    if (newTag === "") {
        newTag = '> 暂无内容 \n';
    }
    let newContent = content.replace(/(?<=# 当前目录)[^]*?(?=<Comment><\/Comment>)/, "\n\n" + newTag + "\n");
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
    let noContent = `
        <div>
                 <br>
                    <blockquote v-if="Object.keys(maps).length===0"><p>暂无内容</p></blockquote>
                 <br>
        </div>`;
    let code = `---
lang: zh-CN
title: 时间线
description: 页面的描述
---

# 时间线

<div class="archives-body">
    <div class="archives-box overflow-initial">
        <div v-for="yk in Object.keys(maps).sort((a, b) => {
                                return b - a;
                           })" :key="yk">
            <h3 class="year pointer">{{yk}}年</h3>
            <ul class="list-box">
                <li v-for="mk in Object.keys(maps[yk]).sort((a, b) => {
                                return b - a;
                           })" :key="mk">
                    <span class="month pointer">{{mk}}月</span>
                    <ul class="list-box" style="display: block;">
                        <li class="month-li" v-for="dk in  Object.keys(maps[yk][mk]).sort((a, b) => {
                                                                    return b - a;
                                                           })" :key="dk">
                            <span class="day">{{dk}}日 <span class="num">{{Object.keys(maps[yk][mk][dk]).length}}篇</span> </span>
                            <ul class="list-box" style="display: block;">
                                <li class="article-item" v-for="lk in Object.keys(maps[yk][mk][dk])" :key="lk" >
                                    <router-link :to="maps[yk][mk][dk][lk].path.replace('.md','.html')">{{maps[yk][mk][dk][lk].title}}</router-link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>${obj.length === 0 ? noContent : ''}
    </div>
</div>

<Comment></Comment>

<script>
    export default {
    name: 'Timeline',
    data() {
        return {
          maps: ${JSON.stringify(map, null, 3)}
        }
      }
    }
</script>
<style scoped>
.archives-box .num {
    font-size: 14px;
    font-weight: 100;
}
.archives-box .month{
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 1.25em;
}
.archives-box .day{
    font-size: 15px;
}
.archives-box ul, ol {
    list-style-type: none;
}
.archives-box .list-box{
     padding-left: 23px;
}
</style>
            `
    fs.writeFile(file, code, function (err) {
        if (err) return err;
    });
}
