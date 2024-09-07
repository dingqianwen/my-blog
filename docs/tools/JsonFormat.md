---
lang: zh-CN
title: JSON格式化
description: 页面的描述
date: 2022-06-01 10:25:59
head:

  - [ meta, { name: keywords, content: 'JSON格式化, 在线JSON格式化' } ]
  - [ script, { src: '/js/codemirror.min.js' } ]
  - [ link, { href: '/css/material.css', rel: 'stylesheet' } ]
  - [ link, { href: '/css/codemirror.min.css',  rel: 'stylesheet' } ]

---

# JSON格式化

快来<a href="javascript:void(0);" @click="tryIt()">点我尝试一下</a>`{"code":3,"msg":"成功！","data":88}`


<br>
<label class="jf">
   <textarea style="display: none" class="jf-textarea" id="jf-textarea" placeholder="把数据粘贴此处"></textarea>
</label>
<br><br>
<div>
    <M-Button @click="format()" text="格式化" type="primary"></M-Button>
    &nbsp;&nbsp; 
    <M-Button @click="clear()" text="重置"></M-Button>
</div>
<br>

<script>
let editor;
let output;
export default {
  name: 'JsonFormat',
  data(){
    return {
    };
  },
  methods: {
        format() {
            const input = editor.getValue();
            if(!input) {
                return;
            }
            let parse;
            try {
                parse = JSON.parse(input);
            } catch (e) {
                console.log(e);
                $warning("数据格式有误，请先检查！");
                return;
            }
            output.setValue(this.text = JSON.stringify(parse, undefined, 3));
            $('.copy').click();
        },
        clear() {
            output.setValue("");
        },
        tryIt(){
            output.setValue('{"code":3,"msg":"成功！","data":88}');
            this.format();
        }
  },
  mounted() {
        CodeMirror.defineMode("json", function(config, parserConfig) {
            function tokenBase(stream, state) {
                if (stream.eatSpace()) return null;
                 if (stream.match(/"(?:[^\\"]|\\.)*"/)) {
                    if (stream.match(/:/, false)) {
                        return "variable";
                    }
                    return "string";
                }
                if (stream.match(/-?\d+\.?\d*(e[-+]?\d+)?/)) {
                    return "number";
                }
                if (stream.match(/[\[\]{}]/)) {
                    return "bracket";
                }
                if (stream.match(/[:,]/)) {
                    return "punctuation";
                }
                if (stream.match(/(true|false|null)\b/)) {
                    return "atom";
                }
                stream.next();
                return null;
            }
            return {
                startState: function() {
                    return {};
                },
                token: tokenBase,
                indent: function() {
                    return 0;
                },
                electricChars: "{}[]:,"
            };
        });
        let textarea = document.getElementById('jf-textarea');
        editor = CodeMirror.fromTextArea(textarea, {
            mode: 'json', 
            lineNumbers: false, 
            theme: "default",
            matchBrackets: true, 
            indentWithTabs: true, 
            smartIndent: true,   
        });
        output = editor.getDoc();
  },
}
</script>

<style>
    .jf .CodeMirror {
        border: 1px solid var(--c-border);
        background-color: var(--c-bg);
        transition: background-color var(--t-color),border-color var(--t-color);
        font-family: monospace;
        font-size: 14px;
        padding: 0.5em;
        border-radius: 5px;
        min-height: 100px;
        height: 400px;
        max-height: 600px;
        resize: vertical;
    }
    .jf .CodeMirror-line{
         color: var(--c-text) !important;
    }
    .jf .CodeMirror-linenumbers {
        display: none;
    }
    .jf  .cm-variable {
        color: var(--c-brand) !important;
    }
    .jf .cm-string {
        color: var(--c-text) !important;
    }
   .jf  .cm-number {
        color: var(--c-text-lighter) !important;
    }
</style>

<Comment></Comment>
