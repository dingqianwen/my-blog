---
lang: zh-CN   
title: 跨平台复制  
description: 页面的描述
---

# 跨平台复制

<br>
<br>
<label style="display: flex;">
   <textarea class="transfer-textarea" placeholder="把数据粘贴此处" v-model="value"></textarea>
</label>
<br><br>
<label>
    <input type="password" v-model="key" class="transfer-input" placeholder="密钥"/>
</label>
<br><br>
<label>
    <button @click="push" class="transfer-button transfer-push">
        <span>提交</span>
    </button>
    &nbsp;&nbsp; 
    <button @click="pull()" class="transfer-button transfer-pull">
        <span>获取</span>
    </button>
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
    setLoading(el) {
        $(el).append('<span class="transfer-btn-loading transfer-spinner"></span>');
    },
    removeLoading(el) {
        $(el + ' .transfer-btn-loading').remove();
    }
  },
  mounted() {
  },
  watch: {
    pushBtnLoading: {
      handler(newVal) {
        if(newVal) {
            this.setLoading('.transfer-push');
        }else{
            this.removeLoading('.transfer-push');
        }
      },
      immediate: false
    },
    pullBtnLoading: {
      handler(newVal) {
        if(newVal) {
            this.setLoading('.transfer-pull');
        }else{
            this.removeLoading('.transfer-pull');
        }
      },
      immediate: false
    }
  }
}
</script>

<style>

.transfer-spinner {
    position: relative;
}

.transfer-spinner::before {
    content: '';
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
    top: 6px;
    width: 0.75em;
    height: 0.75em;
    margin-top: -0.1875em;
    margin-left: -0.375em;
    border-radius: 50%;
    border: 1px solid #fff;
    border-top-color: var(--c-text-accent);
    -webkit-animation: gt-kf-rotate 0.6s linear infinite;
    animation: gt-kf-rotate 0.6s linear infinite;
}
.transfer-btn-loading {
    position: relative;
    margin-left: 0.5em;
    display: inline-block;
    width: 0.75em;
    height: 1em;
    vertical-align: top;
}

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
.transfer-button{
    outline: none;   
    display: inline-block;
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
