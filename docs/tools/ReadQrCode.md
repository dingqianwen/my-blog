---
lang: zh-CN
title: 解析二维码
description: 页面的描述
date: 2022-06-01 10:25:59
head:

  - [ meta, { name: keywords, content: '解析二维码, 识别二维码, 在线二维码识别' } ]
  - [ meta, { name: description, content: '解析二维码' } ]

---

# 在线解析二维码

<br>
<br>
<label style="display: flex;">
   <textarea class="transfer-textarea" placeholder="二维码识别数据！" ref="value" v-model="value"></textarea>
</label>
<br>

<div class="file-main">
  <div class="file-box">
    <label for="fileName"></label>
    <input type="text" id="fileName" class="fileName" v-model="fileName" readonly @click="selectFile"/>
    <input type="file" accept=".png,.jpeg,.jpg" class="uploadFile" ref="file" @change="fileChange" />
    <M-Button style="cursor:pointer;" @click="selectFile" class="link" text="浏览" type="primary"></M-Button>
  </div>
</div>
<br>
<div>
    <img class="img" v-if="imageData" :src="imageData" ref="img" style="width: 50%;height: 50%;max-width: 400px;max-height: 400px" alt="">
</div>
<br>
<div>
    <M-Button @click="parse()" class="transfer-parse" :isLoading="loading" text="解析" type="primary"></M-Button>
    &nbsp;&nbsp;
    <M-Button @click="reset()" text="重置"></M-Button>
</div>
<span class="copy" @click="copy()"></span>
<br>

{{test}}
> 识别过程以及数据系统不做任何记录；

<script>

import Clipboard from "clipboard";
import QrCode from 'qrcode-decoder';

export default {
  name: 'Transfer',
  data(){
    return {
        value: "",
        fileName: "未选择任何图片",
        uid: "",
        fileData: null,
        loading: false,
        imageData: ""
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
        const reader = new FileReader();
        reader.onloadend = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = ()=> {
              const maxWidth = 500;
              const maxHeight = 500;
              let width = img.width;
              let height = img.height;
            
              if (width > maxWidth || height > maxHeight) {
                const ratio = Math.min(maxWidth / width, maxHeight / height);
                width *= ratio;
                height *= ratio;
              }
            
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              canvas.width = width;
              canvas.height = height;
              ctx.drawImage(img, 0, 0, width, height);
              this.imageData = canvas.toDataURL('image/jpeg', 0.8);
            };
        };
        reader.readAsDataURL(file);
    },
    parse() {
        const file = this.imageData;
        if (!file) {
            $warning("无待识别文件信息！");
            return;
        }
        this.loading = true;
        setTimeout(() => {
            this.getQrUrl(file).then((res) => {
                if (!res) {
                    $warning("识别失败，请检查图片是否模糊、正确！");
                    this.value = "";
                    return;
                }
                this.value = res.data;
                $('.copy').click();
            }).catch((err) => {
                $warning("识别失败，请检查图片是否正确！");
                this.value = "";
            }).finally(() => {
                this.loading = false;
            });
        }, 200);
    },
    getQrUrl(file) {
        const qr = new QrCode();
        return qr.decodeFromImage(file);
    },
    copy(){
        let clipboard = new Clipboard('.copy', {
          text:  () => {
            return this.value;
          },
        });
        clipboard.on('success', function () {
          $success("解析并复制成功！");
          clipboard.destroy();
        });
        clipboard.on('error', function () {
          $warning("不支持复制哦！");
          clipboard.destroy();
        });
    },
    reset(){
        this.value = '';
        this.fileName = '未选择任何文件';
        this.fileData = null;
        this.$refs.file.value = '';
        this.imageData = "";
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
