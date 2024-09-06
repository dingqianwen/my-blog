<template>
  <span class="copy" @click="copy()"></span>
</template>

<script>

import Clipboard from "clipboard";

export default {
  name: 'Copy',
  mounted() {

  },
  props: {
    text: {
      type: String,
      required: true
    },
    successText: {
      type: String,
      default: "复制成功！"
    },
    errorText: {
      type: String,
      default: "不支持复制哦！"
    },
  },
  methods: {
    copy() {
      let clipboard = new Clipboard('.copy', {
        text: () => {
          return this.text;
        },
      });
      clipboard.on('success', () => {
        $success(this.successText);
        clipboard.destroy();
      });
      clipboard.on('error', () => {
        $warning(this.errorText);
        clipboard.destroy();
      });
    }
  }
};
</script>
