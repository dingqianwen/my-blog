import {defineClientConfig, usePageData} from '@vuepress/client';

import api from './components/api'

export default defineClientConfig({
    enhance({app, router}) {
        // 全局挂载api接口
        if (typeof window !== 'undefined') {
            window.$api = api;
            window.$httpRequestList = [];
            window.$router = router;
        }
    },
})
