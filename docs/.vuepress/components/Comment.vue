<template>
  <div class="gitalk-container">
    <div id="gitalk-container"></div>
  </div>
</template>

<script>
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'
import md5 from 'blueimp-md5'

export default {
  name: 'comment',
  mounted() {
    const commentConfig = {
      clientID: '',
      clientSecret: '',
      repo: 'my-blog', // 仓库地址
      owner: 'dingqianwen',
      admin: ['dingqianwen'],
      id: md5(location.pathname)
    }
    const gitalk = new Gitalk(commentConfig);
    gitalk.render('gitalk-container');
  }
};
</script>

