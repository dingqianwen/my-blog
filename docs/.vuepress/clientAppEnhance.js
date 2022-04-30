import {defineClientAppEnhance, usePageData} from '@vuepress/client';

export default defineClientAppEnhance(({app, router, siteData}) => {
    router.beforeEach((to, from, next) => {
        next();
    })
    router.afterEach((to, from, next) => {
    })
})
