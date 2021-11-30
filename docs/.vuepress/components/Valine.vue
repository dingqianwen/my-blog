<template>
  <section style="border-top: 2px solid #eaecef;padding-top:1rem;margin-top:2rem;">
    <div>
      <!-- id 将作为查询条件 -->
      <span class="leancloud-visitors"
            data-flag-title="Your Article Title">
        <em class="post-meta-item-text">阅读量： </em>
        <i class="leancloud-visitors-count"></i>
      </span>
    </div>
    <h3>
      <a href="javascript:"></a>
      评 论：
    </h3>
    <div id="vcomments"></div>
  </section>
</template>

<style>
.v[data-class="v"] .vcards .vcard .vh .vmeta .vat {
  font-size: .8125em;
  color: #1abc9c;
  cursor: pointer;
  float: right;
}
</style>

<script>
export default {
  name: 'Valine',
  mounted: function () {
    // require window
    const Valine = require('valine');
    if (typeof window !== 'undefined') {
      document.getElementsByClassName('leancloud-visitors')[0].id
          = window.location.pathname
      this.window = window
      window.AV = require('leancloud-storage')
    }

    new Valine({
      el: '#vcomments',
      appId: 'vSFsBhMXTIQdIz8dRAIy5pEO-gzGzoHsz',// your appId
      appKey: 'T8CBYBBbo9PvyscDH3siozb5', // your appKey
      notify: false,
      verify: false,
      path: window.location.pathname,
      visitor: true,
      avatar: 'mp',
      recordIP: true,
      enableQQ: true,
      placeholder: '想说点什么吗？'
    });
  },
}
</script>

