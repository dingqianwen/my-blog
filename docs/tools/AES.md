---
lang: zh-CN   
title: AES在线加解密  
description: 页面的描述  
date: 2022-06-01 10:25:59  
head:

- [meta, {name: keywords, content: 'AES在线加解密'}]

---

# AES在线加解密

<br>
<br>
<label style="display: flex;">
   <textarea class="oead-textarea" placeholder="明文" v-model="plaintext"></textarea>
</label>
<br>
<label style="display: flex;">
   <textarea class="oead-textarea" placeholder="密文" v-model="ciphertext"></textarea>
</label>
<br>
<label>
   <input class="oead-input" style="resize: none;" placeholder="密钥" v-model="secretKey" type="text"/>
</label>
<br><br>
<label>
   <input class="oead-input" style="resize: none" placeholder="偏移量" v-model="iv" type="text"/>
</label>
<br><br><br>
<div>
    <M-Button @click="encrypt()" class="oead-encrypt" :isLoading="encryptBtnLoading" text="加密" type="primary"></M-Button>
    &nbsp;&nbsp;
    <M-Button @click="decrypt()" class="oead-decrypt" :isLoading="decryptBtnLoading" text="解密" type="primary"></M-Button>
    &nbsp;&nbsp;
    <M-Button @click="reset()" text="重置"></M-Button>
</div>
<br>

> 密钥`16`、`24`、`32`位、偏移量`16`位；  
> 默认使用`ECB`模式，如果输入偏移量，则使用`CBC`模式；  
> 加解密过程不会发出网络请求、不会存储相关密钥信息；  

<script>

import CryptoJS from "crypto-js";


export default {
  name: 'AES',
  data(){
    return {
        plaintext: "",
        ciphertext: "",
        secretKey: this.getCurrentUrlParam("secretKey"),
        iv: this.getCurrentUrlParam("iv"),
        encryptBtnLoading: false,
        decryptBtnLoading: false,
    };
  },
  created() {
  },
  methods: {
    getCurrentUrlParam(name){
       if (typeof window === 'undefined') {
           return null;
       }
       return getCurrentUrlParam(name);
    },
    decrypt() {
        if(!this.process()){
           return;
        }
        if (!this.ciphertext) {
            $warning("密文不能为空！");
            return;
        }
        this.decryptBtnLoading = true;
        let key = CryptoJS.enc.Utf8.parse(this.secretKey);
        let decrypt;
        if(this.iv) {
            let iv = CryptoJS.enc.Utf8.parse(this.iv);
            decrypt = CryptoJS.AES.decrypt(this.ciphertext, key, {
              iv: iv,
              mode: CryptoJS.mode.CBC,
              padding: CryptoJS.pad.Pkcs7
            });
        }else {
            decrypt = CryptoJS.AES.decrypt(this.ciphertext, key, {
              mode: CryptoJS.mode.ECB,
              padding: CryptoJS.pad.Pkcs7
            });
        }
        this.plaintext = decrypt.toString(CryptoJS.enc.Utf8);
        this.decryptBtnLoading = false;
    },
    process() {
        if (!this.secretKey) {
            $warning("密钥不能为空！");
            return false;
        }
        let skl = this.secretKey.length;
        if(![16, 24, 32].includes(skl)) {
            $warning("密钥错误，长度为16、24、32位！");
            return false;
        }
        if (this.iv) {
            if(this.iv.length !== 16) {
                $warning("IV偏移量错误，长度为16位！");
                return false;
            }   
        }
        return true;
    },
    encrypt() {
        if(!this.process()){
           return;
        }
        if (!this.plaintext) {
            $warning("明文不能为空！");
            return;
        }
        this.encryptBtnLoading = true;
        let key = CryptoJS.enc.Utf8.parse(this.secretKey);
        let srcs = this.plaintext;
        let encrypted;
        if(this.iv) {
            let iv = CryptoJS.enc.Utf8.parse(this.iv);
            encrypted = CryptoJS.AES.encrypt(srcs, key, {
              iv: iv,
              mode: CryptoJS.mode.CBC,
              padding: CryptoJS.pad.Pkcs7,
            });
        }else {
            encrypted = CryptoJS.AES.encrypt(srcs, key, {
              mode: CryptoJS.mode.ECB,
              padding: CryptoJS.pad.Pkcs7,
            });
        }
        this.ciphertext = encrypted.toString();
        this.encryptBtnLoading = false;
    },
    reset() {
        this.plaintext = "";
        this.ciphertext = "";
        this.secretKey = "";
        this.iv = "";
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

.oead-textarea{
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
    word-break:break-all;
    border: 1px solid var(--c-border);
}
</style>


<AdsbyGoogle slot="7889564278" layout="in-article"/>

<Comment></Comment>
