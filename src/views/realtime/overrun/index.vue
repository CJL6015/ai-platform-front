<template>
  <PageWrapper title="超限抓拍">
    <a-card>
      <a-form :model="formData" :label-col="labelCol" @finish="submitForm">
        <a-row>
          <a-col :md="5">
            <a-form-item label="公司">
              <a-select
                v-model:value="formData.plant"
                style="width: 100%"
                @change="onPlantChange"
                :options="plantData.map((plant) => ({ value: plant }))"
              />
            </a-form-item>
          </a-col>
          <a-col :md="5">
            <a-form-item label="生产线">
              <a-select
                v-model:value="formData.line"
                style="width: 100%"
                :options="types.map((line) => ({ value: line }))"
              />
            </a-form-item>
          </a-col>
          <a-col :md="5">
            <a-form-item name="input-number" label="巡检间隔">
              <a-input-number :min="0.5" :max="24" step="0.5" addon-after="小时" value="0.5" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :md="5">
            <a-form-item label="上次抓拍时间">
              <a-date-picker style="width: 100%" v-model:value="timeValue" />
            </a-form-item>
          </a-col>
          <a-col :md="5">
            <span style="margin-left: 10px">上次抓拍超员人数:5</span>
          </a-col>
          <a-col :md="1">
            <a-form-item>
              <a-button line="primary" html-line="submit" type="primary"
                >巡检超限违规趋势查询</a-button
              >
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <a-divider />
      <a-row>
        <img src="../svg/p1.svg" class="svg-image" />
      </a-row>
      <a-divider />
      <div class="grid md:grid-cols-3 gap-4">
        <a-card style="width: 80%" title="年对标">
          <template #cover>
            <div ref="chartRef1" style="height: 500px; widows: 100%"></div>
          </template>
          <a-card-meta>
            <template #description>
              <span style="color: black; font-size: 20px"
                >本年度相较于前1年度,巡检超员次数下降了5%</span
              >
            </template>
          </a-card-meta>
        </a-card>
        <a-card style="width: 80%" title="季对标">
          <template #cover>
            <div ref="chartRef2" style="height: 500px; widows: 100%"></div>
          </template>
          <a-card-meta>
            <template #description>
              <span style="color: black; font-size: 20px"
                >本季度相较于前3季度,巡检超员次数下降了5%</span
              >
            </template>
          </a-card-meta>
        </a-card>
        <a-card style="width: 80%" title="月对标">
          <template #cover>
            <div ref="chartRef3" style="height: 500px; widows: 100%"></div>
          </template>
          <a-card-meta>
            <template #description>
              <span style="color: black; font-size: 20px"
                >本月度相较于前2月度,巡检超员次数下降了5%</span
              >
            </template>
          </a-card-meta>
        </a-card>
      </div>
    </a-card>
  </PageWrapper>
</template>
<script lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { computed, ref, watch, Ref, onMounted } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import {
    Form,
    Select,
    Row,
    Col,
    Card,
    CardMeta,
    InputNumber,
    DatePicker,
    Button,
    Divider,
  } from 'ant-design-vue';
  import dayjs, { Dayjs } from 'dayjs';

  export default {
    components: {
      ADivider: Divider,
      ARow: Row,
      AFormItem: Form.Item,
      ACardMeta: CardMeta,
      AForm: Form,
      AButton: Button,
      ASelect: Select,
      AInputNumber: InputNumber,
      ADatePicker: DatePicker,
      ACol: Col,
      ACard: Card,
      PageWrapper,
    },
    setup() {
      const plantData = ['1号公司', '2号公司'];
      const lineData = {
        '1号公司': ['1号生产线', '2号生产线', '3号生产线'],
        '2号公司': ['1号生产线', '2号生产线', '3号生产线'],
      };
      const plant = ref(plantData[0]);
      const line = ref(lineData[plant.value][0]);
      const types = computed(() => {
        return lineData[plant.value];
      });

      watch(plant, (val) => {
        line.value = lineData[val][0];
      });
      const formData = {
        plant: plant.value,
        line: line.value,
      };
      const submitForm = (values) => {
        console.log('Success:', values);
        console.log('Success:', formData);
      };

      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
      const labelCol = { style: { width: '120px' } };
      const onPlantChange = (value) => {
        formData.line = lineData[value][0];
      };

      const timeValue = ref<Dayjs>(dayjs());

      const chartRef1 = ref<HTMLDivElement | null>(null);
      const chartRef2 = ref<HTMLDivElement | null>(null);
      const chartRef3 = ref<HTMLDivElement | null>(null);
      const { setOptions: setOptions1 } = useECharts(chartRef1 as Ref<HTMLDivElement>);
      const { setOptions: setOptions2 } = useECharts(chartRef2 as Ref<HTMLDivElement>);
      const { setOptions: setOptions3 } = useECharts(chartRef3 as Ref<HTMLDivElement>);
      onMounted(() => {
        setOptions1({
          legend: {
            data: ['上年度', '本年度'],
          },
          radar: {
            // shape: 'circle',
            indicator: [
              { name: '制药工序超员', max: 10 },
              { name: '装药工序超员', max: 10 },
              { name: '包装工序超员', max: 10 },
              { name: '装车工序超员', max: 10 },
            ],
          },
          series: [
            {
              name: 'Budget vs spending',
              type: 'radar',
              data: [
                {
                  value: [6, 5, 1, 3],
                  name: '上年度',
                },
                {
                  value: [7, 1, 3, 4],
                  name: '本年度',
                },
              ],
            },
          ],
        });
      });
      onMounted(() => {
        setOptions2({
          legend: {
            data: ['第一季度', '第二季度', '第三季度', '本季度'],
          },
          radar: {
            // shape: 'circle',
            indicator: [
              { name: '制药工序超员', max: 10 },
              { name: '装药工序超员', max: 10 },
              { name: '包装工序超员', max: 10 },
              { name: '装车工序超员', max: 10 },
            ],
          },
          series: [
            {
              name: 'Budget vs spending',
              type: 'radar',
              data: [
                {
                  value: [6, 5, 1, 3],
                  name: '第一季度',
                },
                {
                  value: [7, 1, 3, 4],
                  name: '第二季度',
                },
                {
                  value: [2, 3, 4, 7],
                  name: '第三季度',
                },
                {
                  value: [2, 4, 1, 8],
                  name: '本季度',
                },
              ],
            },
          ],
        });
      });
      onMounted(() => {
        setOptions3({
          legend: {
            data: ['本月', '上月', '上上月'],
          },
          radar: {
            // shape: 'circle',
            indicator: [
              { name: '制药工序超员', max: 10 },
              { name: '装药工序超员', max: 10 },
              { name: '包装工序超员', max: 10 },
              { name: '装车工序超员', max: 10 },
            ],
          },
          series: [
            {
              name: 'Budget vs spending',
              type: 'radar',
              data: [
                {
                  value: [6, 5, 1, 3],
                  name: '本月',
                },
                {
                  value: [7, 1, 3, 4],
                  name: '上月',
                },
                {
                  value: [4, 2, 1, 7],
                  name: '上上月',
                },
              ],
            },
          ],
        });
      });

      return {
        formData,
        types,
        plantData,
        lineData,
        submitForm,
        onFinishFailed,
        labelCol,
        onPlantChange,
        timeValue,
        chartRef1,
        chartRef2,
        chartRef3,
      };
    },
  };
</script>
