<template>
  <PageWrapper title="定员超限多维对标分析">
    <a-card>
      <UnitSelect @option-selected="handleOptionSelected" />
      <a-divider />
      <div class="grid md:grid-cols-3 gap-4">
        <div
          ref="chartRef1"
          class="border border-gray-400"
          style="height: 380px; widows: 100%"
        ></div>
        <div
          ref="chartRef2"
          class="border border-gray-400"
          style="height: 380px; widows: 100%"
        ></div>
        <div
          ref="chartRef3"
          class="border border-gray-400"
          style="height: 380px; widows: 100%"
        ></div>
        <div
          ref="chartRef4"
          class="border border-gray-400"
          style="height: 380px; widows: 100%"
        ></div>
        <div
          ref="chartRef5"
          class="border border-gray-400"
          style="height: 380px; widows: 100%"
        ></div>
        <div
          ref="chartRef6"
          class="border border-gray-400"
          style="height: 380px; widows: 100%"
        ></div>
        <div>
          <Alert style="width: 100%; height: 220px" type="info">
            <template #message
              ><div style="width: 100%; height: 220px; overflow-y: scroll"
                ><span style="font-size: 18px; font-weight: bold"
                  >超限走势分析结论:<br />
                  <span v-for="summary in trendSummary" :key="summary['key']">
                    {{ summary['key'] }}.{{ summary['name'] }}定员超限整体呈现<span
                      style="color: red; font-size: 22px"
                      >{{ summary['trend'] }}</span
                    ><br /></span></span></div></template
          ></Alert>
        </div>
        <div>
          <Alert style="width: 100%; height: 220px" type="info">
            <template #message
              ><span style="font-size: 18px; font-weight: bold"
                >超限高峰时间和工序位置分析结论:<br />
                1.定员超限占比最高的工序为<span style="color: red; font-size: 22px">{{
                  process
                }}</span
                >,有提升的空间<br />
                2.定员超限最高发的时间为<span style="color: red; font-size: 22px">{{
                  maxHour
                }}</span
                >,可加强该时段的监控<br /></span></template
          ></Alert>
        </div>
        <div>
          <Alert style="width: 100%; height: 220px" type="info">
            <template #message
              ><span style="font-size: 18px; font-weight: bold"
                >超限峰值分析结论:<br />
                1.定员超限单日最高为<span style="color: red; font-size: 22px">{{ maxCount }}次</span
                >,于<span style="color: red; font-size: 22px">{{ maxTime }}</span
                >发生<br />
                2.{{ names }}定员超限分别为<span style="color: red; font-size: 22px">{{
                  peopleCounts
                }}</span
                ><br /></span></template
          ></Alert>
        </div>
      </div>
    </a-card>
  </PageWrapper>
