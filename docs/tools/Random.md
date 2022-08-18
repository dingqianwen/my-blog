---
lang: zh-CN   
title: 生成随机数  
description: 页面的描述  
date: 2022-06-01 10:25:59  
head:

- [meta, {name: keywords, content: '生成随机数, 在线生成随机数'}]

---

# 生成随机数

<br>
<br>
<label style="display: flex;">
   <textarea class="random-textarea" placeholder="随机数据池" ref="pool" v-model="pool"></textarea>
</label>
<br>
<label style="display: flex;">
   <input type="number" v-model="valueLength" class="random-input" placeholder="长度"  @input="valueLengthInput"/>
</label>
<br>
<label style="display: flex;">
   <textarea type="text" v-model="result" class="random-textarea" placeholder="输出" style="min-height: 44px;max-height: 200px;"></textarea>
</label>
<br><br>
<label>
    <M-Button @click="generate()" text="生成" type="primary"></M-Button>
    &nbsp;&nbsp; 
    <M-Button @click="reset()" text="重置"></M-Button>
</label>

<script>

export default {
  name: 'Random',
  data(){
    return {
        valueLength: 8,
        cachePool: "0123456789\nabcdefghijklmnopqrstuvwxyz\nABCDEFGHIJKLMNOPQRSTUVWXYZ\n",
        pool: null,
        result: "",
    };
  },
  methods: {
        valueLengthInput(){
           if(this.valueLength > 200){
              this.valueLength = 200;
           }
        },
        generate() {
            let arrayPool = this.pool.replaceAll(" ","").replaceAll("\n","").split("");
            let str = "";
            for (let i = 0; i < this.valueLength; i++) {
                str+= arrayPool[Math.round(Math.random() * (arrayPool.length - 1))];
            }
            this.result = str;
        },
        reset() {
            this.valueLength = 8;
            this.pool = this.cachePool;
        }
  },
  mounted() {
     this.pool = this.cachePool;
     this.generate();
  },
}
</script>

<style scoped>
.random-input{
    transition: background-color var(--t-color), border-color var(--t-color);
    border-radius: 5px;
    height: 26px;
    color: var(--c-text);
    border: 1px solid var(--c-border);
    outline: none;
    background-color: var(--c-bg);
    padding-left : 0.75em;
}
.random-textarea{
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
