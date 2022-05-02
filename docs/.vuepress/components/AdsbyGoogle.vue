<template>
  <div id="adsbygoogle">
    <br>
    <div id="abgby">
    </div>
  </div>
</template>


<script>

import {ElementResize} from './utils/ElementResize.js';

export default {
  name: "AdsbyGoogle.vue",
  props: ["layout", "slot"],
  data() {
    return {
      client: 'ca-pub-6495628091556233',
      originWidth: window.innerWidth,
      screenWidth: window.innerWidth,
    }
  },
  methods: {
    adsbyGooglePush() {
      this.$nextTick(() => {
        try {
          // <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6495628091556233" crossorigin="anonymous"/>
          (adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.log("adsbygoogle error ：", e)
        }
      });
    },
    setIns() {
      let element = document.getElementById('abgby');
      if (this.layout === 'in-article') {
        element.innerHTML = `
            <ins class="adsbygoogle"
         style="display:block; text-align:center;"
         data-ad-layout="in-article"
         data-ad-format="fluid"
         data-ad-client="${this.client}"
         data-ad-slot="${this.slot}"></ins>
        `;
      } else {
        element.innerHTML = `
              <ins class="adsbygoogle"
           style="display:block;"
           data-ad-client="${this.client}"
           data-ad-slot="${this.slot}"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
        `;
      }
    }
  },
  mounted() {
    if (typeof window !== 'undefined') {
      // init
      this.setIns();
      this.adsbyGooglePush();

      // resize
      const debounce = (fn, delay) => {
        let timer;
        return function () {
          if (timer) {
            clearTimeout(timer);
          }
          timer = setTimeout(() => {
            fn();
          }, delay);
        }
      };
      const refresh = () => {
        this.screenWidth = window.innerWidth;
      };
      // 500
      const cancalDebounce = debounce(refresh, 600);
      window.addEventListener('resize', cancalDebounce);
    }
  }, watch: {
    screenWidth: {
      immediate: true,
      handler(newValue) {
        if (newValue !== this.originWidth) {
          console.log("===>" + newValue)
          // 重新set
          this.setIns();
          console.log("refresh")
          this.adsbyGooglePush();
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
