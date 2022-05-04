import {request} from "./config";
// 获取音乐封面
export const getSongDetail = id => request.get(`https://api.paugram.com/netease?id=${id}`)

// 歌词
// export const getLyricList = id => request.get(`/lyric?id=${id}`)

// 获取音源
// export const genSongPlayUrl = id => {
//   return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
// }

let BASE_API_URL = "https://dingqw.com/bs";


export const pvIncr = (id, call) => {
    request.get(`${BASE_API_URL}/pvIncr?id=${id}`, {}).then(then => {
        if (then.code === 0) {
            return call(then.data);
        } else if (then.code === 429) {
            alert(then.msg)
        } else if (then.code === 450) {
            // alert(then.msg)
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
            alert(then.msg)
        } else if (then.code === 450) {
            // alert(then.msg)
            console.log("警告：" + then.msg)
        } else {
            return null;
        }
    })
}
