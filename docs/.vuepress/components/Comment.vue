<template>
  <div class="gitalk-container">

<!--      <a title="Like" style="cursor: pointer">-->
<!--          <span class="gt-ico gt-ico-heart">-->
<!--            <span class="gt-svg">-->
<!--              <svg t="1512463363724" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"-->
<!--                   xmlns:xlink="http://www.w3.org/1999/xlink">-->
<!--            <path-->
<!--                d="M527.061333 166.528A277.333333 277.333333 0 0 1 1000.618667 362.666667a277.333333 277.333333 0 0 1-81.28 196.138666l-377.173334 377.173334a42.666667 42.666667 0 0 1-60.330666 0l-377.173334-377.173334a277.376 277.376 0 0 1 392.277334-392.277333l15.061333 15.061333 15.061333-15.061333z"></path>-->
<!--              </svg>-->
<!--            </span>-->
<!--            <span class="gt-ico-text">2</span>-->
<!--          </span>-->
<!--      </a>-->

    <div id="gitalk-container">
    </div>

  </div>
</template>

<script>
import '../styles/gitalk.css'
import Gitalk from 'gitalk'
import md5 from 'blueimp-md5'

let security = require("./security.js");
let gitalkKey = security.gitalkKey;

export default {
  name: 'Comment',
  mounted() {
    console.log()
    // alert(decodeURI(location.pathname))
    const commentConfig = {
      clientID: gitalkKey.clientID,
      clientSecret: gitalkKey.clientSecret,
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
