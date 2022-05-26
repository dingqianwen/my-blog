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
  mounted() {
    // 修复第一次进入页面获取location.pathname 不准确问题
    // /blog/message/MessageBoard.html
    let value = usePageData().value;
    // alert(decodeURI(location.pathname))
    const commentConfig = {
      clientID: '5fed2d25f64a11c27c1b',
      //clientSecret: '',
      repo: 'my-blog', // 仓库地址
      owner: 'dingqianwen',
      admin: ['dingqianwen'],
      id: md5('/blog' + value.path),
      distractionFreeMode: false,
      language: 'zh-CN',
      pagerDirection: "last",
      // @default "https://cors-anywhere.azm.workers.dev/https://github.com/login/oauth/access_token"
      proxy: 'https://dingqw.com/bs/get_access_token'
    }
    const gitalk = new Gitalk(commentConfig);
    gitalk.render('gitalk-container');

    // 访问量 如果不存在此标签，则进行创建
    if (!document.getElementsByClassName('browse—count')[0]) {
      let element = document.getElementsByClassName('page-meta')[0];
      let newElement = document.createElement('div');
      newElement.className = 'meta-item contributors browse—count';
      pvIncr(md5(value.path), function (data) {
        newElement.innerHTML = `<span class="meta-item-label">浏览: </span><span class="meta-item-info">${data.toLocaleString('en-US')}</span>`;
        element.appendChild(newElement)
      })
    }
    // 如果点赞，先判断有没有登录
    let $gc = $('#gitalk-container');
    $gc.on('click', '.gt-comment-like', function () {
      if (!localStorage.getItem('GT_ACCESS_TOKEN')) {
        $warning("亲，你还没有登录哦~");
        return false;
      }
      return true;
    })

    // 预览页面提交评论后的bug
    $gc.on('click', '.gt-header-controls .gt-btn-public', function () {
      let $gt = $('.gt-header-textarea');
      let hasClass = $gt.hasClass('hide');
      if (hasClass) {
        $gt.css('height', '72px');
      }
    })
    // handleCommentPreview bug 点击编辑时也会调用预览接口
    /*if(!_this.state.isPreview){
      return;
    }*/
  }
};
</script>
