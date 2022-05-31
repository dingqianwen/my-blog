<template>
  <button class="m-button-button">
    <span>{{ text }}</span>
    <span class="m-button-loading m-button-spinner" v-if="isLoading"></span>
  </button>
</template>

<script>
export default {
  name: "M-Button",
  props: ['text', 'isLoading']
}
</script>

<style scoped>

.m-button-spinner {
  position: relative;
}

.m-button-spinner::before {
  content: '';
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: absolute;
  top: 6px;
  width: 0.75em;
  height: 0.75em;
  margin-top: -0.1875em;
  margin-left: -0.375em;
  border-radius: 50%;
  border: 1px solid #fff;
  border-top-color: var(--c-text-accent);
  -webkit-animation: gt-kf-rotate 0.6s linear infinite;
  animation: gt-kf-rotate 0.6s linear infinite;
}

.m-button-button {
  outline: none;
  display: inline-block;
  border: 1px solid var(--c-text-accent);
  border-radius: 5px;
  padding: 0.542em 0.95em;
  background-color: var(--c-bg);
  color: var(--c-brand);
  border-color: var(--c-brand);
  transition: background-color var(--t-color), border-color var(--t-color);
  font-size: 0.75em;
  white-space: nowrap;
  cursor: pointer;
}

.m-button-button:hover {
  color: var(--c-bg);
  background-color: var(--c-brand-light);
}

.m-button-loading {
  position: relative;
  margin-left: 0.5em;
  display: inline-block;
  width: 0.75em;
  height: 1em;
  vertical-align: top;
}

</style>
