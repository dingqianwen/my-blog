---
lang: zh-CN   
title: 跨平台复制  
description: 页面的描述
---

# 跨平台复制

<br>
<br>
<label>
    <textarea class="transfer-textarea" placeholder="把数据粘贴此处" v-model="value"></textarea>
</label>
<br><br>
<label>
    <input type="password" v-model="key" class="transfer-input" placeholder="密钥"/>
</label>
<br><br>
<label>
    <button @click="push" class="transfer-button transfer-push">提交</button>
    &nbsp;&nbsp; 
    <button @click="pull()" class="transfer-button">获取</button>
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
    }
  },
  methods: {
    push() {
        if (!this.value) {
            $warning("没有内容可提交~");
            return;
        }
        $api.transferPush(this.value, this.key, (data) => {
            $success("提交成功~");
        })
    },
    async pull() {
       this.data = await $api.transferPull(this.key);
       if(!this.data || this.data === "None") {
           $warning("无数据可复制~");
           return;
       }
       setTimeout(()=>{
           $('.copy').click();
       }, 10);
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
          $warning("不支持复制哦~");
          clipboard.destroy();
        });
    }
  },
  mounted() {
  }
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
    overflow: hidden;
    overflow-wrap: break-word; 
    max-height: 400px;
    height: 72px;
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
.transfer-button{
    outline: none;   
    border: 1px solid var(--c-text-accent);
    border-radius: 5px;
    padding: 0.542em 0.95em;
    background-color: var(--c-bg);
    color: var(--c-brand);
    border-color: var(--c-brand);
    transition: background-color var(--t-color), border-color var(--t-color);
    font-size: 0.75em;
    white-space: nowrap;
    cursor: pointer;
}
.transfer-button:hover {
    color: var(--c-bg);
    background-color: var(--c-brand-light);
}
.transfer-push{
    color: var(--c-bg);
    background-color: var(--c-brand);
}
.transfer-push:hover {
    background-color: var(--c-brand-light);
    border-color: var(--c-brand);
}
</style>

<AdsbyGoogle slot="7889564278" layout="in-article"/>

<Comment></Comment>
