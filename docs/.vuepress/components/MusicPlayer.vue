<template>
  <div>

    <div class="loading" v-if="isViewLoading()">
      <Loading/>
    </div>

    <div class="music_player">

      <div class="left" v-show="isViewLeft()"
           :style="viewAll?'padding: 80px 120px 0 15px;':'padding: 80px 0px 0 0px;margin: 0 auto;'">
        <img class="point" src="./assets/img/point.png" alt="">
        <img :class="['bar', playing ? 'play': '']" src="./assets/img/bar.png" alt="">
        <div class="img-outer-container">
          <div :class="['img-outer', playing ? '' : 'paused']">
            <div class="img-album">
              <img :src="albumImg" alt="">
            </div>
          </div>
        </div>
        <div class="progress-bar-wrap">
          <div class="time">{{ formatTime(currentTime) }} / {{ formatTime(totalTime) }}</div>
          <div class="progress-bar" :style="{width: progress}"></div>
        </div>
        <div class="control">
          <div :class="['btn', playing ? 'play' : 'pause']" @click.native="onClickSong" title="播放/暂停">
            <svg v-show="!playing" t="1640174711530" class="svg" viewBox="0 0 900 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="801" width="20" height="20">
              <path
                  d="M780.8 475.733333L285.866667 168.533333c-27.733333-17.066667-64 4.266667-64 36.266667v614.4c0 32 36.266667 53.333333 64 36.266667l492.8-307.2c29.866667-14.933333 29.866667-57.6 2.133333-72.533334z"
                  p-id="802" fill="#ffffff"></path>
            </svg>
            <svg v-show="playing" t="1640174831312" class="icon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="1138" width="20" height="20">
              <path
                  d="M349.866667 149.333333h-14.933334c-21.333333 0-36.266667 14.933333-36.266666 34.133334v654.933333c0 19.2 14.933333 34.133333 34.133333 34.133333h14.933333c19.2 0 34.133333-14.933333 34.133334-34.133333V183.466667c2.133333-19.2-12.8-34.133333-32-34.133334z m341.333333 0h-14.933333c-21.333333 0-36.266667 14.933333-36.266667 34.133334v654.933333c0 19.2 14.933333 34.133333 34.133333 34.133333h14.933334c19.2 0 34.133333-14.933333 34.133333-34.133333V183.466667c2.133333-19.2-12.8-34.133333-32-34.133334z"
                  p-id="1139" fill="#ffffff"></path>
            </svg>
          </div>
          <div class="btn share" title="分享" @click.native="copyHandle">
            <svg t="1640253998462" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="2826" width="15" height="15">
              <path
                  d="M512 42.666667a37.12 37.12 0 1 1 0 74.026666H227.84a111.573333 111.573333 0 0 0-111.146667 111.146667v568.32a111.573333 111.573333 0 0 0 111.146667 111.146667h568.32a111.573333 111.573333 0 0 0 111.146667-111.146667V512A37.12 37.12 0 1 1 981.333333 512v284.16A185.6 185.6 0 0 1 796.16 981.333333H227.84A185.6 185.6 0 0 1 42.666667 796.16V227.84A185.6 185.6 0 0 1 227.84 42.666667z m432.213333 0A37.12 37.12 0 0 1 981.333333 79.786667V277.333333a37.12 37.12 0 1 1-74.026666 0V169.173333L525.866667 550.613333a37.12 37.12 0 0 1-52.48 0 37.12 37.12 0 0 1 0-52.48L854.826667 116.693333H746.666667A37.12 37.12 0 1 1 746.666667 42.666667z"
                  fill="#ffffff" p-id="2827"></path>
              <path
                  d="M796.16 986.666667H227.84a192 192 0 0 1-190.506667-190.506667V227.84a192 192 0 0 1 190.506667-190.506667H512a42.666667 42.666667 0 1 1 0 85.333334H227.84a106.666667 106.666667 0 0 0-106.666667 106.666666v566.826667a106.666667 106.666667 0 0 0 106.666667 106.666667h568.32a106.666667 106.666667 0 0 0 106.666667-106.666667V512a42.666667 42.666667 0 1 1 85.333333 0v284.16a192 192 0 0 1-192 190.506667z m-568.32-938.666667a180.48 180.48 0 0 0-179.84 179.84v568.32a180.48 180.48 0 0 0 179.84 179.84h568.32a180.48 180.48 0 0 0 179.84-179.84V512a31.786667 31.786667 0 1 0-64 0v284.16a117.12 117.12 0 0 1-116.48 116.48H227.84a117.12 117.12 0 0 1-116.48-116.48V227.84a117.12 117.12 0 0 1 116.48-116.48H512a31.786667 31.786667 0 1 0 0-64z m271.786667 518.826667a42.666667 42.666667 0 0 1-42.666667-42.666667 42.666667 42.666667 0 0 1 12.373333-29.866667L842.026667 122.026667H746.666667a42.666667 42.666667 0 1 1 0-85.333334h197.546666a42.666667 42.666667 0 0 1 42.666667 42.666667V277.333333a42.666667 42.666667 0 1 1-85.333333 0V181.973333L529.706667 554.666667a42.666667 42.666667 0 0 1-30.08 12.16zM867.626667 111.36l-390.4 390.613333a31.36 31.36 0 0 0 0 44.8 32.426667 32.426667 0 0 0 44.8 0L912.64 156.16V277.333333a31.786667 31.786667 0 1 0 64 0V79.786667a31.786667 31.786667 0 0 0-31.786667-31.786667H746.666667a31.786667 31.786667 0 1 0 0 64z"
                  fill="#ffffff" p-id="2828"></path>
            </svg>
          </div>
          <div class="btn switch" @click="showRight" title="切换面板" v-if="!viewAll">
            <!-- <svg t="1640501097351" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5847" width="20" height="20"><path d="M883.8 407.9H726.7v249.3c0 58.3-47.2 105.5-105.5 105.5h-179v86.8c0.1 40.2 32.6 72.7 72.8 72.8h368.9c40.2-0.1 72.7-32.6 72.8-72.8V480.7c0-19.3-7.6-37.9-21.3-51.5-13.7-13.7-32.3-21.3-51.6-21.3z m0 0" fill="#ffffff" p-id="5848" data-spm-anchor-id="a313x.7781069.0.i13" class="selected"></path><path d="M515 342.3h211.8V208.5c0-58.3-47.2-105.5-105.5-105.5H172.5C114.2 103 67 150.2 67 208.5v448.6c0 58.3 47.2 105.5 105.5 105.5h204.1V480.7c0.1-76.4 62-138.3 138.4-138.4z m0 0" fill="#ffffff" p-id="5849" data-spm-anchor-id="a313x.7781069.0.i14" class="selected"></path><path d="M726.7 657.2V407.9H515c-40.2 0.1-72.7 32.6-72.8 72.8v282h179c28 0 54.8-11.1 74.6-30.9 19.8-19.8 30.9-46.6 30.9-74.6z m0 0" fill="#ffffff" p-id="5850" data-spm-anchor-id="a313x.7781069.0.i15" class="selected"></path></svg> -->
            <svg t="1641741992711" class="icon" viewBox="0 0 1137 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="57234" width="20" height="20">
              <path
                  d="M775.509333 843.320889V364.032a119.751111 119.751111 0 0 0-119.808-119.751111H299.406222V119.751111C299.406222 53.646222 353.052444 0 419.157333 0h598.869334C1084.131556 0 1137.777778 53.646222 1137.777778 119.751111v603.761778a119.751111 119.751111 0 0 1-119.751111 119.808h-242.517334z"
                  p-id="57235" fill="#ffffff"></path>
              <path
                  d="M0 301.169778m119.751111 0l479.118222 0q119.751111 0 119.751111 119.751111l0 483.328q0 119.751111-119.751111 119.751111l-479.118222 0q-119.751111 0-119.751111-119.751111l0-483.328q0-119.751111 119.751111-119.751111Z"
                  p-id="57236" fill="#ffffff"></path>
            </svg>
          </div>
        </div>
      </div>
      <div class="right" v-if="isViewRight()">
        <div class="lyric-container" style="transition: all .2s ease-in-out;opacity: 1">
          <div class="music-name" @click="showRight">
            <p>{{ title }}</p>
            <p>歌手：{{ signer }}&emsp;&emsp;专辑：{{ albumName }}</p>
          </div>
          <p v-if="nolyric" class="noLyric">还没有歌词哦~</p>
          <Scroller
              :data="lyric"
              :options="{disableTouch: false}"
              @init="onInitScroller"
              class="lyric-wrap"
              ref="scroller"
              v-else
          >
            <div>
              <div
                  :class="getActiveCls(index)"
                  :key="index"
                  class="lyric-item"
                  ref="lyric"
                  v-for="(l,index) in lyricWithTranslation"
              >
                <p
                    :key="contentIndex"
                    class="lyric-text"
                    v-for="(content, contentIndex) in l.contents"
                >{{ content }}</p>
              </div>
            </div>
          </Scroller>
        </div>
      </div>

      <audio
          id="audio"
          :title="title"
          :src="musicSrc"
          @canplay="ready"
          preload="auto"
          @ended="end"
          @timeupdate="updateTime"
          ref="audio"
          crossOrigin="anonymous"
      ></audio>
    </div>
  </div>
