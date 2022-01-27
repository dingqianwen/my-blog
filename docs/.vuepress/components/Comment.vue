<template>
  <div class="gitalk-container" style="min-width:500px">
    <div id="gitalk-container" style="min-width: 500px"></div>
  </div>
</template>

<script>
import '../styles/gitalk.css'
import Gitalk from 'gitalk'
import md5 from 'blueimp-md5'

export default {
  name: 'Comment',
  mounted() {
    // alert(decodeURI(location.pathname))
    const commentConfig = {
      clientID: '5fed2d25f64a11c27c1b',
      clientSecret: 'd834f6f2dc273b8dd2aca71ebc159e0036b5c5ca',
      repo: 'my-blog', // 仓库地址
      owner: 'dingqianwen',
      admin: ['dingqianwen'],
      id: md5(location.pathname),
      distractionFreeMode: false,
      language: 'zh-CN',
    }
    const gitalk = new Gitalk(commentConfig);
    gitalk.render('gitalk-container');
  }
};
</script>
