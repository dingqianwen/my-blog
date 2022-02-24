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
                let pattern = /(title:)[^](.+?)\n/;
                let title = pattern.exec(buffer.toString())[2];
                if (!title) {
                    newTag += `> [${f}](${f})  \n`;
                } else {
                    // 自定义标题
                    title = title.trim();
                    if (title.startsWith("'")) {
                        title = title.substr(1);
                    }
                    if (title.endsWith("'")) {
                        title = title.substr(0, title.length - 2);
                    }
                    newTag += `> [${title}](${f})  \n`;
                }
            }
            // newTag === '' ?? 内容如何 ？
            if (newTag === "") {
                newTag = '> 暂无内容';
            }
            let begin = content.indexOf("# 目录");
            let newContent = content.substr(0, begin + 4) + "\n\n" + newTag + "\n\n<Comment></Comment>";
            fs.writeFile(file, newContent, function (err) {
                if (err) return err;
            });
        })
    });
}


