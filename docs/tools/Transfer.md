---
lang: zh-CN   
title: 跨平台复制  
description: 页面的描述  
date: 2022-06-01 10:25:59  
head:

- [meta, {name: keywords, content: '跨平台复制, 手机复制电脑粘贴, 电脑复制手机粘贴'}]
- [meta, {name: description, content: '跨平台复制数据'}]

---

# 跨平台复制

<br>
<br>
<label style="display: flex;">
   <textarea class="transfer-textarea" placeholder="把数据粘贴此处" ref="value" v-model="value"></textarea>
</label>
<br>
<label style="display: flex;">
    <input type="password" v-model="key" class="transfer-input" placeholder="密钥"/>
</label>
<br><br>
<label>
    <M-Button @click="push()" class="transfer-push" :isLoading="pushBtnLoading" text="提交" type="primary"></M-Button>
    &nbsp;&nbsp; 
    <M-Button @click="pull()" class="transfer-pull" :isLoading="pullBtnLoading" text="获取"></M-Button>
</label>
<span class="copy" @click="copy()"></span>
<br><br>  

> 此工具只是作者版本各个系统复制文本使用，不保证数据安全性，相关问题本平台不负任何责任！



<script>

import Clipboard from "clipboard";

export default {
  name: 'Transfer',
  data(){
    return {
        value: "",
        key: "",
        data: "",
        pushBtnLoading: false,
        pullBtnLoading: false,
    }
  },
  methods: {
    push() {
        if (!this.value) {
            $warning("没有内容可提交！");
            return;
        }
        this.pushBtnLoading = true;
        $api.transferPush(this.value, this.key, () => {
           setTimeout(() => {
               this.pushBtnLoading = false;
               $success("提交成功！");
           }, 200);
        },() => {
            this.pushBtnLoading = false;
        })
    },
    async pull() {
       this.pullBtnLoading = true;
       await $api.transferPull(this.key, (data) => {
           this.data = data;
           setTimeout(() => {
               this.pullBtnLoading = false;
               if(!data || data === "None") {
                   $warning("暂无数据可复制！");
                   return;
               }
               $('.copy').click();
           }, 200);
       }, () => {
           this.pullBtnLoading = false; 
       });
    },
    copy(){
        let clipboard = new Clipboard('.copy', {
          text:  () => {
            return this.data;
          },
        });
        clipboard.on('success', function () {
          $success("复制成功！");
          clipboard.destroy();
        });
        clipboard.on('error', function () {
          $warning("不支持复制哦！");
          clipboard.destroy();
        });
    },
  },
  mounted() {
        this.$refs.value.focus()
  },
}
</script>

<style scoped>

.transfer-input{
    transition: background-color var(--t-color), border-color var(--t-color);
    border-radius: 5px;
    height: 26px;
    color: var(--c-text);
    border: 1px solid var(--c-border);
    outline: none;
    background-color: var(--c-bg);
    padding-left : 0.75em;
}
.transfer-textarea{
    /*overflow: hidden;*/
    overflow-wrap: break-word; 
    max-height: 400px;
    min-height: 72px;
    resize: vertical;
    width: 100%;
    max-width: 100%;
    border-radius: 5px;
    outline: none;
    background-color: var(--c-bg);
    transition: background-color var(--t-color),border-color var(--t-color);
    color: var(--c-text);
    padding: 0.75em;
    border: 1px solid var(--c-border);
}
</style>

<AdsbyGoogle slot="7889564278" layout="in-article"/>

<Comment></Comment>
