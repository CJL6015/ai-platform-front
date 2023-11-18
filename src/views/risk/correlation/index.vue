<template>
  <PageWrapper title="设备超限相关性分析">
    <a-card>
      <div class="border border-gray-400" style="padding: 5px">
        <a-row>
          <a-col :span="12"
            ><Alert type="info">
              <template #message>
                <span style="color: blue; font-size: 18px; font-weight: bold"
                  >支持度:A、B两个设备(或测点)同时发生超限的概率
                </span>
              </template>
            </Alert>
            <Alert type="error" style="margin-top: 10px">
              <template #message>
                <span style="color: red; font-size: 18px; font-weight: bold"
                  >置信度:A设备(测点)发生超限的情况下,B设备(测点)发生超限的概率
                </span>
              </template>
            </Alert>
            <Alert type="success" style="margin-top: 10px">
              <template #message>
                <span style="color: green; font-size: 18px; font-weight: bold"
                  >提升度:A设备(测点)发生超限,对B设备(测点)的概率提升了多少
                </span>
              </template>
            </Alert>
          </a-col>
          <a-col :span="1" />
          <a-col :span="11">
            <a-row>
              <h2 style="margin-left: 20px"><b>选择指标:</b></h2>
              <a-form-item style="margin-left: 20px">
                <a-select style="width: 300px" value="置信度">
                  <a-select-option value="置信度">置信度</a-select-option>
                  <a-select-option value="支持度">支持度</a-select-option>
                  <a-select-option value="提升度">提升度</a-select-option>
                </a-select>
              </a-form-item>
            </a-row>

            <h2 style="margin-top: 10px; margin-left: 20px"><b>阈值选择:</b></h2>
            <a-row>
              <a-col :span="3" />
              <a-col :span="10">
                <a-slider
                  v-model:value="inputValue1"
                  :min="0"
                  :max="1"
                  :step="0.01"
                  :marks="{
                    0.5: '0.5',
                    1.0: '1.0',
                  }"
                >
                  <template #mark="{ label, point }">
                    <strong>{{ label }}</strong>
                  </template></a-slider
                >
              </a-col>
              <a-col :span="4">
                <a-input-number
                  v-model:value="inputValue1"
                  :min="0"
                  :max="1"
                  :step="0.01"
                  style="margin-left: 16px"
                />
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </div>

      <div
        class="grid md:grid-cols-2 gap-1 border border-gray-400"
        style="margin-top: 10px; padding: 10px"
      >
        <div>
          <Alert type="warning" style="width: 100%">
            <template #message>
              <span style="font-size: 18px; font-weight: bold"
                >同时出现超限概率较大的设备组合包括:<br />
                1.<span style="color: red; font-size: 22px">{{ '水相罐参数超限' }}</span
                >与<span style="color: red; font-size: 22px">{{ '泵A参数限' }}</span
                >,支持度超过0.8<br />
                2.<span style="color: red; font-size: 22px">{{ '泵A参数限' }}</span
                >与<span style="color: red; font-size: 22px">{{ '泵B参数限' }}</span
                >,支持度超过0.6<br />
              </span>
            </template> </Alert></div
        ><div>
          <Alert type="warning" style="width: 100%">
            <template #message>
              <span style="font-size: 18px; font-weight: bold"
                >同时出现超限概率较大的设备组合包括:<br />
                1.<span style="color: red; font-size: 22px">{{ '水相罐参数超限' }}</span
                >与<span style="color: red; font-size: 22px">{{ '泵A参数限' }}</span
                >,支持度超过0.8<br />
                2.<span style="color: red; font-size: 22px">{{ '泵A参数限' }}</span
                >与<span style="color: red; font-size: 22px">{{ '泵B参数限' }}</span
                >,支持度超过0.6<br />
              </span>
            </template> </Alert
        ></div>
      </div>
      <div
        ref="chartRef1"
        class="border border-gray-400"
        style="height: 400px; margin-top: 10px"
      ></div>
    </a-card>
  </PageWrapper>
</template>
<script lang="ts">
  import { useECharts } from '/@/hooks/web/useECharts';
  import type { Dayjs } from 'dayjs';
  import { PageWrapper } from '/@/components/Page';
  import { computed, ref, watch, Ref, onMounted } from 'vue';
  import {
    Form,
    FormItem,
    RangePicker,
    Divider,
    Card,
    Alert,
    Row,
    Col,
    Slider,
    InputNumber,
    Select,
    SelectOption,
  } from 'ant-design-vue';

  export default {
    components: {
      ARow: Row,
      ACol: Col,
      PageWrapper,
      ACard: Card,
      AForm: Form,
      ASelect: Select,
      AFormItem: FormItem,
      ADivider: Divider,
      ARangePicker: RangePicker,
      Alert,
      ASlider: Slider,
      AInputNumber: InputNumber,
      ASelectOption: SelectOption,
    },
    setup() {
      const inputValue1 = ref(0.6);
      const inputValue2 = ref(0.5);
      const inputValue3 = ref(0.3);
      const inputValue4 = ref(0.8);
      const inputValue5 = ref(0.3);
      const inputValue6 = ref(0.9);

      const hours = [
        '12a',
        '1a',
        '2a',
        '3a',
        '4a',
        '5a',
        '6a',
        '7a',
        '8a',
        '9a',
        '10a',
        '11a',
        '12p',
        '1p',
        '2p',
        '3p',
        '4p',
        '5p',
        '6p',
        '7p',
        '8p',
        '9p',
        '10p',
        '11p',
      ];
      // prettier-ignore
      const days = [
    'Saturday', 'Friday', 'Thursday',
    'Wednesday', 'Tuesday', 'Monday', 'Sunday'
];
      // prettier-ignore
      const data = [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]]
    .map(function (item) {
    return [item[1], item[0], item[2] || '-'];
});
      let option = {
        tooltip: {
          position: 'top',
        },
        xAxis: {
          type: 'category',
          data: hours,
          splitArea: {
            show: true,
          },
        },
        yAxis: {
          type: 'category',
          data: days,
          splitArea: {
            show: true,
          },
        },
        visualMap: {
          min: 0,
          max: 10,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '15%',
        },
        series: [
          {
            name: 'Punch Card',
            type: 'heatmap',
            data: data,
            label: {
              show: true,
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };
      const chartRef1 = ref<HTMLDivElement | null>(null);
      const chartRef2 = ref<HTMLDivElement | null>(null);
      const { setOptions: setOptions1 } = useECharts(chartRef1 as Ref<HTMLDivElement>);
      const { setOptions: setOptions2 } = useECharts(chartRef2 as Ref<HTMLDivElement>);
      onMounted(() => {
        setOptions1(option);

        setOptions2(option);
      });

      return {
        inputValue1,
        inputValue2,
        inputValue3,
        inputValue4,
        inputValue5,
        inputValue6,
        chartRef1,
        chartRef2,
      };
    },
  };
</script>
