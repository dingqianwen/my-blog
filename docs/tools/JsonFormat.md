---
lang: zh-CN   
title: JSON格式化  
description: 页面的描述  
date: 2022-06-01 10:25:59  
head:

- [meta, {name: keywords, content: 'JSON格式化, 在线JSON格式化'}]

---

# JSON格式化

快来<a href="javascript:void(0);" @click="tryIt()">尝试一下</a>`{"code":3,"msg":"成功！","data":88}`


<br>
<label style="display: flex;">
   <textarea class="jf-textarea" ref="value" placeholder="把数据粘贴此处" v-model="value"></textarea>
</label>
<br><br>
<div>
    <M-Button @click="format()" text="格式化" type="primary"></M-Button>
    &nbsp;&nbsp; 
    <M-Button @click="clear()" text="重置"></M-Button>
</div>
<br>

<script>

export default {
  name: 'JsonFormat',
  data(){
    return {
        value: "",
    };
  },
  methods: {
        format() {
            if(!this.value) {
                return;
            }
            let parse;
            try {
                parse = JSON.parse(this.value);
            } catch (e) {
                console.log(e);
                $warning("数据格式有误，请先检查！");
                return;
            }
            this.value = JSON.stringify(parse, undefined, 3);
        },
        clear() {
            this.value = "";
        },
        tryIt(){
            this.value = '{"code":3,"msg":"成功！","data":88}';
            this.format();
        }
  },
  mounted() {
        this.$refs.value.focus();
  },
}
</script>

<style scoped>

.jf-textarea{
/*    overflow: hidden;*/
    overflow-wrap: break-word; 
    max-height: 500px;
    min-height: 272px;
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
