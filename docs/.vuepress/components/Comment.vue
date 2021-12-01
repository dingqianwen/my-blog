<template>
  <div class="gitalk-container">
    <div id="gitalk-container"></div>
  </div>
</template>

<script>
import '../styles/gitalk.css'
import Gitalk from 'gitalk'

export default {
  name: 'comment',
  mounted() {
    // alert(decodeURI(location.pathname))
    const commentConfig = {
      clientID: '',
      clientSecret: '',
      repo: 'my-blog', // 仓库地址
      owner: 'dingqianwen',
      admin: ['dingqianwen'],
      id: decodeURI(location.pathname),
      distractionFreeMode: false,
      language: 'zh-CN',
  }
    const gitalk = new Gitalk(commentConfig);
    gitalk.render('gitalk-container');
  }
};
</script>
