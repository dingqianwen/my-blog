<template>
  <div>
    <span style="cursor: pointer">浏览量：{{ view_count }} </span> &nbsp;&nbsp;&nbsp;
    <span style="cursor: pointer">点赞量：{{ count }} </span> &nbsp;
    <span @click="test" style="cursor: pointer">👍</span>
  </div>
</template>

<script>


import md5 from "blueimp-md5";

export default {
  name: 'Praise',
  data() {
    return {
      count: 0,
      view_count: 234234,
    }
  },
  mounted() {
    // 浏览量+1;
    const url = `https://api.github.com/repos/dingqianwen/my-blog/issues?labels=Gitalk,${md5(location.pathname)}&t=${new Date().getTime()}`;
    let ajax;
    if (window.XMLHttpRequest) {
      ajax = new XMLHttpRequest();//非IE6
    } else {
      ajax = new ActiveXObject("Microsoft.XMLHTTP");//IE6
    }
    // 2.连接到服务器
    ajax.open('GET', url, true);
    // 3.发送请求
    ajax.send();
    // 4.接收返回值
    ajax.onreadystatechange = () => {
      // oAjax.readyState--浏览器和服务器之间进行到哪一步了
      if (ajax.readyState === 4) {  // 读取完成
        if (ajax.status === 200) {  // 读取的结果是成功
          let element = JSON.parse(ajax.responseText)[0];
          alert(`点赞量:${element.reactions["+1"]},踩量:${element.reactions["-1"]}`);

          this.count = element.reactions["+1"];
        } else {
          alert(ajax.responseText);
        }
      }
    }
  },
  methods: {
    test() {
      // md5(location.pathname)
      this.count++;
    }
  }
};
</script>
