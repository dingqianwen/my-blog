<template>
  <div>
    <br>
    <ins class="adsbygoogle"
         v-if="layout==='in-article'"
         style="display:block; text-align:center;width: 100%"
         data-ad-layout="in-article"
         data-ad-format="fluid"
         :data-ad-client="client"
         :data-ad-slot="slot"></ins>
    <ins class="adsbygoogle"
         v-else
         style="display:block;width: 100%"
         :data-ad-client="client"
         :data-ad-slot="slot"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
  </div>
</template>


<script>
export default {
  name: "AdsbyGoogle.vue",
  props: ["layout", "slot"],
  data() {
    return {
      client: 'ca-pub-6495628091556233'
    }
  },
  mounted() {
    if (typeof window !== 'undefined') {
      this.$nextTick(() => {
        try {
          // <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6495628091556233" crossorigin="anonymous"/>
          (adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.log("adsbygoogle error ：", e)
        }
      });
    }
  }
}
</script>

<style scoped>
</style>
