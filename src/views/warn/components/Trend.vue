<template>
  <div></div>
</template>

<script lang="ts">
  import { ref, Ref, PropType, onMounted, toRaw } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { pointTrendApi } from '/@/api/warn/point';

  export default {
    components: {},
    props: {
      width: {
        type: String as PropType<string>,
        default: '100%',
      },
      height: {
        type: String as PropType<string>,
        default: '250px',
      },
      point: {
        type: String as PropType<string>,
        default: '1',
      },
    },
    setup() {
      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

      const setChart = (chartValue) => {
        setOptions({
          title: {
            text: 'Beijing AQI',
            left: '1%',
          },
          tooltip: {
            trigger: 'axis',
          },
          grid: {
            left: '5%',
            right: '15%',
            bottom: '10%',
          },
          xAxis: {
            data: chartValue.xData,
          },
          yAxis: {},
          toolbox: {
            right: 10,
            feature: {
              dataZoom: {
                yAxisIndex: 'none',
              },
              restore: {},
              saveAsImage: {},
            },
          },
          dataZoom: [
            {
              startValue: '2014-06-01',
            },
            {
              type: 'inside',
            },
          ],
          visualMap: {
            top: 50,
            right: 10,
            pieces: [
              {
                gt: 0.9 * Math.min(chartValue.lowerLowerLimit, chartValue.value.min),
                lte: chartValue.lowerLowerLimit,
                color: '#FD0100',
              },
              {
                gt: chartValue.lowerLowerLimit,
                lte: chartValue.lowerLimit,
                color: '#FBDB0F',
              },
              {
                gt: chartValue.lowerLimit,
                lte: chartValue.upperLimit,
                color: '#93CE07',
              },
              {
                gt: chartValue.upperLimit,
                lte: chartValue.upperUpperLimit,
                color: '#AA069F',
              },
              {
                gt: chartValue.upperUpperLimit,
                color: '#AC3B2A',
              },
            ],
            outOfRange: {
              color: '#999',
            },
          },
          series: {
            name: chartValue.name,
            type: 'line',
            data: chartValue.value,
            markLine: {
              silent: true,
              lineStyle: {
                color: '#333',
              },
              data: [
                {
                  yAxis: chartValue.lowerLowerLimit,
                },
                {
                  yAxis: chartValue.lowerLimit,
                },
                {
                  yAxis: chartValue.upperLimit,
                },
                {
                  yAxis: chartValue.upperUpperLimit,
                },
              ],
            },
          },
        });
      };
      return {};
    },
  };
</script>
