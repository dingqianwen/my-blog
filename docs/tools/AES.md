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
   <input class="oead-input" style="resize: none;" placeholder="密钥" v-model="secretKey" type="password"/>
</label>
<br><br>
<label>
   <input class="oead-input" style="resize: none" placeholder="IV偏移量" v-model="iv" type="password"/>
</label>
<br><br><br>
<div>
    <M-Button @click="decrypt()" class="oead-decrypt" :isLoading="decryptBtnLoading" text="解密" type="primary"></M-Button>
    &nbsp;&nbsp;
    <M-Button @click="encrypt()" class="oead-encrypt" :isLoading="encryptBtnLoading" text="加密" type="primary"></M-Button>
    &nbsp;&nbsp;
    <M-Button @click="reset()" text="重置"></M-Button>
</div>
<br>

> 密钥不足`32`位、IV偏移量不足`16`位时前缀自动补充`0`；  
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
        let key = CryptoJS.enc.Utf8.parse(this.secretKey.padStart(32, '0'));
        let iv = CryptoJS.enc.Utf8.parse(this.iv.padStart(16, '0'));
      
        let base64 = CryptoJS.enc.Base64.parse(this.ciphertext);
        let src = CryptoJS.enc.Base64.stringify(base64);

        const decrypt = CryptoJS.AES.decrypt(src, key, {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        });
        this.plaintext = CryptoJS.enc.Utf8.stringify(decrypt).toString();
        this.decryptBtnLoading = false;
    },
    process() {
        if (!this.secretKey) {
            $warning("密钥不能为空！");
            return false;
        }
        if (!this.iv) {
            $warning("IV偏移量不能为空！");
            return false;
        }
        if(this.secretKey.length > 32) {
            $warning("密钥过长，不可超过32位！");
            return false;
        }
        if(this.secretKey.length < 32) {
            this.secretKey = this.secretKey.padStart(32, '0');
        }
        if(this.iv.length > 16) {
            $warning("IV偏移量过长，不可超过16位！");
            return false;
        }
        if(this.iv.length < 16) {
            this.iv = this.iv.padStart(16, '0');
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
        let key = CryptoJS.enc.Utf8.parse(this.secretKey.padStart(32, '0'));
        let iv = CryptoJS.enc.Utf8.parse(this.iv.padStart(16, '0'));
        let srcs = CryptoJS.enc.Utf8.parse(this.plaintext);
        const encrypted = CryptoJS.AES.encrypt(srcs, key, {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        });
        this.ciphertext = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
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
