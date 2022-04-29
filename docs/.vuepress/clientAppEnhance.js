import {defineClientAppEnhance, usePageData} from '@vuepress/client'
import md5 from "blueimp-md5";
import {pv, getPv} from './components/api'

export default defineClientAppEnhance(({app, router, siteData}) => {
    router.beforeEach((to, from, next) => {
        next();
    })
    router.afterEach((to, from, next) => {
        // pv ++
        let value = usePageData().value;
        let id = md5(value.path);
        pv(id);
        getPv(id, function (data) {
            console.log(`当前页面:${value.title},访问量:${data}`)
        })
    })
})
