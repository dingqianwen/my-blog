---
lang: zh-CN
title: YML转为Properties
description: 页面的描述
date: 2022-06-01 10:25:59
head:

  - [ meta, { name: keywords, content: 'YML转为Properties' } ]
  - [ script, { src: '/js/js-yaml.min.js' } ]
  - [ script, { src: '/js/codemirror.min.js' } ]
  - [ link, { href: '/css/material.css', rel: 'stylesheet' } ]
  - [ link, { href: '/css/codemirror.min.css',  rel: 'stylesheet' } ]

---

# YML转为Properties

<br>
<br>
<label class="yp">
   <textarea placeholder="YML" id="ymlValue"></textarea>
</label>
<br>
<label class="yp" style="pointer-events: none;">
   <textarea placeholder="Properties" id="propertiesValue" readonly></textarea>
</label>
<br><br><br>
<div>
    <M-Button @click="toProperties()" class="oead-decrypt" :isLoading="toPropertiesBtnLoading" text="转换" type="primary"></M-Button>
    &nbsp;&nbsp;
    <M-Button @click="reset()" text="重置"></M-Button>
</div>

<script>
let inputEditor;
let outputEditor;
export default {
  name: 'YML-Properties',
  data(){
    return {
        ymlValue: "",
        propertiesValue: "",
        toPropertiesBtnLoading: false
    };
  },
  mounted() {
    CodeMirror.defineMode("p", function () {
        return {
            token: function (stream, state) {
                if (stream.eatSpace()) return null;
                if (stream.match(/^#/, true)) {
                    stream.skipToEnd();
                    return "comment";
                }
                if (stream.match(/^[^\s=]+(?=\s*=)/)) {
                    return "variable";
                }
                if (stream.eat("=")) {
                    stream.skipToEnd();
                    return null;
                }
                if (stream.match(/^[^\s]+/, true)) {
                    return "string";
                }
                stream.next();
                return null;
            }
        };
    });
    CodeMirror.defineMode("y", function () {
        return {
            token: function (stream, state) {
                if (stream.eatSpace()) return null;
                if (stream.match(/^#/, true)) {
                    stream.skipToEnd();
                    return "comment";
                }
                if (stream.match(/^[^\s:]+(?=\s*:)/)) {
                    return "variable";
                }
                if (stream.eat(":")) {
                    stream.skipToEnd();
                    return null;
                }
                if (stream.match(/^:\s*(.*)/)) {
                    return "string";
                }
                if (stream.match(/^[^\s]+/, true)) {
                    return "string";
                }
                stream.next();
                return null;
            }
        };
    });
    inputEditor = CodeMirror.fromTextArea(document.getElementById('ymlValue'), {
        mode: "y",
        lineNumbers: false, 
        theme: "default",
        matchBrackets: true,
        indentWithTabs: true,
        smartIndent: true
    });
    outputEditor = CodeMirror.fromTextArea(document.getElementById('propertiesValue'), {
        mode: 'p',
        lineNumbers: false, 
        theme: "default",
        matchBrackets: true, 
        indentWithTabs: true, 
        smartIndent: true, 
    });
  },
  methods: {
    toProperties() {
       this.toPropertiesBtnLoading = true;
       const output = outputEditor.getDoc();
       try {
            const input = inputEditor.getValue();
            const yamlObject = jsyaml.load(input);
            const properties = this.objectToProperties(yamlObject);
            output.setValue(properties);
        } catch (e) {
             $error("转换失败：" + e.message);
             output.setValue("");
        } finally {
            this.toPropertiesBtnLoading = false;
        }
    },
    reset() {
         const output = outputEditor.getDoc();
         output.setValue("");
         const input = inputEditor.getDoc();
         input.setValue("");
    },
    objectToProperties(obj, prefix = '') {
        let properties = '';
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            const newKey = prefix ? `${prefix}.${key}` : key;
            if (typeof value === 'object' && !Array.isArray(value)) {
              properties += this.objectToProperties(value, newKey);
            } else {
              properties += `${newKey} = ${value}\n`;
            }
          }
        }
        return properties;
    }
  }
}
</script>


<style>
    .yp .CodeMirror {
        border: 1px solid var(--c-border);
        background-color: var(--c-bg);
        transition: background-color var(--t-color),border-color var(--t-color);
        font-family: monospace;
        font-size: 14px;
        padding: 0.5em;
        height: 150px;
    }
    .yp .CodeMirror-line{
         color: var(--c-text) !important;
    }
    .yp .CodeMirror-linenumbers {
        display: none;
    }
    .yp  .cm-variable {
        color: var(--c-brand) !important;
    }
    .yp .cm-comment {
        color: var(--c-text-lightest) !important;
    }
    .yp .cm-string {
        color: var(--c-brand) !important;
    }
</style>

<AdsbyGoogle slot="7889564278" layout="in-article"/>

<Comment></Comment>