import {defineClientAppEnhance, usePageData} from '@vuepress/client'
import md5 from "blueimp-md5";
import {getCount, count} from './components/api'

export default defineClientAppEnhance(({app, router, siteData}) => {
/*    router.beforeEach((to, from, next) => {
        next();
    })
    router.afterEach((to, from, next) => {
        // pv ++
        // let value = usePageData().value;
        // count(md5(value.path), value.path);
    })*/
})
