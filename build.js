const fs = require('fs')
const rootDir = './docs'
const tag = "type: cds";

findFile(rootDir, writeFile);

function findFile(dir, callback) {
    fs.readdir(dir, function (err, files) {
        if (err) throw err
        files.forEach((fileName) => {
            let file = `${dir}/${fileName}`
            if (fileName.indexOf('.') !== 0) {
                fs.stat(file, function (err, stat) {
                    if (stat.isDirectory()) {
                        findFile(file, callback)
                    } else {
                        callback(dir, file)
                    }
                })
            }

        })
    })
}

function DContent(title, path, createTime) {
    this.title = title
    this.path = path
    this.createTime = createTime
}

function writeFile(dir, file) {
    if (!file.endsWith("README.md")) {
        return;
    }
    fs.readFile(file, function (err, data) {
        if (err) {
            return file;
        }
        let content = data.toString();
        if (content.indexOf(tag) === -1) {
            return;
        }
        let newTag = "";
        let obj = []
        fs.readdir(dir, (err, data) => {
            if (err) {
                return err;
            }
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
                        title = title.substr(0, title.length - 2);
                    }
                }
                let {ctimeMs} = fs.statSync(dir + "/" + f);
                obj.push(new DContent(title, f.replace(".md", ".html"), toDate(ctimeMs)))
            }
            let map = {}
            for (let i = 0; i < obj.length; i++) {
                const ai = obj[i];
                let fullYear = ai.createTime.getFullYear();
                let mh = ("0" + (ai.createTime.getMonth() + 1)).slice(-2);
                let dy = ("0" + ai.createTime.getDate()).slice(-2);
                let day = [ai]
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
                            map[fullYear][mh][dy].push(ai);
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
            let code = `
<div class="archives-body">
    <div class="archives-box overflow-initial">
        <div v-for="yk in Object.keys(maps)" :key="yk">
            <h3 class="year pointer">{{yk}}年</h3>
            <ul class="list-box">
                <li v-for="mk in Object.keys(maps[yk])" :key="mk">
                    <span class="month pointer">{{mk}}月</span>
                    <ul class="list-box" style="display: block;">
                        <li class="month-li" v-for="dk in Object.keys(maps[yk][mk])" :key="dk">
                            <span class="day">{{dk}}日 <span class="num">{{Object.keys(maps[yk][mk][dk]).length}}篇</span> </span>
                            <ul class="list-box" style="display: block;">
                                <li class="article-item" v-for="lk in Object.keys(maps[yk][mk][dk])" :key="lk" >
                                    <a :href="maps[yk][mk][dk][lk].path" class>{{maps[yk][mk][dk][lk].title}}</a> 
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>${obj.length === 0 ? noContent : ''}
    </div>
</div>


<script>
    export default {
    name: '${file}',
    data() {
        return {
          maps: ${JSON.stringify(map)}
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
            // newTag === '' ?? 内容如何 ？
            if (newTag === "") {
                newTag = '> 暂无内容 \n';
            }
            let newContent = content.replace(/(?<=# 归档目录)[^]*?(?=<Comment><\/Comment>)/, "\n" + code + "\n");
            fs.writeFile(file, newContent, function (err) {
                if (err) return err;
            });
        })
    });
}


const toDate = function (date) {
    return new Date(date);
}
