<template>
  <div id="CPUMonitor" style="height: 350px;width: 370px">

  </div>
</template>

<script>

import * as echarts from 'echarts';

export default {
  name: 'CPUMonitor',
  data() {
    return {}
  },
  mounted() {
    var chartDom = document.getElementById('CPUMonitor');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
/*      title: {
        text: 'CPU占用率',
        subtext: '2核心4线程',
        textStyle: {
        },
        subtextStyle:{},
        // left: 'center'
      },*/
      series: [
        {
          type: 'gauge',
          // center: ['50%', '60%'],
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
            formatter: 'CPU {value} %',
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
                value: 90
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