</template>
<script lang="ts">
  import { useECharts } from '/@/hooks/web/useECharts';
  import dayjs, { Dayjs } from 'dayjs';
  import { PageWrapper } from '/@/components/Page';
  import { computed, ref, watch, Ref, onMounted } from 'vue';
  import { Form, FormItem, RangePicker, Divider, Card, Alert } from 'ant-design-vue';
  import UnitSelect from '../../warn/components/UnitSelect.vue';
  import { getBenchmarkDetection, getBenchmarkDetectionTrend } from '/@/api/data/benchmark';

  export default {
    components: {
      PageWrapper,
      ACard: Card,
      ADivider: Divider,
      Alert,
      UnitSelect,
    },
    setup() {
      type RangeValue = [Dayjs, Dayjs];
      const value = ref<RangeValue>();
      const historyTime = ref<RangeValue>();
      const currentDate: Dayjs = dayjs();
      const lastMonthDate: Dayjs = currentDate.subtract(1, 'month');
      const rangeValue: RangeValue = [lastMonthDate, currentDate];
      historyTime.value = rangeValue;

      const chartRef1 = ref<HTMLDivElement | null>(null);
      const chartRef2 = ref<HTMLDivElement | null>(null);
      const chartRef3 = ref<HTMLDivElement | null>(null);
      const chartRef4 = ref<HTMLDivElement | null>(null);
      const chartRef5 = ref<HTMLDivElement | null>(null);
      const chartRef6 = ref<HTMLDivElement | null>(null);
      const { setOptions: setOptions1 } = useECharts(chartRef1 as Ref<HTMLDivElement>);
      const { setOptions: setOptions2 } = useECharts(chartRef2 as Ref<HTMLDivElement>);
      const { setOptions: setOptions3 } = useECharts(chartRef3 as Ref<HTMLDivElement>);
      const { setOptions: setOptions4 } = useECharts(chartRef4 as Ref<HTMLDivElement>);
      const { setOptions: setOptions5 } = useECharts(chartRef5 as Ref<HTMLDivElement>);
      const { setOptions: setOptions6 } = useECharts(chartRef6 as Ref<HTMLDivElement>);

      const line = ref(1);
      const names = ref('');
      const process = ref('');

      const handleOptionSelected = (values) => {
        console.log(values);
        historyTime.value = values.time;
        line.value = values.line;
        setChart1();
        setTotal();
      };

      const maxCount = ref(0);
      const maxTime = ref('');
      const maxHour = ref('');
      const peopleCounts = ref('');
      const trendSummary = ref([]);

      const setTotal = async () => {
        const [startDate, endDate] = historyTime.value;
        const startDateDate = startDate.toDate();
        const endDateDate = endDate.toDate();
        const time = {
          st: dayjs(startDateDate).format('YYYY-MM-DD HH:mm:ss'),
          et: dayjs(endDateDate).format('YYYY-MM-DD HH:mm:ss'),
        };
        const trendData = await getBenchmarkDetectionTrend(line.value, time);
        console.log(trendData);

        let index = 0;
        let max = trendData.trend[0][1];
        for (let i = 0; i < trendData.trend.length; i++) {
          if (trendData.trend[i][1] > max) {
            max = trendData.trend[i][1];
            index = i;
          }
        }
        maxCount.value = trendData.trend[index][1];
        maxTime.value = trendData.trend[index][0];

        setOptions4({
          title: {
            text: '生产线超员总次数',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985',
              },
            },
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
            },
          ],
          yAxis: [
            {
              type: 'value',
            },
          ],
          series: [
            {
              name: 'Email',
              type: 'line',
              emphasis: {
                focus: 'series',
              },
              markPoint: {
                data: [
                  { type: 'max', name: 'Max' },
                  { type: 'min', name: 'Min' },
                ],
              },
              markLine: {
                data: [{ type: 'average', name: 'Avg' }],
                label: {
                  show: true,
                  position: 'middle',
                  formatter: '平均超限次数: {c}',
                },
              },
              data: trendData.trend,
            },
          ],
        });

        const hoursArray = Array.from(
          { length: 24 },
          (_, index) => index.toString().padStart(2, '0') + '时',
        );
        const hourIndex = trendData.hours.indexOf(Math.max(...trendData.hours));
        maxHour.value = `${hourIndex.toString().padStart(2, '0')}:00-${(hourIndex + 1)
          .toString()
          .padStart(2, '0')}:00`;
        setOptions5({
          title: {
            text: '超限时段统计',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              data: hoursArray,
              axisTick: {
                alignWithLabel: true,
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
            },
          ],
          series: [
            {
              name: 'Direct',
              type: 'bar',
              barWidth: '60%',
              data: trendData.hours,
            },
          ],
        });
      };

      async function setChart1() {
        const [startDate, endDate] = historyTime.value;
        const startDateDate = startDate.toDate();
        const endDateDate = endDate.toDate();
        const time = {
          st: dayjs(startDateDate).format('YYYY-MM-DD HH:mm:ss'),
          et: dayjs(endDateDate).format('YYYY-MM-DD HH:mm:ss'),
        };
        const data = await getBenchmarkDetection(line.value, time);
        let trendSeries: any[] = [];
        let summary: any = [];
        names.value = data.names.join(',');
        for (let i = 0; i < data.values.length; i++) {
          trendSeries.push({
            name: data.names[i],
            type: 'line',
            data: data.values[i],
          });
          summary.push({
            key: i + 1,
            name: data.names[i],
            trend: data.trend[i],
          });
        }
        trendSummary.value = summary;
        setOptions1({
          title: {
            text: '各道工序超限趋势',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            type: 'scroll',
            left: 400,
            right: 30,
            top: 0,
            bottom: 20,
            data: data.names,
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
          },
          yAxis: {
            type: 'value',
          },
          series: trendSeries,
        });

        let option2Data: any[] = [];
        process.value = data.names[data.counts.indexOf(Math.max(...data.counts))];
        for (let i = 0; i < data.counts.length; i++) {
          option2Data.push({ value: data.counts[i], name: data.names[i] });
        }
        peopleCounts.value = data.counts.join('次、') + '次';
        setOptions2({
          title: {
            text: '超限份额统计',
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          series: [
            {
              name: '超限份额统计',
              type: 'pie',
              radius: [0, 140],
              center: ['50%', '50%'],
              data: option2Data,
              label: {
                show: true,
              },
            },
          ],
        });

        let option3Max = Math.max(...data.countMax);
        let option3Data: any[] = [];
        for (let i = 0; i < data.countMax.length; i++) {
          option3Data.push({
            name: data.names[i] + `  (${data.countMax[i]})`,
            max: option3Max,
          });
        }
        setOptions3({
          title: {
            text: '工序超员峰值统计',
          },
          tooltip: {
            trigger: 'item',
          },
          radar: {
            // shape: 'circle',
            indicator: option3Data,
          },
          series: [
            {
              type: 'radar',
              data: [
                {
                  value: data.countMax,
                  name: '设备超限峰值统计',
                  areaStyle: {
                    color: 'rgba(255, 145, 124, 0.9)',
                  },
                  lineStyle: {
                    type: 'dashed',
                  },
                },
              ],
            },
          ],
        });

        let option4Data: any[] = [];
        let option4Max = Math.max(...data.peopleMax);
        for (let i = 0; i < data.peopleMax.length; i++) {
          option4Data.push({
            name: data.peopleMax[i] + `  (${data.peopleMax[i]})`,
            max: option4Max,
          });
        }

        setOptions6({
          title: {
            text: '超员人数峰值统计',
          },
          radar: {
            indicator: option4Data,
            axisName: {
              formatter: '{value}',
              color: '#428BD4',
            },
          },
          series: [
            {
              name: 'Budget vs spending',
              type: 'radar',
              data: [
                {
                  value: data.peopleMax,
                  name: 'Allocated Budget',
                },
              ],
            },
          ],
        });
      }
      return {
        historyTime,
        chartRef1,
        chartRef2,
        chartRef3,
        chartRef4,
        chartRef5,
        chartRef6,
        handleOptionSelected,
        maxTime,
        maxCount,
        maxHour,
        peopleCounts,
        trendSummary,
        names,
        process,
      };
    },
  };
</script>
<style scoped>
  .grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
  }
</style>
