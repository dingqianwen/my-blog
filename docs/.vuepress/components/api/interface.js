import {request} from "./config";
// 获取音乐封面
export const getSongDetail = id => request.get(`https://api.paugram.com/netease?id=${id}`)

// 歌词
// export const getLyricList = id => request.get(`/lyric?id=${id}`)

// 获取音源
// export const genSongPlayUrl = id => {
//   return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
// }

let BASE_API_URL = "http://localhost:7002";

export const count = (id, path) => {
    request.get(`${BASE_API_URL}/api/count/${id}/${path}`, {}).then(then => {
    })
}

export const getCount = (id) => {
    request.get(`${BASE_API_URL}/api/getCount/${id}`, {}).then(then => {
        if (then.status === 200) {
            return then.data;
        }
        return null;
    })
}
