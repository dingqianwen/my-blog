---
lang: zh-CN   
title: 二维码/条形码  
description: 页面的描述  
date: 2022-06-01 10:25:59  
head:

- [meta, {name: keywords, content: '生成二维码/条形码, 在线生成二维码/条形码'}]
- [script, {src: '/js/JsBarcode.js'}]
- [script, {src: '/js/qrcode.min.js'}]

---

# 二维码/条形码

<br>
<br>
<label style="display: flex;">
   <textarea class="text-textarea" placeholder="请输入二维码/条形码数据！" ref="text" v-model="text"></textarea>
</label>
<br v-show="autoView">
<label style="width: 100%;text-align: center;display: block">
    <div id="qrCode" v-show="qrView"></div>
    <svg id="barCode" v-show="barView"></svg>
</label>
<br><br>
<div>
    <M-Button @click="generateBarCode()" text="条形码" type="primary"></M-Button>
    &nbsp;&nbsp; 
    <M-Button @click="generateQrCode()" text="二维码" type="primary"></M-Button>
    &nbsp;&nbsp; 
    <M-Button @click="reset()" text="重置"></M-Button>
</div>

<script>

export default {
  name: 'BarCodeAndQrCode',
  data(){
    return {
        text: null,
        qrView: false,
        barView: false,
        autoView: false,
    };
  },
  methods: {
        generateQrCode() {
            if(!this.text){
                return;
            }
            this.qrView = true;
            this.barView = false;
            const qrcodeContainer = document.getElementById('qrCode');
            qrcodeContainer.innerHTML = '';
            QRCode.toString(this.text, {
                type: 'svg',
                width: 150,
                height: 150,
                color: {
                    dark: '#303e4f', 
                    light: '#ffffff'
                }
            }, function (err, url) {
                if (err) {
                    $error("二维码生成失败！");
                    return;
                }
                qrcodeContainer.innerHTML = url;
            });
            this.autoView = true;
        },
        generateBarCode() {
            try {
                if(!this.text){
                    return;
                }
                if(this.text.length > 20){
                    $warning("条形码最大长度不支持超过20字符！");
                    return;
                }
                this.qrView = false;
                this.barView = true;
                JsBarcode("#barCode", this.text, {
                                displayValue: false,
                                background : "#ffffff",
                                lineColor : "#303e4f",
                                margin : 8,
                                width: 1.4,
                                height: 150
                              });
                 this.autoView = true;
            } catch (e) {
                 this.resetCode();
                 $warning("条形码不支持中文以及特殊字符！");
                 throw e;
            }
        },
        reset() {
            this.text = "";
            this.resetCode();
        },
        resetCode() {
            this.qrView = false;
            this.barView = false;
            this.autoView = false;
        }
  },
  mounted() {
  },
}
</script>

<style scoped>
.text-input{
    transition: background-color var(--t-color), border-color var(--t-color);
    border-radius: 5px;
    height: 28px;
    color: var(--c-text);
    border: 1px solid var(--c-border);
    outline: none;
    background-color: var(--c-bg);
    padding-left : 0.75em;
}
.text-textarea{
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

<Comment></Comment>


[comment]: <> (https://blog.csdn.net/qq_17627195/article/details/127287540)

[comment]: <> (https://github.com/neocotic/qrious)

[comment]: <> (https://gitcode.net/mirrors/aralejs/qrcode?utm_source=csdn_github_accelerator)
