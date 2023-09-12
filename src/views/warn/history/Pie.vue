<template>
  <div class="grid md:grid-cols-3 gap-4">
    <div ref="chartRef1" class="border border-gray-400" :style="{ height, width }"></div>
    <div ref="chartRef2" class="border border-gray-400" :style="{ height, width }"></div>
    <div ref="chartRef3" class="border border-gray-400" :style="{ height, width }"></div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType, ref, Ref, onMounted } from 'vue';

  import { useECharts } from '/@/hooks/web/useECharts';

  export default defineComponent({
    props: {
      line: {
        type: Number as PropType<number> | null,
        default: -1,
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
    setup() {
      const chartRef1 = ref<HTMLDivElement | null>(null);
      const chartRef2 = ref<HTMLDivElement | null>(null);
      const chartRef3 = ref<HTMLDivElement | null>(null);
      const { setOptions: setOptions1 } = useECharts(chartRef1 as Ref<HTMLDivElement>);
      const { setOptions: setOptions2 } = useECharts(chartRef2 as Ref<HTMLDivElement>);
      const { setOptions: setOptions3 } = useECharts(chartRef3 as Ref<HTMLDivElement>);
      onMounted(() => {
        setOptions1({
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
                { value: 40, name: '超限测点数' },
                { value: 33, name: '正常测点数' },
              ],
            },
          ],
        });
      });
      onMounted(() => {
        setOptions2({
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
                { value: 30, name: '停机时间' },
                { value: 28, name: '运行时间' },
              ],
              label: {
                show: false,
              },
            },
          ],
        });
      });
      onMounted(() => {
        setOptions3({
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
                { value: 30, name: '刷新异常数' },
                { value: 28, name: '正常测点数' },
              ],
              label: {
                show: false,
              },
            },
          ],
        });
      });
      return { chartRef1, chartRef2, chartRef3 };
    },
  });
</script>
