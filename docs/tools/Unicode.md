---
lang: zh-CN   
title: Unicode编码和解码    
description: 页面的描述  
date: 2022-06-01 10:25:59  
head:

- [meta, {name: keywords, content: 'Unicode编码和解码'}]
- [meta, {name: description, content: 'Unicode编码和解码'}]

---

# Unicode编码和解码  

<br>
<br>
<label style="display: flex;">
   <textarea class="oead-textarea" placeholder="待编码数据：你好Unicode" v-model="plaintext"></textarea>
</label>
<br>
<label style="display: flex;">
   <textarea class="oead-textarea" placeholder="待解码数据：%u4F60%u597DUnicode" v-model="ciphertext"></textarea>
</label>
<br><br><br>
<div>
    <M-Button @click="encrypt()" class="oead-decrypt" :isLoading="decryptBtnLoading" text="编码" type="primary"></M-Button>
    &nbsp;&nbsp;
    <M-Button @click="decrypt()" class="oead-encrypt" :isLoading="encryptBtnLoading" text="解码" type="primary"></M-Button>
    &nbsp;&nbsp;
    <M-Button @click="reset()" text="重置"></M-Button>
</div>
<br>

<script>



export default {
  name: 'Unicode',
  data(){
    return {
        plaintext: "",
        ciphertext: "",
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
            $warning("解码数据不能为空！");
            return;
        }
        this.decryptBtnLoading = true;


        this.plaintext = unescape(this.ciphertext);
        this.decryptBtnLoading = false;
    },
    process() {
        return true;
    },
    encrypt() {
        if(!this.process()){
           return;
        }
        if (!this.plaintext) {
            $warning("编码数据不能为空！");
            return;
        }
        this.encryptBtnLoading = true;
        this.ciphertext = escape(this.plaintext);
        this.encryptBtnLoading = false;
    },
    reset() {
        this.plaintext = "";
        this.ciphertext = "";
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

