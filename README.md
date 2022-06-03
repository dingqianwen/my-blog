# 关于博客

本站用来记录自己日常等，非商业化站点，无盈利性质，为博主个人博客，任何打赏均捐出公益事业。  

本站地址：[https://apidocs.cn](https://apidocs.cn)

### 如何部署

NodeJS Version：`v16.15.0`

后端服务

```shell
nohup python -u mb-server.py &
```

Nginx配置为

```text
location /blog {
        alias  html/blog/;
        index index.html;
}
location /bs {
        proxy_pass http://localhost:8011;
        proxy_set_header X-Real-IP $remote_addr;
}
error_page  404  https://dingqw.com/blog/404.html;
```

