<template>
  <PageWrapper title="参数超限多维对标分析">
    <a-card>
      <UnitSelect @option-selected="handleOptionSelected" />
      <a-divider />
      <div class="grid md:grid-cols-3 gap-4">
        <div
          ref="chartRef1"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
        <div
          ref="chartRef2"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
        <div
          ref="chartRef3"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
        <div>
          <Alert style="width: 100%; height: 120px" type="info">
            <template #message>
              <div style="width: 100%; height: 120px; overflow-y: scroll">
                <span style="font-size: 18px; font-weight: bold"
                  >{{ indexName }}走势分析结论:<br />
                  <span v-for="summary in trendSummary" :key="summary['key']">
                    {{ summary['key'] }}.{{ summary['name'] }}{{ indexName }}整体呈现<span
                      style="color: red; font-size: 22px"
                      >{{ summary['trend'] }}</span
                    ><br /></span
                ></span>
              </div> </template
          ></Alert>
        </div>
        <div>
          <Alert style="width: 100%; height: 120px" type="info">
            <template #message
              ><span style="font-size: 18px; font-weight: bold"
                >{{ indexName }}设备位置分析结论:<br />
                {{ indexName }}占比最高的工序为<span style="color: red; font-size: 22px">{{
                  equipment
                }}</span
                >,有提升的空间</span
              ></template
            ></Alert
          >
        </div>
        <div>
          <Alert style="width: 100%; height: 120px" type="info">
            <template #message>
              <div style="width: 100%; height: 120px; overflow-y: scroll"
                ><span style="font-size: 18px; font-weight: bold"
                  >{{ indexName }}峰值分析结论:<br />
                  1.{{ indexName }}单日最高为<span style="color: red; font-size: 22px"
                    >{{ maxCount }}次</span
                  >,于<span style="color: red; font-size: 22px">{{ maxTime }}</span
                  >发生<br />
                  2.{{ names }}峰值{{ indexName }}分别为<span style="color: red; font-size: 22px">{{
                    equipmentCounts
                  }}</span
                  ><br /></span></div></template
          ></Alert>
        </div>
        <div
          ref="chartRef4"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
        <div
          ref="chartRef5"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
        <div
          ref="chartRef6"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
        <div>
          <Alert style="width: 100%; height: 120px" type="info">
            <template #message>
              <div style="width: 100%; height: 120px; overflow-y: scroll">
                <span style="font-size: 18px; font-weight: bold"
                  >{{ indexName }}走势分析结论:<br />
                  <span v-for="summary in trendSummary" :key="summary['key']">
                    {{ summary['key'] }}.{{ summary['name'] }}{{ indexName }}整体呈现<span
                      style="color: red; font-size: 22px"
                      >{{ summary['trend'] }}</span
                    ><br /></span
                ></span>
              </div> </template
          ></Alert>
        </div>
        <div>
          <Alert style="width: 100%; height: 120px" type="info">
            <template #message
              ><span style="font-size: 18px; font-weight: bold"
                >{{ indexName }}高峰时间分析结论:<br />
                {{ indexName }}最高发的时间为<span style="color: red; font-size: 22px">{{
                  maxHour
                }}</span
                >,可加强该时段的监控<br /></span></template
          ></Alert>
        </div>
        <div>
          <Alert style="width: 100%; height: 120px" type="info">
            <template #message>
              <div style="width: 100%; height: 120px; overflow-y: scroll"
                ><span style="font-size: 18px; font-weight: bold"
                  >{{ indexName }}峰值分析结论:<br />
                  1.{{ indexName }}单日最高为<span style="color: red; font-size: 22px"
                    >{{ maxCount }}次</span
                  >,于<span style="color: red; font-size: 22px">{{ maxTime }}</span
                  >发生<br />
                  2.{{ names }}峰值{{ indexName }}分别为<span style="color: red; font-size: 22px">{{
                    equipmentCounts
                  }}</span
                  ><br /></span></div></template
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
  import { ref, Ref, onMounted } from 'vue';
  import { Form, FormItem, RangePicker, Divider, Card, Alert } from 'ant-design-vue';
  import { getBenchmarkEquipment, getBenchmarkTrend } from '/@/api/data/benchmark';
  import UnitSelect from '../../warn/components/UnitSelect.vue';

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
      const indexName = ref('');
      indexName.value = parseInt(localStorage.getItem('plantId')) === 3 ? '故障停机' : '参数超限';

      const line = ref(parseInt(localStorage.getItem('lineId')));

      const historyTimeChange = () => {
        setEquipmentTrend();
        setTotal();
      };

      onMounted(() => {
        setEquipmentTrend();
        setTotal();
      });

      const handleOptionSelected = (values) => {
        setEquipmentTrend();
        setTotal();
      };

      const equipment = ref('');
      const maxCount = ref(0);
      const maxTime = ref('');
      const maxHour = ref('');
      const names = ref('');
      const equipmentCounts = ref('');
      const trendSummary = ref([]);

      const setTotal = async () => {
        const [startDate, endDate] = historyTime.value;
        const startDateDate = startDate.toDate();
        const endDateDate = endDate.toDate();
        const time = {
          st: dayjs(startDateDate).format('YYYY-MM-DD HH:mm:ss'),
          et: dayjs(endDateDate).format('YYYY-MM-DD HH:mm:ss'),
        };
        const trendData = await getBenchmarkTrend(line.value, time);
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
            text: `总${indexName.value}次数趋势`,
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
                  formatter: `平均${indexName.value}次数: {c}`,
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
            text: `${indexName.value}时段统计`,
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

      const setEquipmentTrend = async () => {
        const [startDate, endDate] = historyTime.value;
        const startDateDate = startDate.toDate();
        const endDateDate = endDate.toDate();
        const time = {
          st: dayjs(startDateDate).format('YYYY-MM-DD HH:mm:ss'),
          et: dayjs(endDateDate).format('YYYY-MM-DD HH:mm:ss'),
        };
        const data = await getBenchmarkEquipment(line.value, time);
        names.value = data.equipments.slice(0, 3).join(',');
        console.log(data);
        let trendSeries: any[] = [];
        let legendSelect = {};
        let summary: any = [];
        for (let i = 0; i < data.values.length; i++) {
          trendSeries.push({
            name: data.equipments[i],
            type: 'line',
            data: data.values[i],
          });
          summary.push({
            key: i + 1,
            name: data.equipments[i],
            trend: data.trend[i],
          });

          if (i < 7) {
            legendSelect[data.equipments[i]] = true;
          } else {
            legendSelect[data.equipments[i]] = false;
          }
        }
        trendSummary.value = summary;
        setOptions1({
          title: {
            text: `不同设备对应${indexName.value}趋势`,
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
            data: data.equipments,
            selected: legendSelect,
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
        equipment.value = data.equipments[data.counts.indexOf(Math.max(...data.counts))];
        for (let i = 0; i < data.counts.length; i++) {
          option2Data.push({ value: data.counts[i], name: data.equipments[i] });
        }

        setOptions2({
          title: {
            text: `${indexName.value}份额统计`,
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          series: [
            {
              name: `${indexName.value}份额统计`,
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
        equipmentCounts.value = data.equipmentMax.slice(0, 3).join('次、') + '次';
        let option3Max = Math.max(...data.equipmentMax);
        let option3Data: any[] = [];
        for (let i = 0; i < data.equipmentMax.length; i++) {
          option3Data.push({
            name: data.equipments[i] + `  (${data.equipmentMax[i]})`,
            max: option3Max,
          });
        }
        setOptions3({
          title: {
            text: `设备${indexName.value}峰值统计`,
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
                  value: data.equipmentMax,
                  name: `设备${indexName.value}峰值统计`,
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
        let option4Max = Math.max(...data.durations);
        for (let i = 0; i < data.equipmentMax.length; i++) {
          option4Data.push({
            name: data.equipments[i] + `  (${data.durations[i].toFixed(2)}h)`,
            max: option4Max,
          });
        }
        setOptions6({
          title: {
            text: `设备${indexName.value}时长统计`,
          },
          radar: {
            // shape: 'circle',
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
                  value: data.durations,
                  name: 'Allocated Budget',
                },
              ],
            },
          ],
        });
      };

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

      return {
        value,
        chartRef1,
        chartRef2,
        chartRef3,
        chartRef4,
        chartRef5,
        chartRef6,
        historyTime,
        equipment,
        historyTimeChange,
        maxTime,
        maxCount,
        maxHour,
        names,
        equipmentCounts,
        trendSummary,
        handleOptionSelected,
        indexName,
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
