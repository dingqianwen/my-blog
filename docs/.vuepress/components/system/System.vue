<template>
  <div style="width: 100%;">
    <!--    <div style="display: flex;justify-content: space-between; align-items:center;">-->

    <!--    </div>-->
    <div style="display: flex;flex-wrap: wrap;justify-content: center;">
      <CPUMonitor></CPUMonitor>
      <MemoryMonitor></MemoryMonitor>
      <DiskMonitor></DiskMonitor>
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
    return {}
  },
  components: {CPUMonitor, MemoryMonitor, DiskMonitor}
}

</script>