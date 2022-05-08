import {request} from "./config";

// 获取音乐封面
export const getSongDetail = id => request.get(`https://api.paugram.com/netease?id=${id}`)


let BASE_API_URL = "https://dingqw.com/bs";


export const pvIncr = (id, call) => {
    request.get(`${BASE_API_URL}/pvIncr?id=${id}`, {}).then(then => {
        if (then.code === 0) {
            return call(then.data);
        } else if (then.code === 429) {
            $warning(then.msg)
        } else if (then.code === 450) {
            console.log("警告：" + then.msg)
        } else {
            return null;
        }
    })
}

export const getPv = (id, call) => {
    request.get(`${BASE_API_URL}/getPv?id=${id}`, {}).then(then => {
        if (then.code === 0) {
            return call(then.data);
        } else if (then.code === 429) {
            $warning(then.msg)
        } else if (then.code === 450) {
            console.log("警告：" + then.msg)
        } else {
            return null;
        }
    })
}
