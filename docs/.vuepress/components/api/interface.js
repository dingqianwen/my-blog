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

export const pv = (id) => {
    request.get(`${BASE_API_URL}/pv?id=${id}`, {}).then(then => {
    })
}

export const getPv = (id, call) => {
    request.get(`${BASE_API_URL}/getPv?id=${id}`, {}).then(then => {
        if (then.code === 0) {
            return call(then.data);
        } else {
            return null;
        }
    })
}
