<template>
  <BasicModal @register="register" title="历史趋势" width="1200px">
    <a-form>
      <a-form-item label="历史时间" name="time">
        <a-range-picker v-model:value="historyTime" show-time @change="historyTimeChange" />
      </a-form-item>
    </a-form>
    <div ref="chartRef" style="width: 100%; height: 600px"></div>
  </BasicModal>
</template>

<script lang="ts">
  import { ref, Ref } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { pointTrendApi } from '/@/api/warn/point';
  import dayjs from 'dayjs';
  import { Form, RangePicker } from 'ant-design-vue';

  export default {
    components: { BasicModal, ARangePicker: RangePicker, AFormItem: Form.Item, AForm: Form },
    props: {
      point: { type: Object },
    },
    setup() {
      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions, resize } = useECharts(chartRef as Ref<HTMLDivElement>);

      const fetchChartData = (chartValue) => {
        let pieces: any[] = [];
        let markLineData: any[] = [];
        let minValue = Math.min(...chartValue.value);
        minValue -= 0.1 * Math.abs(minValue);
        console.log(minValue);
        if (chartValue.lowerLowerLimit) {
          pieces.push({
            gt: Math.min(chartValue.lowerLowerLimit, minValue),
            lte: chartValue.lowerLowerLimit,
            color: '#FC7D02',
          });
          markLineData.push({
            label: {
              show: true,
              position: 'end',
              formatter: '低低限: {c}',
            },
            yAxis: chartValue.lowerLowerLimit,
          });
        }
        if (chartValue.lowerLimit) {
          pieces.push({
            gt: pieces.length > 0 ? pieces[pieces.length - 1].lte : minValue,
            lte: chartValue.lowerLimit,
            color: '#FBDB0F',
          });
          markLineData.push({
            label: {
              show: true,
              position: 'end',
              formatter: '低限: {c}',
            },
            yAxis: chartValue.lowerLimit,
          });
        }
        if (chartValue.upperLimit) {
          pieces.push({
            gt: pieces.length > 0 ? pieces[pieces.length - 1].lte : minValue,
            lte: chartValue.upperLimit,
            color: '#93CE07',
          });
          markLineData.push({
            label: {
              show: true,
              position: 'end',
              formatter: '高限: {c}',
            },
            yAxis: chartValue.upperLimit,
          });
        }
        if (chartValue.upperUpperLimit) {
          pieces.push({
            gt: pieces.length > 0 ? pieces[pieces.length - 1].lte : minValue,
            lte: chartValue.upperUpperLimit,
            color: '#AA069F',
          });
          markLineData.push({
            label: {
              show: true,
              position: 'end',
              formatter: '高高限: {c}',
            },
            yAxis: chartValue.upperUpperLimit,
          });
        }
        if (pieces.length > 0) {
          pieces.push({
            gt: pieces[pieces.length - 1].lte,
            color: '#AC3B2A',
          });
        }

        return {
          title: {
            text: chartValue.name,
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
            data: chartValue.times,
          },
          yAxis: {},
          dataZoom: [{}],
          visualMap: {
            top: 300,
            right: 10,
            precision: 2,
            pieces: pieces,
            outOfRange: {
              color: '#999',
            },
          },
          series: {
            name: chartValue.name,
            type: 'line',
            data: chartValue.value,
            markLine: {
              silent: false,
              lineStyle: {
                color: '#333',
              },
              data: markLineData,
            },
          },
        };
      };
      const pointData = ref({
        name: '',
      });

      type RangeValue = [dayjs.Dayjs, dayjs.Dayjs];

      const currentDate: dayjs.Dayjs = dayjs();
      const lastMonthDate: dayjs.Dayjs = currentDate.subtract(1, 'month');
      const rangeValue: RangeValue = [lastMonthDate, currentDate];
      const historyTime = ref<RangeValue>(rangeValue);
      async function onDataReceive(data) {
        resize();
        pointData.value = data;
        const point = data.name;
        const time = {
          st: rangeValue[0].valueOf(),
          et: rangeValue[1].valueOf(),
        };
        const value = await pointTrendApi(point, time);
        console.log(value);
        const chartData = fetchChartData(value);
        console.log(chartData);
        setOptions(chartData, true);
      }

      const historyTimeChange = async () => {
        const point = pointData.value.name;
        const [startDate, endDate] = historyTime.value;
        const time = {
          st: startDate.valueOf(),
          et: endDate.valueOf(),
        };
        const value = await pointTrendApi(point, time);
        console.log(value);
        const chartData = fetchChartData(value);
        console.log(chartData);
        setOptions(chartData, true);
      };

      const [register] = useModalInner((data) => {
        data && onDataReceive(data);
      });
      return {
        register,
        rangeValue,
        chartRef,
        historyTimeChange,
        historyTime,
      };
    },
  };
</script>
