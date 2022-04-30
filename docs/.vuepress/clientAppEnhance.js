import {defineClientAppEnhance, usePageData} from '@vuepress/client'
import md5 from "blueimp-md5";
import {pvIncr} from './components/api'

export default defineClientAppEnhance(({app, router, siteData}) => {
    try {
        // 解决当项目构建时，会触发走此处逻辑， 方案就是在构建时document 是不存在的，抛出异常
        document.location;

        router.beforeEach((to, from, next) => {
            next();
        })
        router.afterEach((to, from, next) => {
            // pv ++
            let value = usePageData().value;
            let id = md5(value.path);
            pvIncr(id, function (data) {
                // console.log(`当前页面:${value.title},访问量:${data}`)
            })
        })
    } catch (e) {
        // 忽略
    }
})
