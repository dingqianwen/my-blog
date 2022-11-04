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

<div class="file-main">
    <div class="file-box">
        <label>
          <input type="text" class="fileName" v-model="fileName"/>
        </label>
        <M-Button href="javascript:void(0);"  class="link" text="浏览" type="primary"></M-Button>
        <input type="file" class="uploadFile" ref="file" @change="fileChange" />
     </div>
</div>
 
<br>
<label>
    <input type="password" v-model="key" class="transfer-input" placeholder="密钥"/>
</label>
<br><br><br>
<label>
    <M-Button @click="push()" class="transfer-push" :isLoading="pushBtnLoading" :text="present?`提交(${present})`:'提交'" type="primary"></M-Button>
    &nbsp;&nbsp; 
    <M-Button @click="pull()" class="transfer-pull" :isLoading="pullBtnLoading" text="获取" type="primary"></M-Button>
    &nbsp;&nbsp;
    <M-Button @click="reset()" text="重置"></M-Button>
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
        fileName: "未选择任何文件",
        uid: "",
        present: ''
    };
  },
  methods: {
    fileChange(){
        const file = this.$refs.file?.files[0];
        this.fileName = file.name;
    },
    push() {
        if(this.pushBtnLoading){
            $warning("请等待上传完毕！");
        }
        const file = this.$refs.file?.files[0];
        if (!this.value && !file) {
            $warning("没有内容可提交！");
            return;
        }
        this.pushBtnLoading = true;
        let uid = '';
        new Promise((resolve) => {
            if(file) {
                this.fileName = file.name;
                const formData = new FormData();
                formData.append('file', file);
                    $api.transferUpload(formData,(present)=>{
                        console.log(present);
                        this.present = present;
                    },(data) => {
                        uid = data;
                        this.present = '';
                        resolve();
                    },() => {
                        resolve();
                    });
             } else {
                 resolve();
             }
        }).then(()=>{
            $api.transferPush(this.value, uid, this.key, () => {
               setTimeout(() => {
                   this.pushBtnLoading = false;
                   $success("提交成功！");
               }, 200);
            },() => {
                this.pushBtnLoading = false;
            });
        });
    },
    async pull() {
       this.pullBtnLoading = true;
       await $api.transferPull(this.key, (data) => {
           setTimeout(() => {
               if(!data || data === "None"||!(data.value || data.uid)) {
                   $warning("暂无数据可复制！");
                   this.pullBtnLoading = false;
                   return;
               }
               new Promise((resolve) => {
                    if(data.uid){
                       this.uid = data.uid;
                       $api.transferDownload(data.uid,()=>{
                            resolve();             
                       });   
                    } else {
                      resolve();     
                    }
               }).then(()=>{
                  if(data.value){
                       this.data = data.value;
                       $('.copy').click();
                    }
                  this.pullBtnLoading = false;
               });
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
    reset(){
        this.value = '';
        this.key = '';
        this.data = '';
        this.fileName = '未选择任何文件';
        this.$refs.file.value = '';
    }
  },
  mounted() {
        this.$refs.value.focus();
  },
}
</script>

<style scoped>

.transfer-input{
    transition: background-color var(--t-color), border-color var(--t-color);
    border-radius: 5px;
    height: 28px;
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



.file-main{
    height:32px;
}
.file-box{
    position:relative;
    float:left;
}
.file-main input.uploadFile{
    position:absolute;
    left:0;
    right:0;
    top:0;
    opacity:0;
    filter:alpha(opacity=0);
    cursor:pointer;
    width: 100%;
    height:32px;
    overflow: hidden;
    outline: none;
}
.file-main input.fileName{
    transition: background-color var(--t-color), border-color var(--t-color);
    outline: none;
    padding: 5px 5px 5px 0.75em;
    line-height:20px;
    border: 1px solid var(--c-border);
    margin-right:10px;
    border-radius: 5px;
    background-color: var(--c-bg);
    color: var(--c-text);
}

</style>

<AdsbyGoogle slot="7889564278" layout="in-article"/>

<Comment></Comment>
