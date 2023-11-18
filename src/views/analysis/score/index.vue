<template>
  <PageWrapper title="设备安全状态分析">
    <a-card>
      <a-form>
        <a-form-item label="历史时间">
          <a-range-picker
            v-model:value="historyTime"
            show-time
            @change="historyTimeChange"
            :placeholder="['开始时间', '结束时间']"
          />
        </a-form-item>
      </a-form>
      <a-divider />
      <div>
        <a-row>
          <a-col :span="6" style="height: 100%">
            <Alert style="width: 100%; height: 100%" type="info">
              <template #message
                ><div style="width: 100%"
                  ><span style="font-size: 30px; font-weight: bold"
                    ><span style="color: blue">规则1:</span
                    ><span style="color: red">以日为单位,每天计算一次评分,满分100分</span
                    ><br /><br />
                    <span style="color: blue">规则2:</span
                    >生产线超员惩罚只和超员次数有关,不考虑超员时间<span style="color: red"
                      >记生产线各道工序一天共超员n1次,超员一次扣×1分</span
                    ><br /><br />
                    <span style="color: blue">规则3:</span>生产线设备和工艺参数超限惩罚和<span
                      style="color: red"
                      >超限测点数量、超限测点次数、超限幅度</span
                    >有关,所扣分数随超限测点数量、超限时长线性递增,随超限幅度非线性增长<br /><br />
                    <span style="color: blue">规则4.1:</span
                    >记1个测点超限1次高/低限,扣×2分.共n2个测点在这种情况下超限t2次;<br /><br />
                    <span style="color: blue">规则4.2:</span
                    >记1个测点超限1次高高/低低限,扣×3分.共n3个测点在这种情况下超限t3次;<br /><br />
                    <span style="color: blue">规则4.1:</span>生产线安全评分公式为:</span
                  ></div
                ></template
              ></Alert
            >
          </a-col>
          <a-col :span="18">
            <div
              ref="chartRef"
              class="border border-gray-400"
              style="width: 100%; height: 380px; margin-left: 5px"
            ></div>
            <img
              src="/src/assets/svg/p2.svg"
              style="width: 100%; margin-top: 5px; margin-left: 5px"
            /> </a-col
        ></a-row>
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
    },
    setup() {
      type RangeValue = [Dayjs, Dayjs];
      const historyTime = ref<RangeValue>();
      const currentDate: Dayjs = dayjs();
      const lastMonthDate: Dayjs = currentDate.subtract(1, 'month');
      const rangeValue: RangeValue = [lastMonthDate, currentDate];
      historyTime.value = rangeValue;

      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

      onMounted(() => {
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
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
          yAxis: [
            {
              type: 'value',
            },
            {
              type: 'value',
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
              data: [320, 302, 301, 334, 390, 330, 320],
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
              data: [120, 132, 101, 134, 90, 230, 210],
            },
            {
              name: '当日生产线综合得分',
              type: 'line',
              yAxisIndex: 1,
              data: [120, 132, 101, 134, 90, 230, 210],
            },
          ],
        });
      });

      const historyTimeChange = () => {};

      return {
        historyTime,
        historyTimeChange,
        chartRef,
      };
    },
  };
</script>
