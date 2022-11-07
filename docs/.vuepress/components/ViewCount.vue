<template>
</template>

<script>
    import md5 from 'blueimp-md5'
    import {usePageData} from '@vuepress/client'

    export default {
        name: 'ViewCount',
        mounted() {
            let value = usePageData().value;
            // 访问量 如果不存在此标签，则进行创建
            if (!document.getElementsByClassName('browse—count')[0]) {
                let element = document.getElementsByClassName('page-meta')[0];
                let newElement = document.createElement('div');
                newElement.className = 'meta-item contributors browse—count';
                $api.pvIncr(md5(value.path), function (data) {
                    newElement.innerHTML = `<span class="meta-item-label">浏览: </span><span class="meta-item-info">${data.toLocaleString('en-US')}</span>`;
                    element.appendChild(newElement)
                })
            }
        }
    };
</script>
