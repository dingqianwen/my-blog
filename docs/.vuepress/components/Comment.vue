<template>
  <div class="gitalk-container">

    <div id="gitalk-container">
    </div>

  </div>
</template>

<script>
import '../styles/gitalk.css'
import Gitalk from 'gitalk'
import md5 from 'blueimp-md5'
import {getPv, pvIncr} from './api'
import {usePageData} from '@vuepress/client'

export default {
  name: 'Comment',
  mounted: function () {
    // alert(decodeURI(location.pathname))
    const commentConfig = {
      clientID: '***',
      clientSecret: '***',
      repo: 'my-blog', // 仓库地址
      owner: 'dingqianwen',
      admin: ['dingqianwen'],
      id: md5(location.pathname),
      distractionFreeMode: false,
      language: 'zh-CN',
      pagerDirection: "last"
    }
    const gitalk = new Gitalk(commentConfig);
    gitalk.render('gitalk-container');

    // 访问量
    let element = document.getElementsByClassName('page-meta')[0];
    let spanElement = document.createElement('div');
    spanElement.className = 'meta-item contributors';
    let value = usePageData().value;
    pvIncr(md5(value.path), function (data) {
      spanElement.innerHTML = `<span class="meta-item-label">浏览: </span><span class="meta-item-info">${data.toLocaleString('en-US')}</span>`;
      element.appendChild(spanElement)
    })

    // 如果点赞，先判断有没有登录
    $("#gitalk-container").bind("DOMNodeInserted", function () {
      $(".gt-comment-like").click(function () {
        if (!localStorage.getItem('GT_ACCESS_TOKEN')) {
          $warning("亲，你还没有登录哦！");
          return false;
        }
        return true;
      })
    });

  }
};
</script>
