<template>
    <div style="width: 100%;">
        <!--    <div style="display: flex;justify-content: space-between; align-items:center;">-->

        <!--    </div>-->
        <div style="display: flex;flex-wrap: wrap;justify-content: center;">
            <CPUMonitor :cpu="cpu"/>
            <MemoryMonitor :memory="memory"/>
            <DiskMonitor :transfer="disk.transfer"/>
        </div>
    </div>
</template>

<script>

    import CPUMonitor from "./CPUMonitor.vue"
    import MemoryMonitor from "./MemoryMonitor.vue"
    import DiskMonitor from "./DiskMonitor.vue"

    export default {
        name: 'System',
        data() {
            return {
                cpu: null,
                disk: {
                    transfer: null
                },
                memory: null,
                system: null,
                rate: 3000,
                timer: null,
            }
        },
        methods: {
            systemRefresh() {
                $api.system((data) => {
                    this.cpu = data.cpu;
                    this.memory = data.memory;
                    this.disk.transfer = data.disk.transfer;
                })
            }
        },
        components: {CPUMonitor, MemoryMonitor, DiskMonitor},
        mounted() {
            // 指针先拉到100%
            setTimeout(() => {
                this.systemRefresh();
            }, 300);
            // 轮询
            this.timer = window.setInterval(() => {
                setTimeout(() => {
                    this.systemRefresh();
                }, 0)
            }, this.rate);
        },
        // 卸载
        beforeUnmount() {
            clearInterval(this.timer);
        },
        destroyed() {
            clearInterval(this.timer);
        },
    }
</script>