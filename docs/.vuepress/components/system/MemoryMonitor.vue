<template>
  <div id="MemoryMonitor" style="height: 370px;width: 370px">

  </div>
</template>

<script>

import * as echarts from 'echarts';

export default {
  name: 'MemoryMonitor',
  data() {
    return {}
  },
  mounted() {
    var chartDom = document.getElementById('MemoryMonitor');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      series: [
        {
          type: 'gauge',
          axisLine: {
            lineStyle: {
              width: 10,
              color: [
                [0.3, '#67e0e3'],
                [0.7, '#37a2da'],
                [1, '#fd666d']
              ]
            }
          },
          pointer: {
            itemStyle: {
              color: 'auto'
            }
          },
          axisTick: {
          },
          axisLabel: {
            color: 'auto',
            distance: 20,
            fontSize: 13
          },
          detail: {
            valueAnimation: true,
            formatter: '内存 {value} %',
            color: 'auto',
            fontSize: 18
          },
          data: [
            {
              value: 100
            }
          ]
        }
      ]
    };
    setInterval(function () {
      myChart.setOption({
        series: [
          {
            data: [
              {
                value: 25
              }
            ]
          }
        ]
      });
    }, 2000);
    option && myChart.setOption(option);





  }
}

</script>