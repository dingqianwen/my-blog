---
lang: zh-CN   
title: 二维码/条形码  
description: 页面的描述  
date: 2022-06-01 10:25:59  
head:

- [meta, {name: keywords, content: '生成二维码/条形码, 在线生成二维码/条形码'}]
- [script, {src: '/js/JsBarcode.js'}]
- [script, {src: '/js/arale-qrcode.js'}]

---

# 二维码/条形码

<br>
<br>
<label style="display: flex;">
   <textarea class="text-textarea" placeholder="请输入二维码/条形码数据！" ref="text" v-model="text"></textarea>
</label>
<br v-show="autoView">
<label style="width: 100%;text-align: center;display: block">
    <svg id="code" v-show="autoView"></svg>
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
        autoView: false
    };
  },
  methods: {
        generateQrCode() {
            if(!this.text){
                return;
            }
            const createQrCode = function (text) {
                const codeFigure = new AraleQRCode({
                                    "element" : "code",
                                    "render": "svg",
                                    "text": text,
                                    "size": 100,
                                    "background":"var(--c-bg)",
                                    "foreground": "var(--c-text)"
                                });
            };
            createQrCode(this.text);
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
                let barcode = JsBarcode("#code", this.text, {
                                displayValue: false,
                                background : "var(--c-bg)",
                                lineColor : "var(--c-text)",
                                margin : 0,
                                width: 1.2
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
            this.autoView = false;
            const code = document.getElementById("code");
            code.width = code.width.toString();
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
