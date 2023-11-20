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
        style="height: 600px; margin-top: 10px"
      ></div>
    </a-card>
  </PageWrapper>
</template>
<script lang="ts">
  import { useECharts } from '/@/hooks/web/useECharts';
  import { PageWrapper } from '/@/components/Page';
  import { ref, Ref, onMounted } from 'vue';
  import {
    FormItem,
    Card,
    Alert,
    Row,
    Col,
    Slider,
    InputNumber,
    Select,
    SelectOption,
  } from 'ant-design-vue';
  import { pointNameListApi } from '/@/api/warn/select';

  export default {
    components: {
      ARow: Row,
      ACol: Col,
      PageWrapper,
      ACard: Card,
      ASelect: Select,
      AFormItem: FormItem,
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
      onMounted(() => {
        getData();
      });

      function generateUniqueList(numArrays, maxN) {
        let list = [];
        let uniqueCombos = new Set();

        while (list.length < numArrays) {
          let a = Math.floor(Math.random() * (maxN + 1));
          let b = Math.floor(Math.random() * (maxN + 1));

          let combo = `${a}-${b}`;
          if (!uniqueCombos.has(combo)) {
            let c = Math.random().toFixed(2);
            list.push([a, b, c]);
            uniqueCombos.add(combo);
          }
        }

        return list;
      }

      async function getData() {
        const data = await pointNameListApi(1);
        console.log(data);
        const value = generateUniqueList((data.length * data.length) / 2, data.length);
        setOptions1({
          tooltip: {
            position: 'top',
          },
          xAxis: {
            type: 'category',
            data: data,
            splitArea: {
              show: true,
            },
          },
          yAxis: {
            type: 'category',
            data: data,
            splitArea: {
              show: true,
            },
          },
          visualMap: {
            min: 0,
            max: 1,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '15%',
          },
          series: [
            {
              name: 'Punch Card',
              type: 'heatmap',
              data: value,
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
        });
      }

      const chartRef1 = ref<HTMLDivElement | null>(null);
      const { setOptions: setOptions1 } = useECharts(chartRef1 as Ref<HTMLDivElement>);

      return {
        inputValue1,
        inputValue2,
        inputValue3,
        inputValue4,
        inputValue5,
        inputValue6,
        chartRef1,
      };
    },
  };
</script>
