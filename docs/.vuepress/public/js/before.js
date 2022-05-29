function isIELowVersion() {
    return !!window.ActiveXObject || "ActiveXObject" in window;
}

function isQQBrowserLowVersion() {
    try {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("qqbrowser") !== -1) {
            var version = ua.match(/qqbrowser\/([\d.]+)/)[1];
            if (version) {
                // 版本号比较
                if (this.compareVersion('10.9', version.toString()) === 1) {
                    return true;
                }
            }
        }
    } catch (e) {
        // 低版本
        return true;
    }
    return false;
}


if (window.$lowVersionAlert === undefined) {
    if (isIELowVersion() || isQQBrowserLowVersion()) {
        alert('当前浏览器版本过低，页面无法适配，请更新或更换浏览器，点击确定继续访问！');
    }
    window.$lowVersionAlert = true;
}


/**
 * 相等返回0，v1 > v2返回 1，v1 < v2 返回 -1
 *
 * @param v1
 * @param v2
 * @returns {number}
 */
function compareVersion(v1, v2) {
    if (v1 === v2) {
        return 0
    }
    var arr1 = v1.split(/\D/)
    var arr2 = v2.split(/\D/)
    // 默认版本号长度一样
    for (var i = 0; i < arr1.length;) {
        // 字符串相减将字符串隐式转成数字
        if (arr1[i] - arr2[i] > 0) {
            return 1
        }
        if (arr1[i] - arr2[i] < 0) {
            return -1
        }
        if (arr1[i] === arr2[i]) {
            i++
        }
    }
}
