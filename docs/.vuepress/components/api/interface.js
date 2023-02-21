import {request} from "./config";

// 获取音乐封面
export const getSongDetail = id => request.get(`https://api.paugram.com/netease?id=${id}`)


let BASE_API_URL = "https://apidocs.cn/bs";
// let BASE_API_URL = "http://localhost:8011/bs";

export const pvIncr = (id, call) => {
    request.get(`${BASE_API_URL}/pvIncr?id=${id}`, {}).then(then => {
        call(process(then));
    })
};

export const getPv = (id, call) => {
    request.get(`${BASE_API_URL}/getPv?id=${id}`, {}).then(then => {
        call(process(then));
    })
};

export const system = (call) => {
    request.get(`${BASE_API_URL}/system`, {}).then(then => {
        call(process(then));
    })
};


export const transferPush = (value, uid, key, success, ex) => {
    request.post(`${BASE_API_URL}/transfer/push`, {
        value: value,
        uid: uid,
        key: key
    }).then(then => {
        process(then);
        if (then.code === 0) {
            success();
        } else {
            ex(then);
        }
    })
};


export const transferUpload = (formData, progress, success, ex) => {
    const config = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        onUploadProgress: progressEvent => {
            let present = (progressEvent.loaded / progressEvent.total * 100 | 0);
            progress(present);
        }
    };
    request.post(`${BASE_API_URL}/transfer/upload`, formData, config)
        .then(then => {
            let data = process(then);
            if (then.code === 0) {
                return success(data);
            } else {
                ex(then);
            }
        }).catch((e) => {
        ex(e);
    });
};


export const transferDownload = (uid, callback) => {
    let uids = uid.toString().split('/');
    let fileName = uids[uids.length - 1];
    const a = document.createElement("a");
    a.href = uid;
    a.download = fileName;
    a.click();
    a.remove();
    callback();
};

export const transferPull = (key, success, ex) => {
    return request.get(`${BASE_API_URL}/transfer/pull?key=${key}`, {})
        .then(then => {
            let data = process(then);
            if (then.code === 0) {
                return success(data);
            } else {
                ex(then);
            }
        })
};

export const rsaEncrypt = (plaintext, publicKey, success, ex) => {
    return request.post(`${BASE_API_URL}/rsa/encrypt`, {
        plaintext: plaintext,
        publicKey: publicKey
    }).then(then => {
        let data = process(then);
        if (then.code === 0) {
            return success(data);
        } else {
            ex(then);
        }
    })
};


export const rsaDecrypt = (ciphertext, privateKey, success, ex) => {
    return request.post(`${BASE_API_URL}/rsa/decrypt`, {
        ciphertext: ciphertext,
        privateKey: privateKey
    }).then(then => {
        let data = process(then);
        if (then.code === 0) {
            return success(data);
        } else {
            ex(then);
        }
    })
};


function process(result) {
    if (result.code === 0) {
        return result.data
    } else if (result.code === 429) {
        // 被限流
        $warning(result.msg)
    } else if (result.code === 410) {
        // 410
        $warning(result.msg)
    } else if (result.code === 450) {
        console.log("警告：" + result.msg)
    } else {
        console.log("系统异常:", result);
        $error("系统异常～")
    }
}

/**
 * 中断请求方法
 */
function interruptHttpRequesting(url) {
    if (window.$httpRequestList.length > 0) {
        window.$httpRequestList.forEach(item => {
            if (url) {
                let cancelTokenUrl = item.prototype.cancelTokenUrl;
                //只关闭ctg相匹配的接口
                for (let i = 0; i < url.length; i++) {
                    if (cancelTokenUrl.includes(url[i])) {
                        item('interrupt');
                        break;
                    }
                }
            } else {
                // 给个标志，中断请求
                item('interrupt')
            }
        });
        window.$httpRequestList = []
    }
}


export default {
    BASE_API_URL,
    pvIncr,
    getPv,
    getSongDetail,
    transferPull,
    transferPush,
    transferUpload,
    transferDownload,
    interruptHttpRequesting,
    rsaEncrypt,
    rsaDecrypt,
    system
}
