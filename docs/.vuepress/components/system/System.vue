<template>
    <div style="width: 100%;">
        <!--    <div style="display: flex;justify-content: space-between; align-items:center;">-->

        <!--    </div>-->
        <div style="display: flex;flex-wrap: wrap;justify-content: center;">
            <CPUMonitor :cpu="cpu"></CPUMonitor>
            <MemoryMonitor :memory="memory"></MemoryMonitor>
            <DiskMonitor :transfer="disk.transfer"></DiskMonitor>
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
            this.timer = window.setInterval(() => {
                setTimeout(() => {
                    this.systemRefresh();
                }, 0)
            }, 3000)
        }
    }
</script>