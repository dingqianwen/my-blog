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
    <label for="fileName"></label>
    <input type="text" id="fileName" class="fileName" v-model="fileName" readonly @click="selectFile"/>
    <input type="file" class="uploadFile" ref="file" @change="fileChange" />
    <M-Button style="cursor:pointer;" @click="selectFile" class="link" text="浏览" type="primary"></M-Button>
  </div>
</div>
 
<br>
<label>
    <input type="password" v-model="key" class="transfer-input" placeholder="密钥"/>
</label>
<br><br><br>
<div>
    <M-Button @click="push()" class="transfer-push" :isLoading="pushBtnLoading" :text="present?`提交(${present}%)`:'提交'" type="primary"></M-Button>
    &nbsp;&nbsp; 
    <M-Button @click="pull()" class="transfer-pull" :isLoading="pullBtnLoading" text="获取" type="primary"></M-Button>
    &nbsp;&nbsp;
    <M-Button @click="reset()" text="重置"></M-Button>
</div>
<span class="copy" @click="copy()"></span>
<br>

> 1、文本数据在服务端保存`1小时`，长度不可超过`10000字符`；  
> 2、文件在服务端保存`30分钟`，文件大小最大不可超过`1G`；  
> 3、接口存在限流，为避免被拉入黑名单，请注意访问频次；  
> 4、此工具只是作者版本各个系统复制文本使用，不保证数据安全性，相关问题本平台不负任何责任！  



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
        present: '',
        fileData: null
    };
  },
  methods: {
    selectFile(){
        this.$refs.file.click();
    },
    fileChange(){
        const file = this.$refs.file?.files[0];
        if(file){
            this.fileName = file.name;
            this.fileData = this.$refs.file?.files[0];
        }
    },
    push() {
        if(this.pushBtnLoading){
            $warning("请等待上传完毕！");
            return;
        }
        const file = this.fileData;
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
                this.present = '0';
                $api.transferUpload(formData,(present)=>{
                    this.present = present ? present: '0';
                }, (data) => {
                    uid = data;
                    resolve();
                }, (e) => {
                    resolve(e);
                });
             } else {
                 resolve();
             }
        }).then((then)=>{
            if(then && then.message === 'interrupt'){
               $warning("提交已取消！");
               return;
            }
            $api.transferPush(this.value, uid, this.key, () => {
               this.present = '';
               this.pushBtnLoading = false;
               $success("提交成功！");
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
               if(data.value){
                   this.data = data.value;
                   $('.copy').click();
               }
               if(data.uid){
                   this.uid = data.uid;
                   $api.transferDownload(data.uid,()=>{
                                  
                   });   
               }
               this.pullBtnLoading = false;
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
        if(this.pushBtnLoading){
           if(!window.confirm('有任务正在上传，确定取消！')) {
              return;
           } else {
              $api.interruptHttpRequesting(["transfer/upload", "transfer/push"]);
           }
        }
        this.value = '';
        this.key = '';
        this.data = '';
        this.fileName = '未选择任何文件';
        this.fileData = null;
        this.$refs.file.value = '';
        
        this.present = '';
        this.pushBtnLoading = false;
        this.pullBtnLoading = false;
    }
  },
  mounted() {
        this.$refs.value.focus();
        const oDragWrap = document.getElementsByClassName("file-box")[0];
        oDragWrap.addEventListener("dragenter", function(e) {
            e.preventDefault();
        }, false);
        oDragWrap.addEventListener("dragleave", function(e) {
        }, false);
        oDragWrap.addEventListener("dragover",function(e) {
            e.preventDefault();
        }, false);
        oDragWrap.addEventListener("drop", (e)=> {
            e.preventDefault();
            const files = e.dataTransfer.files;
            if (files.length === 0) {
                return;
            }
            let file = files[0];
            this.fileName = file.name;
            this.fileData = file;
        }, false);
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
    float:left;
}
.file-main input.uploadFile {
    display: none;
}
.file-main input.fileName{
    transition: background-color var(--t-color), border-color var(--t-color);
    outline: none;
    padding: 5px 5px 5px 0.75em;
    line-height:20px;
    border: 1px solid var(--c-border);
    margin-right: 10px;
    border-radius: 5px;
    background-color: var(--c-bg);
    color: var(--c-text);
    cursor: pointer;
}

</style>

<AdsbyGoogle slot="7889564278" layout="in-article"></AdsbyGoogle>

<Comment></Comment>