</template>

<script>
import Scroller from "./Scroller.vue";
import Loading from "./Loading.vue";
import {formatTime} from './utils';
import lyricParser from "./utils/lrcparse"
import {getSongDetail} from './api'
import noImg from "./assets/img/noalbum.png"
import Clipboard from "clipboard";
import isMobile from 'ismobilejs';

const WHEEL_TYPE = "wheel"
const SCROLL_TYPE = "scroll"
// 恢复自动滚动的定时器时间
const AUTO_SCROLL_RECOVER_TIME = 1000

export default {
  components: {
    Scroller,
    Loading
  },
  data() {
    return {
      // 当前播放时长
      currentTime: 0,
      // 播放状态
      playing: false,
      // vuex结束
      formatTime,
      isLoading: true,
      albumImg: noImg,
      nolyric: false,
      lyric: [],
      title: '',
      albumName: '',
      signer: '',
      songReady: false,
      progress: '0%',
      totalTime: '',
      httpEnd: true,
      sourceAudio: null,
      contextAudio: null,
      analyserAudio: null,
      rightView: true,
      viewAll: true,
      loadComplete: false
    }
  },
  props: {
    musicId: {
      type: [String, Number],
      default: ''
    },
    musicSrc: {
      type: String,
      default: ''
    },
    lyricData: {
      default: ''
    }
  },
  created() {
    this.lyricScrolling = {
      [WHEEL_TYPE]: false,
      [SCROLL_TYPE]: false
    }
    this.lyricTimer = {
      [WHEEL_TYPE]: null,
      [SCROLL_TYPE]: null
    }
  },
  mounted() {
    this.onReload();
    window.onresize = () => {
      return (() => {
        this.onReload();
      })();
    }
    this.$nextTick(() => {
      this.getSone()

      // 解决ios 安卓 无法播放问题
      if (isMobile()) {
        this.audio.load();
      }

      // 解决微信浏览器打不开音乐问题 手机端 @canplay="ready" 失效 this.audio.readyState一直=0
      const ua = navigator.userAgent.toLowerCase();
      const isWeiXin = ua.indexOf('micromessenger') !== -1;
      if (isWeiXin) {
        this.ready();
      }

      // 加载完毕
      this.loadComplete = true;
    })
  },
  watch: {
    /* 监听*/
    activeLyricIndex(newIndex, oldIndex) {
      if (
          newIndex !== oldIndex &&
          !this.lyricScrolling[WHEEL_TYPE] &&
          !this.lyricScrolling[SCROLL_TYPE]
      ) {
        this.scrollToActiveLyric()
      }
    },
    playing(newPlaying) {
      this.$nextTick(() => {
        newPlaying ? this.play() : this.pause()
      })
    },
    songReady(n) {
      this.isLoading = !(n && this.httpEnd);
    },
    httpEnd(n) {
      this.isLoading = !(n && this.songReady);
    }
  },
  computed: {
    audio() {
      return this.$refs.audio
    },
    activeLyricIndex() {
      return this.lyricWithTranslation
          ? this.lyricWithTranslation.findIndex((l, index) => {
            const nextLyric = this.lyricWithTranslation[index + 1]
            return (
                this.currentTime >= l.time &&
                (nextLyric ? this.currentTime < nextLyric.time : true)
            )
          })
          : -1
    },
    lyricWithTranslation() {
      let ret = []
      // 空内容的去除
      const lyricFiltered = this.lyric.filter(({content}) => Boolean(content))
      // content统一转换数组形式
      if (lyricFiltered.length) {
        lyricFiltered.forEach(l => {
          const {time, content} = l
          const lyricItem = {time, content, contents: [content]}
          ret.push(lyricItem)
        })
      } else {
        ret = lyricFiltered.map(({time, content}) => ({
          time,
          content,
          contents: [content]
        }))
      }
      return ret
    }
  },
  methods: {
    isViewLoading() {
      return this.isLoading || !this.loadComplete;
    },
    isViewLeft() {
      return !this.isViewLoading() && (this.viewAll || this.rightView)
    },
    isViewRight() {
      return !this.isViewLoading() && (this.viewAll || !this.rightView);
    },
    onReload() {
      this.viewAll = document.body.clientWidth > 1150;
    },
    showRight() {
      // 全屏模式下，不可点击
      if (this.viewAll) {
        return;
      }
      this.rightView = !this.rightView;
    },
    setCurrentTime(time) {
      this.currentTime = time
    },
    setPlayingState(playing) {
      this.playing = playing
    },
    updateTime(e) {
      const time = e.target.currentTime
      this.progress = Math.ceil(time / this.audio.duration * 100) + '%'
      this.setCurrentTime(time)
    },
    ready() {
      this.songReady = true
      if (this.audio) {
        this.totalTime = this.audio.duration;
      }
    },
    end() {
      this.pause()
    },
    async play() {
      if (this.songReady) {
        this.progress = Math.ceil(this.currentTime / this.audio.duration * 100) + '%'
        try {
          // await ios 设备无法播放
          this.audio.play()
          // this.onLoadAudio()
        } catch (error) {
          this.setPlayingState(false)
        }
      }
    },
    pause() {
      this.audio.pause()
      this.setPlayingState(false)
    },
    onClickSong() {
      this.setPlayingState(!this.playing)
    },
    async getSone() {
      this.httpEnd = false;
      let result;
      // 如果本地存在歌词数据
      if (this.lyricData) {
        result = this.lyricData;
      } else {
        result = await getSongDetail(this.musicId)
      }
      this.httpEnd = true;

      const {cover, lyric, link, id, album, artist, title} = result;
      this.title = title;
      this.signer = artist;
      this.albumName = album
      this.albumImg = cover && cover.replace("250y250", "400y400") || "";
      this.lyric = lyricParser(lyric).lyric
    },
    clearTimer(type) {
      this.lyricTimer[type] && clearTimeout(this.lyricTimer[type])
    },
    getActiveCls(index) {
      return this.activeLyricIndex === index ? "active" : ""
    },
    onInitScroller(scoller) {
      // 进入歌词页面初始化时，开始定位到歌词这一行
      const {lyric} = this.$refs
      if (lyric && lyric[this.activeLyricIndex]) {
        scoller.scrollToElement(lyric[this.activeLyricIndex], 0, 0, true)
      }
      const onScrollStart = type => {
        this.clearTimer(type)
        this.lyricScrolling[type] = true
      }
      const onScrollEnd = type => {
        // 滚动结束后两秒 歌词开始自动滚动
        this.clearTimer(type)
        this.lyricTimer[type] = setTimeout(() => {
          this.lyricScrolling[type] = false
        }, AUTO_SCROLL_RECOVER_TIME)
      }
      scoller.on("scrollStart", onScrollStart.bind(null, SCROLL_TYPE))
      scoller.on("scrollEnd", onScrollEnd.bind(null, SCROLL_TYPE))
    },
    scrollToActiveLyric() {
      if (this.activeLyricIndex !== -1) {
        const {scroller, lyric} = this.$refs
        if (lyric && lyric[this.activeLyricIndex]) {
          scroller
              .getScroller()
              .scrollToElement(lyric[this.activeLyricIndex], 200, 0, true)
        }
      }
    },
    copyHandle() {
      let clipboard = new Clipboard('.share', {
        text: function () {
          return location.href;
        },
      })
      clipboard.on('success', function () {
        $success("复制链接成功！分享给你的朋友吧~");
        clipboard.destroy();
      });
      clipboard.on('error', function () {
        $warning("不支持复制哦~");
        clipboard.destroy();
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.loading {
  height: 150px;
  position: relative;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  //z-index: 10000;
}

.music_player {
  display: flex;
  overflow: hidden;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif !important;
  position: relative;

  .left {
    display: flex;
    flex-direction: column;
    position: relative;
    //padding: 80px 120px 0 120px;
    justify-content: center;

    .point {
      position: absolute;
      left: 170px;
      top: -12px;
      width: 30px;
      height: 30px;
      z-index: 2;
    }

    .bar {
      position: absolute;
      top: 0;
      left: 180px;
      width: 100px;
      height: 145px;
      z-index: 1;
      transform-origin: 0 0;
      transform: rotate(-30deg);
      transition: all .3s;

      &.play {
        transform: rotate(5deg);
      }
    }

    .img-outer-container {
      border-radius: 50%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      // background: #E6E5E6;
      width: 320px;
      height: 320px;

      .img-outer {
        width: 300px;
        height: 300px;
        background: #000;
        background: linear-gradient(-45deg, #333540, #070708, #333540);
        animation: rotate 20s linear infinite;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;

        &.paused {
          animation-play-state: paused;
        }

        .img-album {
          width: 200px;
          height: 200px;
          flex-shrink: 0;

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
      }
    }

    .progress-bar-wrap {
      margin: 40px auto 0;
      width: 100%;
      background: #f1f1f1;
      position: relative;

      .time {
        position: absolute;
        right: 0;
        bottom: 8px;
        font-size: 12px;
        color: #5c5c5c;
      }

      .progress-bar {
        background: var(--c-brand);
        height: 2px;
        position: relative;
        width: 100%;
        transition: width .2s ease;

        &:after {
          position: absolute;
          content: "";
          display: block;
          width: 6px;
          height: 6px;
          background: var(--c-brand);
          border-radius: 50%;
          top: 1px;
          right: -1px;
          transform: translate(0%, -50%);
        }
      }
    }

    .control {
      padding: 20px 40px 0;
      display: flex;
      justify-content: center;
      align-items: center;

      div {
        cursor: pointer;
      }

      .btn {
        margin: 0 auto;
        border-radius: 50%;
        width: 45px;
        height: 45px;
        background: var(--c-brand);
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .right {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .noLyric {
      text-align: center;
    }

    .music-name {
      font-size: 14px;
      color: #7e7b7b;

      p:first-child {
        // color:#333;
        font-size: 22px;
        // font-weight:
        margin-bottom: 5px;;
      }
    }

    .scroller {
      position: relative;
      overflow: hidden;

      &.lyric-wrap {
        width: 350px;
        height: 350px;
        mask-image: linear-gradient(180deg, hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, .6) 15%, #fff 25%, #fff 75%, hsla(0, 0%, 100%, .6) 85%, hsla(0, 0%, 100%, 0));

        .lyric-item {
          margin-bottom: 16px;
          font-size: 14px;

          &.active {
            font-size: 16px;
            font-weight: bold
          }
        }
      }
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(1turn);
  }
}

html.dark {
  .lyric-item.active {
    color: white !important;;
  }

  .music-name {
    p:first-child {
      color: #fefefe
    }
  }
}

html.light {
  .lyric-item.active {
    color: #333 !important;;
  }

  .music-name {
    p:first-child {
      color: #333
    }
  }
}
</style>
