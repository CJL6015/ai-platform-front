<template>
  <PageWrapper title="设备安全状态分析">
    <a-card>
      <UnitSelectDay @option-selected="handleOptionSelected" />
      <a-divider />
      <a-alert
        style="width: 98%; margin: 10px"
        type="success"
        show-icon
        message="规则: 1天记1次分。设备得分 = 100 - 该设备超限次数 * 单次超限扣分"
      />
      <a-alert style="width: 98%; margin: 10px" type="info" show-icon>
        <template #message
          ><span style="font-size: 20px; font-weight: bold"
            >1.本月设备安全状态得分最低的三个设备<span style="color: blue; font-size: 22px">{{
              summary1.equipment1
            }}</span
            >:<span style="color: red; font-size: 22px">{{ summary1.score1 }}</span
            >分、<span style="color: blue; font-size: 22px">{{ summary1.equipment2 }}</span
            >:<span style="color: red; font-size: 22px">{{ summary1.score2 }}</span
            >分、<span style="color: blue; font-size: 22px">{{ summary1.equipment3 }}</span
            >:<span style="color: red; font-size: 22px">{{ summary1.score3 }}</span
            >分 </span
          ><br /></template
      ></a-alert>
      <a-alert style="width: 98%; margin: 10px" type="error" show-icon>
        <template #message
          ><span style="font-size: 20px; font-weight: bold"
            >2.本月设备安全状态得分较上月下降最多的三个设备<span
              style="color: blue; font-size: 22px"
              >{{ summary2.equipment1 }}</span
            >:<span style="color: red; font-size: 22px">{{ summary2.score1 }}</span
            >分、<span style="color: blue; font-size: 22px">{{ summary2.equipment2 }}</span
            >:<span style="color: red; font-size: 22px">{{ summary2.score2 }}</span
            >分、<span style="color: blue; font-size: 22px">{{ summary2.equipment3 }}</span
            >:<span style="color: red; font-size: 22px">{{ summary2.score3 }}</span
            >分 </span
          ><br /></template
      ></a-alert>
      <div class="grid md:grid-cols-5 gap-4">
        <div
          :ref="chartRefs[0]"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
        <div
          :ref="chartRefs[1]"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
        <div
          :ref="chartRefs[2]"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
        <div
          :ref="chartRefs[3]"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
        <div
          :ref="chartRefs[4]"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
        <div
          :ref="chartRefs[5]"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
        <div
          :ref="chartRefs[6]"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
        <div
          :ref="chartRefs[7]"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
        <div
          :ref="chartRefs[8]"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
        <div
          :ref="chartRefs[9]"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
        <div
          :ref="chartRefs[10]"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
        <div
          :ref="chartRefs[11]"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
        <div
          :ref="chartRefs[12]"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
        <div
          :ref="chartRefs[13]"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
        <div
          :ref="chartRefs[14]"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
        <div
          :ref="chartRefs[15]"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
        <div
          :ref="chartRefs[16]"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
        <div
          :ref="chartRefs[17]"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
        <div
          :ref="chartRefs[18]"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
        <div
          :ref="chartRefs[19]"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
        <div
          :ref="chartRefs[20]"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
        <div
          :ref="chartRefs[21]"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
        <div
          :ref="chartRefs[22]"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
        <div
          :ref="chartRefs[23]"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
        <div
          :ref="chartRefs[24]"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
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
  import { getScoreApi, getScoreSummaryApi } from '/@/api/risk/score';
  import UnitSelectDay from '../../warn/components/UnitSelectDay.vue';

  export default {
    components: {
      PageWrapper,
      ACard: Card,
      AForm: Form,
      AFormItem: FormItem,
      ADivider: Divider,
      ARangePicker: RangePicker,
      UnitSelectDay,
      AAlert: Alert,
    },
    setup() {
      type RangeValue = [Dayjs, Dayjs];
      const historyTime = ref<RangeValue>();
      const currentDate: Dayjs = dayjs();
      const lastMonthDate: Dayjs = currentDate.subtract(1, 'month');
      const rangeValue: RangeValue = [lastMonthDate, currentDate];
      historyTime.value = rangeValue;
      const line = ref(1);

      const handleOptionSelected = (values) => {
        console.log(values);
        historyTime.value = values.time;
        line.value = values.line;
        getScores();
      };

      let chartRefs = [];
      for (let i = 0; i < 25; i++) {
        chartRefs.push(ref<HTMLDivElement | null>(null));
      }
      let setOpts = [];
      for (let i = 0; i < chartRefs.length; i++) {
        const { setOptions } = useECharts(chartRefs[i] as Ref<HTMLDivElement>);
        setOpts.push(setOptions);
      }
      async function getScores() {
        const date = historyTime.value;
        const time = {
          st: dayjs(date).format('YYYY-MM-DD') + ' 00:00:00',
          et: dayjs(date).format('YYYY-MM-DD') + ' 23:59:59',
        };
        const data = await getScoreApi(line.value, time);
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          setOpts[i]({
            tooltip: {
              formatter: '{a} <br/>{b} : {c}%',
            },
            series: [
              {
                name: 'Pressure',
                type: 'gauge',
                progress: {
                  show: true,
                },
                detail: {
                  valueAnimation: true,
                  formatter: '{value}',
                },
                data: [
                  {
                    value: data[i].score.toFixed(2),
                    name: data[i].name,
                  },
                ],
              },
            ],
          });
        }
      }

      const summary1 = ref({
        equipment1: '',
        equipment2: '',
        equipment3: '',
        score1: '0',
        score2: '0',
        score3: '0',
      });
      const summary2 = ref({
        equipment1: '',
        equipment2: '',
        equipment3: '',
        score1: '0',
        score2: '0',
        score3: '0',
      });
      async function getSummary() {
        const data = await getScoreSummaryApi(line.value);
        console.log(data);
        summary1.value.equipment1 = data[0][0].name;
        summary1.value.equipment2 = data[0][1].name;
        summary1.value.equipment3 = data[0][2].name;
        summary1.value.score1 = data[0][0].score.toFixed(2);
        summary1.value.score2 = data[0][1].score.toFixed(2);
        summary1.value.score3 = data[0][2].score.toFixed(2);

        summary2.value.equipment1 = data[1][0].name;
        summary2.value.equipment2 = data[1][1].name;
        summary2.value.equipment3 = data[1][2].name;
        summary2.value.score1 = Math.abs(data[1][0].score).toFixed(2);
        summary2.value.score2 = Math.abs(data[1][1].score).toFixed(2);
        summary2.value.score3 = Math.abs(data[1][2].score).toFixed(2);
      }

      onMounted(async () => {
        getSummary();
      });

      const historyTimeChange = () => {};

      return {
        historyTime,
        historyTimeChange,
        chartRefs,
        handleOptionSelected,
        summary1,
        summary2,
      };
    },
  };
</script>
