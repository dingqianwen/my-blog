import {request} from "./config";

// 获取音乐封面
export const getSongDetail = id => request.get(`https://api.paugram.com/netease?id=${id}`)


let BASE_API_URL = "https://dingqw.com/bs";


export const pvIncr = (id, call) => {
    request.get(`${BASE_API_URL}/pvIncr?id=${id}`, {}).then(then => {
        call(process(then));
    })
}

export const getPv = (id, call) => {
    request.get(`${BASE_API_URL}/getPv?id=${id}`, {}).then(then => {
        call(process(then));
    })
}


export const transferPush = (value, key, success, ex) => {
    request.post(`${BASE_API_URL}/transfer/push`, {
        value: value,
        key: key
    }).then(then => {
        let data = process(then);
        if (then.code === 0) {
            success(data);
        } else {
            ex(then);
        }
    })
}

export const transferPull = (key, success, ex) => {
    return request.get(`${BASE_API_URL}/transfer/pull?key=${key}`, {})
        .then(then => {
            process(then);
            if (then.code === 0) {
                return success();
            } else {
                ex(then);
            }
        })
}

function process(result) {
    if (result.code === 0) {
        return result.data
    } else if (result.code === 429) {
        $warning(result.msg)
    } else if (result.code === 410) {
        // 410
        $warning(result.msg)
    } else if (result.code === 450) {
        console.log("警告：" + result.msg)
    } else {
        console.log("系统异常:", result)
        $error("系统异常～")
    }
}

export default {BASE_API_URL, pvIncr, getPv, getSongDetail, transferPull, transferPush}
