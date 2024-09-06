---
lang: zh-CN
title: Properties转为YML
description: 页面的描述
date: 2022-06-01 10:25:59
head:

  - [ meta, { name: keywords, content: 'Properties转为YML' } ]
  - [ script, { src: '/js/js-yaml.min.js' } ]
  - [ script, { src: '/js/codemirror.min.js' } ]
  - [ link, { href: '/css/material.css', rel: 'stylesheet' } ]
  - [ link, { href: '/css/codemirror.min.css',  rel: 'stylesheet' } ]

---

# Properties转为YML

<br>
<br>
<label class="yp">
   <textarea placeholder="YML" id="propertiesValue"></textarea>
</label>
<br>
<label class="yp">
   <textarea placeholder="Properties" id="ymlValue" readonly></textarea>
</label>
<br><br><br>
<div>
    <M-Button @click="toYml()" class="oead-decrypt" :isLoading="toYmlBtnLoading" text="转换" type="primary"></M-Button>
    &nbsp;&nbsp;
    <M-Button @click="reset()" text="重置"></M-Button>
</div>
<span class="copy" @click="copy()"></span>

<script>

import Clipboard from "clipboard";

let inputEditor;
let outputEditor;
export default {
  name: 'YML-Properties',
  data(){
    return {
        ymlValue: "",
        propertiesValue: "",
        toYmlBtnLoading: false
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
    inputEditor = CodeMirror.fromTextArea(document.getElementById('propertiesValue'), {
        mode: "p",
        lineNumbers: false, 
        theme: "default",
        matchBrackets: true,
        indentWithTabs: true,
        smartIndent: true
    });
    outputEditor = CodeMirror.fromTextArea(document.getElementById('ymlValue'), {
        mode: 'y',
        lineNumbers: false, 
        theme: "default",
        matchBrackets: true, 
        indentWithTabs: true, 
        smartIndent: true, 
    });
  },
  methods: {
    parseValue(value) {
        if (value === 'true') return true;
        if (value === 'false') return false;
        if (!isNaN(value) && value.trim() !== ''){
            return Number(value);
        }
        return value;
    },
    convertPropertiesToObject(propertiesStr) {
       const obj = {};
        propertiesStr.trim().split('\n').forEach(line => {
             const eqIndex = line.indexOf('=');
            if (eqIndex === -1) return;
            const key = line.substring(0, eqIndex).trim();
            let value = line.substring(eqIndex + 1).trim();
            if (key && value !== undefined) {
                let cleanedValue = value;
                if (cleanedValue.startsWith("'") && cleanedValue.endsWith("'")) {
                    cleanedValue = cleanedValue.slice(1, -1);
                }
                const keyParts = key.split(/[\.\[\]]+/).filter(Boolean);
                let current = obj;
                for (let i = 0; i < keyParts.length - 1; i++) {
                    const part = keyParts[i];
                    if (keyParts[i + 1] && !isNaN(keyParts[i + 1])) {
                        if (!Array.isArray(current[part])) {
                            current[part] = [];
                        }
                        current = current[part];
                    } else {
                        if (typeof current[part] !== 'object' || Array.isArray(current[part])) {
                            current[part] = {};
                        }
                        current = current[part];
                    }
                }
                const lastPart = keyParts[keyParts.length - 1];
                if (!isNaN(lastPart)) {
                    current[parseInt(lastPart, 10)] = this.parseValue(cleanedValue);
                } else {
                    current[lastPart] = this.parseValue(cleanedValue);
                }
            }
        });
        return obj;
    },
    toYml() {
       this.toYmlBtnLoading = true;
       const output = outputEditor.getDoc();
       try {
            const input = inputEditor.getValue();
            const yamlObject = jsyaml.dump(this.convertPropertiesToObject(input),{
                lineWidth: -1
            });
            output.setValue(yamlObject);
            $('.copy').click();
            $success("已帮你复制到剪切板！");
        } catch (e) {
            $error("转换失败：" + e.message);
            output.setValue("");
        } finally {
            this.toYmlBtnLoading = false;
        }
    },
    reset() {
         const output = outputEditor.getDoc();
         output.setValue("");
         const input = inputEditor.getDoc();
         input.setValue("");
    },
    copy(){
        const output = outputEditor.getDoc();
        let clipboard = new Clipboard('.copy', {
          text:  () => {
            return output.getValue();
          },
        });
        clipboard.on('success', function () {
          $success("复制成功！");
          clipboard.destroy();
        });
        clipboard.on('error', function () {
          $warning("不支持复制哦！");
          clipboard.destroy();
        });
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
        min-height: 60px;
        height: 200px;
        max-height: 400px;
        resize: vertical;
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