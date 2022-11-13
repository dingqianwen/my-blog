<template>
  <div id="DiskMonitor" style="height: 350px;width: 370px;">

  </div>
</template>

<script>

import * as echarts from 'echarts';

export default {
  name: 'DiskMonitor',
  data() {
    return {}
  },
  mounted() {
    var chartDom = document.getElementById('DiskMonitor');
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
            formatter: '文件 {value}%',
            color: 'auto',
            fontSize: 16
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
                value: 65
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