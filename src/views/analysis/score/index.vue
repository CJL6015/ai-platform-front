<template>
  <PageWrapper title="评分规则及趋势分析">
    <a-card>
      <UnitSelectDate @option-selected="handleOptionSelected" />
      <a-divider />
      <div>
        <a-row>
          <div
            ref="chartRef"
            class="border border-gray-400"
            style="width: 100%; height: 380px"
          ></div
        ></a-row>
        <Alert style="width: 100%; height: 100%; margin-top: 10px" type="info">
          <template #message
            ><div style="width: 100%"
              ><span style="font-size: 20px; font-weight: bold"
                ><span style="color: blue">规则1:</span
                ><span style="color: red">以日为单位,每天计算一次评分,满分100分</span><br />
                <span style="color: blue">规则2:</span
                >生产线超员惩罚只和超员次数有关,不考虑超员时间<span style="color: red"
                  >记生产线各道工序一天共超员n1次,超员一次扣×1分</span
                ><br />
                <span v-if="leiguan">
                  <span style="color: blue">规则3:</span>记1个设备故障停机1次,扣<span
                    style="color: red"
                    >2分</span
                  >,共故障停机n2次.<br />
                  <span style="color: blue">规则4:</span>生产线安全评分公式为:
                  <span style="color: red">S=100-n1*t1-n2*t2</span>
                </span>
                <span v-else>
                  <span style="color: blue">规则3:</span>生产线设备和工艺参数超限惩罚和<span
                    style="color: red"
                    >超限测点数量、超限测点次数、超限幅度</span
                  >有关,所扣分数随超限测点数量、超限时长线性递增,随超限幅度非线性增长<br />
                  <span style="color: blue">规则4.1:</span
                  >记1个测点超限1次高/低限,扣×2分.共n2个测点在这种情况下超限t2次;<br />
                  <span style="color: blue">规则4.2:</span
                  >记1个测点超限1次高高/低低限,扣×3分.共n3个测点在这种情况下超限t3次;<br />
                  <span style="color: blue">规则4.1:</span>生产线安全评分公式为:
                  <span style="color: red">S=100 - n1 * x1 - t2 * x2 - t3 * x3</span></span
                >
              </span>
            </div></template
          ></Alert
        >
      </div>
    </a-card>
  </PageWrapper>
</template>
<script lang="ts">
  import { useECharts } from '/@/hooks/web/useECharts';
  import dayjs, { Dayjs } from 'dayjs';
  import { PageWrapper } from '/@/components/Page';
  import { ref, Ref, onMounted } from 'vue';
  import { Form, FormItem, RangePicker, Divider, Card, Alert, Row, Col } from 'ant-design-vue';
  import { getScoreTrendApi } from '/@/api/risk/score';
  import UnitSelectDate from '../../warn/components/UnitSelectDate.vue';

  export default {
    components: {
      PageWrapper,
      ACard: Card,
      AForm: Form,
      AFormItem: FormItem,
      ADivider: Divider,
      ARangePicker: RangePicker,
      Alert,
      ARow: Row,
      ACol: Col,
      UnitSelectDate,
    },
    setup() {
      type RangeValue = [Dayjs, Dayjs];
      const historyTime = ref<RangeValue>();
      const currentDate: Dayjs = dayjs();
      const lastMonthDate: Dayjs = currentDate.subtract(1, 'month');
      const rangeValue: RangeValue = [lastMonthDate, currentDate];
      historyTime.value = rangeValue;
      const line = ref(1);
      const leiguan = ref(false);
      leiguan.value = parseInt(localStorage.getItem('plantId')) === 3;

      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
      const handleOptionSelected = (values) => {
        console.log(values);
        historyTime.value = values.time;
        line.value = values.line;
        getScore();
      };
      async function getScore() {
        const [startDate, endDate] = historyTime.value;
        const startDateDate = startDate.toDate();
        const endDateDate = endDate.toDate();
        const time = {
          st: dayjs(startDateDate).format('YYYY-MM-DD') + ' 00:00:00',
          et: dayjs(endDateDate).format('YYYY-MM-DD') + ' 23:59:59',
        };
        const data = await getScoreTrendApi(line.value, time);
        console.log(data);
        setOptions({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          legend: {},
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: {
            type: 'category',
            data: data[0],
          },
          yAxis: [
            {
              type: 'value',
              max: 100,
            },
            {
              type: 'value',
              show: false,
              max: 100,
            },
          ],
          series: [
            {
              name: '当日参数超限扣分',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: data[1].map((num) => num.toFixed(2)),
            },
            {
              name: '当日超员扣分',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: data[2].map((num) => num.toFixed(2)),
            },
            {
              name: '当日生产线综合得分',
              type: 'line',
              yAxisIndex: 1,
              data: data[3].map((num) => num.toFixed(2)),
            },
          ],
        });
      }

      return {
        historyTime,
        chartRef,
        handleOptionSelected,
        leiguan,
      };
    },
  };
</script>
