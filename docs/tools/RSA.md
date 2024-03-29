---
lang: zh-CN   
title: RSA在线加解密  
description: 页面的描述  
date: 2022-06-01 10:25:59  
head:

- [meta, {name: keywords, content: 'RSA在线加密, RSA在线解密, RSA在线加解密'}]

---

# RSA在线加解密

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
<div style="display: flex;">
   <label for="publicKey"></label>
   <textarea class="oead-textarea" id="publicKey" style="resize: none" placeholder="请输入公钥" v-model="publicKey"></textarea>
   <p>&nbsp;&nbsp;&nbsp;</p>
   <label for="privateKey"></label>
   <textarea class="oead-textarea" id="privateKey" style="resize: none" placeholder="请输入私钥" v-model="privateKey"></textarea>
</div>
<br><br>
<div>
    <M-Button @click="decrypt()" class="oead-decrypt" :isLoading="decryptBtnLoading" text="解密" type="primary"></M-Button>
    &nbsp;&nbsp;
    <M-Button @click="encrypt()" class="oead-encrypt" :isLoading="encryptBtnLoading" text="加密" type="primary"></M-Button>
    &nbsp;&nbsp;
    <M-Button @click="reset()" text="重置"></M-Button>
</div>
<br>

> 加解密过程会发出网络请求到服务端进行，但本平台不会记录并存储相关密钥信息，加解密后即删除！  
> 后端执行脚本为Python编写，参考：<router-link to="../backend/python/Python实现RSA加解密.html">Python实现RSA加解密</router-link>

<script>
export default {
  name: 'RSA',
  data(){
    return {
        plaintext: "",
        ciphertext: "",
        publicKey: "",
        privateKey: "",
        encryptBtnLoading: false,
        decryptBtnLoading: false,
    };
  },
  methods: {
    decrypt() {
        if (!this.privateKey) {
            $warning("私钥不能为空！");
            return;
        }
        if (!this.ciphertext) {
            $warning("密文不能为空！");
            return;
        }
        this.decryptBtnLoading = true;
        $api.rsaDecrypt(this.ciphertext, this.privateKey, (data) => {
            this.plaintext = data;
            this.decryptBtnLoading = false;
        }, () => {
            this.plaintext = "";
            this.decryptBtnLoading = false;
        });
    },
    encrypt() {
        if (!this.publicKey) {
            $warning("公钥不能为空！");
            return;
        }
        if (!this.plaintext) {
            $warning("明文不能为空！");
            return;
        }
        this.encryptBtnLoading = true;
        $api.rsaEncrypt(this.plaintext, this.publicKey, (data) => {
            this.ciphertext = data;
            this.encryptBtnLoading = false;
        }, () => {
            this.ciphertext = "";
            this.encryptBtnLoading = false;
        });
    },
    reset() {
        this.plaintext = "";
        this.ciphertext = "";
        this.publicKey = "";
        this.privateKey = "";
    }
  }
}
</script>

<style scoped>

.oead-input{
    transition: background-color var(--t-color), border-color var(--t-color);
    border-radius: 5px;
    height: 26px;
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


<AdsbyGoogle slot="7889564278" layout="in-article"></AdsbyGoogle>

<Comment></Comment>
