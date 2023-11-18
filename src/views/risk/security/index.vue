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
  import { Form, FormItem, RangePicker, Divider, Card } from 'ant-design-vue';

  export default {
    components: {
      PageWrapper,
      ACard: Card,
      AForm: Form,
      AFormItem: FormItem,
      ADivider: Divider,
      ARangePicker: RangePicker,
    },
    setup() {
      type RangeValue = [Dayjs, Dayjs];
      const historyTime = ref<RangeValue>();
      const currentDate: Dayjs = dayjs();
      const lastMonthDate: Dayjs = currentDate.subtract(1, 'month');
      const rangeValue: RangeValue = [lastMonthDate, currentDate];
      historyTime.value = rangeValue;

      let chartRefs = [];
      for (let i = 0; i < 25; i++) {
        chartRefs.push(ref<HTMLDivElement | null>(null));
      }
      let setOpts = [];
      for (let i = 0; i < chartRefs.length; i++) {
        const { setOptions } = useECharts(chartRefs[i] as Ref<HTMLDivElement>);
        setOpts.push(setOptions);
      }

      onMounted(async () => {
        for (let i = 0; i < chartRefs.length; i++) {
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
                    value: 50,
                    name: '油相储罐',
                  },
                ],
              },
            ],
          });
        }
      });

      const historyTimeChange = () => {};

      return {
        historyTime,
        historyTimeChange,
        chartRefs,
      };
    },
  };
</script>
