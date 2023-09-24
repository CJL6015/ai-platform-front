<template>
  <div class="grid md:grid-cols-3 gap-4">
    <div ref="chartRef1" class="border border-gray-400" :style="{ height, width }"></div>
    <div ref="chartRef2" class="border border-gray-400" :style="{ height, width }"></div>
    <div ref="chartRef3" class="border border-gray-400" :style="{ height, width }"></div>
  </div>
  <Alert style="margin-top: 10px" type="info" show-icon closable>
    <template #message
      ><span style="font-size: 20px; font-weight: bold"
        >{{ plantName }}{{ lineName
        }}<span style="color: red; font-size: 22px">{{ thresholdExceeded }}%</span
        >测点出现过超限,超限时间占运行时间的<span style="color: red; font-size: 22px"
          >{{ thresholdExceeded }}%</span
        ></span
      ></template
    ></Alert
  >
</template>
<script lang="ts">
  import { defineComponent, PropType, ref, Ref, watch, toRaw } from 'vue';
  import dayjs from 'dayjs';
  import { Alert } from 'ant-design-vue';

  import { useECharts } from '/@/hooks/web/useECharts';
  import { getStatistic } from '/@/api/warn/statistic';

  export default defineComponent({
    components: {
      Alert,
    },
    props: {
      selectData: {
        type: Object as PropType<Object>,
      },
      width: {
        type: String as PropType<string>,
        default: '100%',
      },
      height: {
        type: String as PropType<string>,
        default: '250px',
      },
    },
    setup(props, _) {
      const chartRef1 = ref<HTMLDivElement | null>(null);
      const chartRef2 = ref<HTMLDivElement | null>(null);
      const chartRef3 = ref<HTMLDivElement | null>(null);
      const { setOptions: setOptions1 } = useECharts(chartRef1 as Ref<HTMLDivElement>);
      const { setOptions: setOptions2 } = useECharts(chartRef2 as Ref<HTMLDivElement>);
      const { setOptions: setOptions3 } = useECharts(chartRef3 as Ref<HTMLDivElement>);
      const plantName = ref(null);
      const lineName = ref(null);
      const thresholdExceeded = ref<string | null>(null);
      const stopTime = ref<string | null>(null);
      watch(props, async (newData, _) => {
        const data = toRaw(newData.selectData);
        if (data && data['line'] && data['line'] > 0) {
          console.log(data['line']);
          const time = toRaw(data['time']);
          const params = {
            st: dayjs(time[0]).format('YYYY-MM-DD HH:mm:ss'),
            et: dayjs(time[1]).format('YYYY-MM-DD HH:mm:ss'),
          };
          const chartValue = await getStatistic(data['line'], params);
          plantName.value = data['plantName'];
          lineName.value = data['lineName'];
          thresholdExceeded.value = (
            (chartValue.thresholdExceeded /
              (chartValue.thresholdExceeded + chartValue.thresholdWithin)) *
            100
          ).toFixed(2);
          stopTime.value = (
            (chartValue.stopTime / (chartValue.runTime + chartValue.stopTime)) *
            100
          ).toFixed(2);
          drawChart(chartValue);
        }
      });

      const drawChart = (chartValue) => {
        setOptions1(
          {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)',
            },
            legend: {
              top: 'bottom',
              data: ['超限测点数', '正常测点数'],
            },
            series: [
              {
                name: '本月超限比',
                type: 'pie',
                radius: [0, 100],
                center: ['50%', '50%'],
                label: {
                  show: false,
                },
                data: [
                  { value: chartValue.thresholdExceeded, name: '超限测点数' },
                  { value: chartValue.thresholdWithin, name: '正常测点数' },
                ],
              },
            ],
          },
          true,
        );

        setOptions2(
          {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)',
            },
            legend: {
              top: 'bottom',
              data: ['停机时间', '运行时间'],
            },
            series: [
              {
                name: '本月停机比',
                type: 'pie',
                radius: [0, 100],
                center: ['50%', '50%'],
                data: [
                  { value: chartValue.stopTime, name: '停机时间' },
                  { value: chartValue.runTime, name: '运行时间' },
                ],
                label: {
                  show: false,
                },
              },
            ],
          },
          true,
        );

        setOptions3(
          {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)',
            },
            legend: {
              top: 'bottom',
              data: ['刷新异常数', '正常测点数'],
            },
            series: [
              {
                name: '本月刷新异常比',
                type: 'pie',
                radius: [0, 100],
                center: ['50%', '50%'],
                data: [
                  { value: chartValue.exceptionRefresh, name: '刷新异常数' },
                  { value: chartValue.normalRefresh, name: '正常测点数' },
                ],
                label: {
                  show: false,
                },
              },
            ],
          },
          true,
        );
      };

      return { chartRef1, chartRef2, chartRef3, plantName, lineName, thresholdExceeded, stopTime };
    },
  });
</script>
