---
lang: zh-CN
title: 时间戳日期互转
description: 页面的描述
date: 2022-06-01 10:25:59
head:

  - [ meta, { name: keywords, content: '时间戳日期互转' } ]

---

# 时间戳日期互转

<br>
<br>
<label style="display: flex;">
    <input class="oead-input" style="resize: none;" placeholder="时间戳" v-model="timestamp" type="text"/>
</label>
<br>
<label style="display: flex;">
    <input class="oead-input" style="resize: none;" placeholder="日期" v-model="date" type="text"/>
</label>
<br><br>
<div>
    <M-Button @click="toDate()" :isLoading="dateBtnLoading" text="转日期" type="primary"></M-Button>
    &nbsp;&nbsp;
    <M-Button @click="toTimestamp()" :isLoading="timestampBtnLoading" text="转时间戳" type="primary"></M-Button>
    &nbsp;&nbsp;
    <M-Button @click="reset()" text="重置"></M-Button>
</div>
<br>

> 日期格式支持：`yyyy-MM-dd HH:mm:ss`、`yyyy/MM/dd HH:mm:ss`、`yyyy-MM-dd HH:mm:ss:SSS`、`yyyy/MM/dd HH:mm:ss:SSS`；

<script>

export default {
  name: 'TimestampDateConvert',
  data(){
    return {
        timestamp: "",
        date: "",
        dateBtnLoading: false,
        timestampBtnLoading: false,
    };
  },
  created() {
  },
  methods: {
    formatDateTime(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        let result = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        if(date.getMilliseconds() === 0){
            return result;
        }
        const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
        return `${result}:${milliseconds}`;
    },
    toDate() {
        if(!this.timestamp){
            $warning("时间戳不能为空！");
            return;
        }
        if(isNaN(this.timestamp)){
            $warning("时间戳格式不正确！");
            return;
        }
        this.date = this.formatDateTime(new Date(parseInt(this.timestamp)));
    },
    toTimestamp() {
        if(!this.date){
            $warning("日期不能为空！");
            return;
        }
        let date = new Date(this.date);
        if(isNaN(date.getTime())){
            $warning("日期格式不正确！");
            return;
        }
        this.timestamp = date.getTime();
    },
    reset() {
        this.timestamp = "";
        this.date = "";
    }
  }
}
</script>

<style scoped>

.oead-input{
    transition: background-color var(--t-color), border-color var(--t-color);
    border-radius: 5px;
    height: 28px;
    color: var(--c-text);
    border: 1px solid var(--c-border);
    outline: none;
    background-color: var(--c-bg);
    padding-left : 0.75em;
}
</style>

<AdsbyGoogle slot="7889564278" layout="in-article"/>

<Comment></Comment>