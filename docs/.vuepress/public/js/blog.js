let boo = false;

function getClipboard() {
    navigator.clipboard
        .readText()
        .then((v) => {
            /*console.log("获取剪贴板成功：", v);*/
            if (v === 'myblog:link:AboutMe') {
                location = 'AboutMe.html';
            } else if (v === 'myblog' || v === 'dqw' || v === '丁乾文') {
                if (boo === false) {
                    $success('恭喜你发现了这个彩蛋～');
                    boo = true;
                }
            }
        })
        .catch((v) => {
            /*console.log("获取剪贴板失败: ", v);*/
        });
}

document.addEventListener('visibilitychange', event => {
    getClipboard();
});
