<template>
    <div id="DiskMonitor" style="height: 350px;width: 370px;">

    </div>
</template>

<script>

    import * as echarts from 'echarts';

    export default {
        name: 'DiskMonitor',
        data() {
            return {
                myChart: null
            }
        },
        props: ["transfer"],
        watch: {
            "transfer.percent"(nval) {
                this.myChart.setOption({
                    series: [
                        {
                            data: [
                                {
                                    value: nval
                                }
                            ]
                        }
                    ]
                });
            }
        },
        mounted() {
            const chartDom = document.getElementById('DiskMonitor');
            this.myChart = echarts.init(chartDom);
            const option = {
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
                        axisTick: {},
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
            option && this.myChart.setOption(option);
        }
    }

</script>