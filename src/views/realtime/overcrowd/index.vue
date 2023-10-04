<template>
  <PageWrapper title="超限违规情况巡检抓拍">
    <a-card>
      <a-form :model="formData" :label-col="labelCol" @finish="submitForm">
        <a-row>
          <a-col :md="5">
            <a-form-item label="公司" name="plant">
              <a-select
                v-model:value="formData.plant"
                style="width: 100%"
                @change="onPlantChange"
                :options="plantData.map((plant) => ({ value: plant['id'], label: plant['name'] }))"
              />
            </a-form-item>
          </a-col>
          <a-col :md="5">
            <a-form-item label="生产线" name="line">
              <a-select
                v-model:value="formData.line"
                style="width: 100%"
                :options="lineData.map((line) => ({ value: line['id'], label: line['name'] }))"
              />
            </a-form-item>
          </a-col>
          <a-col :md="5">
            <a-form-item name="input-number" label="巡检间隔">
              <a-input-number :min="0.5" :max="24" step="0.5" addon-after="小时" value="0.5" />
            </a-form-item>
          </a-col>
          <a-col :md="6">
            <Alert style="height: 33px; margin-left: 30px" type="info" show-icon>
              <template #message
                ><span style="font-size: 18px; font-weight: bold"
                  >上次抓拍时间:<span style="color: rgb(26 7 240); font-size: 22px">{{
                    '09月30日21时'
                  }}</span
                  >,超员人数: <span style="color: red; font-size: 22px">{{ 1 }}</span></span
                ></template
              ></Alert
            >
          </a-col>
        </a-row>
      </a-form>
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="巡检抓拍" />
        <a-tab-pane key="2" tab="历史趋势" />
      </a-tabs>
      <div v-show="activeKey === '1'">
        <div class="grid md:grid-cols-5 gap-1">
          <a-card style="width: 95%" title="制药工序1">
            <template #cover>
              <a-image alt="example" src="/src/assets/detection/制药工序1.png" />
            </template>
            <a-card-meta>
              <template #description>
                <a-form-item label="制药工序2">
                  <a-input value="1" />
                </a-form-item>
                <a-form-item label="包装工序">
                  <a-input value="1" />
                </a-form-item>
              </template>
            </a-card-meta>
          </a-card>

          <a-card style="width: 95%" title="制药工序2">
            <template #cover>
              <a-image alt="example" src="/src/assets/detection/制药工序2.jpg" />
            </template>
            <a-card-meta>
              <template #description>
                <a-form-item label="定员人数">
                  <a-input value="1" />
                </a-form-item>
                <a-form-item label="超员人数">
                  <a-input value="1" />
                </a-form-item>
              </template>
            </a-card-meta>
          </a-card>

          <a-card style="width: 95%" title="装药工序">
            <template #cover>
              <a-image alt="example" src="/src/assets/detection/装药工序.png" />
            </template>
            <a-card-meta>
              <template #description>
                <a-form-item label="定员人数">
                  <a-input value="1" />
                </a-form-item>
                <a-form-item label="超员人数">
                  <a-input value="1" />
                </a-form-item>
              </template>
            </a-card-meta>
          </a-card>

          <a-card style="width: 95%" title="包装工序">
            <template #cover>
              <a-image alt="example" src="/src/assets/detection/包装工序.jpg" />
            </template>
            <a-card-meta>
              <template #description>
                <a-form-item label="定员人数">
                  <a-input value="1" />
                </a-form-item>
                <a-form-item label="超员人数">
                  <a-input value="1" />
                </a-form-item>
              </template>
            </a-card-meta>
          </a-card>

          <a-card style="width: 95%" title="装车工序">
            <template #cover>
              <a-image alt="example" src="/src/assets/detection/装车工序.jpg" />
            </template>
            <a-card-meta>
              <template #description>
                <a-form-item label="定员人数">
                  <a-input value="1" />
                </a-form-item>
                <a-form-item label="超员人数">
                  <a-input value="1" />
                </a-form-item>
              </template>
            </a-card-meta>
          </a-card>
        </div>
      </div>
      <div v-show="activeKey === '2'">
        <div class="grid md:grid-cols-2 gap-1">
          <div ref="chartRef4" style="height: 400px; widows: 100%"></div>
          <div ref="chartRef5" style="height: 400px; widows: 100%"></div>
          <Alert style="width: 90%; margin: 30px" type="info" show-icon>
            <template #message
              ><span style="font-size: 18px; font-weight: bold"
                >主要结论:当月运行参数超限巡检次数呈现<span style="color: red; font-size: 22px"
                  >下降</span
                >趋势,拟合直线下降斜率为<span style="color: red; font-size: 22px">-1.5</span></span
              ></template
            ></Alert
          >
          <Alert style="width: 90%; margin: 30px" type="info" show-icon>
            <template #message
              ><span style="font-size: 18px; font-weight: bold"
                >主要结论:当年运行参数超限巡检次数呈现<span style="color: red; font-size: 22px"
                  >下降</span
                >趋势,拟合直线下降斜率为<span style="color: red; font-size: 22px">-1.5</span></span
              ></template
            ></Alert
          >
        </div>
      </div>
      <div class="grid md:grid-cols-3 gap-1" style="margin-top: 10px">
        <a-card style="width: 95%; height: 550px" title="季对标">
          <template #cover>
            <div ref="chartRef2" style="height: 400px; widows: 100%"></div>
          </template>
          <a-card-meta>
            <template #description>
              <span style="color: black; font-size: 20px"
                >本季度相较于前3季度,巡检超员次数下降了5%</span
              >
            </template>
          </a-card-meta>
        </a-card>
        <a-card style="width: 95%" title="月对标">
          <template #cover>
            <div ref="chartRef3" style="height: 400px; widows: 100%"></div>
          </template>
          <a-card-meta>
            <template #description>
              <span style="color: black; font-size: 20px"
                >本月度相较于前2月度,巡检超员次数下降了5%</span
              >
            </template>
          </a-card-meta>
        </a-card>
        <a-card style="width: 95%" title="日对标">
          <template #cover>
            <div ref="chartRef1" style="height: 400px; widows: 100%"></div>
          </template>
          <a-card-meta>
            <template #description>
              <span style="color: black; font-size: 20px"
                >今日相较于前1日,巡检超员次数下降了5%</span
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
  import { ref, watch, Ref, onMounted, nextTick } from 'vue';
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
    Input,
    Image,
    Alert,
    Tabs,
    Divider,
  } from 'ant-design-vue';
  import dayjs, { Dayjs } from 'dayjs';
  import { optionListApi, lineOptionListApi } from '/@/api/warn/select';

  export default {
    components: {
      ARow: Row,
      AInput: Input,
      AFormItem: Form.Item,
      ACardMeta: CardMeta,
      AForm: Form,
      ASelect: Select,
      AInputNumber: InputNumber,
      ADatePicker: DatePicker,
      ACol: Col,
      ACard: Card,
      PageWrapper,
      AImage: Image,
      ATabs: Tabs,
      ATabPane: Tabs.TabPane,
      Alert,
      Divider,
    },
    setup() {
      let plantData = ref([]);
      let lineData = ref([]);
      const formData = ref({
        plant: -1,
        line: -1,
      });
      onMounted(async () => {
        const options = await optionListApi();
        plantData.value = options.plantOptions;
        lineData.value = options.linesOptions;
        formData.value.plant = plantData.value[0]['id'];
        formData.value.line = lineData.value[0]['id'];
      });
      const submitForm = (values) => {
        console.log('Success:', values);
        console.log('Success:', formData);
      };

      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
      const labelCol = { style: { width: '120px' } };
      const onPlantChange = async (value) => {
        lineData.value = await lineOptionListApi(value);
        formData.value.line = lineData.value[0]['id'];
      };

      const activeKey = ref('1');

      watch(activeKey, (newValue, _) => {
        if (newValue === '2') {
          nextTick(() => {
            resize4();
            resize5();
          });
        }
      });

      const timeValue = ref<Dayjs>(dayjs());

      const chartRef1 = ref<HTMLDivElement | null>(null);
      const chartRef2 = ref<HTMLDivElement | null>(null);
      const chartRef3 = ref<HTMLDivElement | null>(null);
      const chartRef4 = ref<HTMLDivElement | null>(null);
      const chartRef5 = ref<HTMLDivElement | null>(null);
      const chartRef6 = ref<HTMLDivElement | null>(null);
      const chartRef7 = ref<HTMLDivElement | null>(null);
      const { setOptions: setOptions1 } = useECharts(chartRef1 as Ref<HTMLDivElement>);
      const { setOptions: setOptions2 } = useECharts(chartRef2 as Ref<HTMLDivElement>);
      const { setOptions: setOptions3 } = useECharts(chartRef3 as Ref<HTMLDivElement>);
      const { setOptions: setOptions4, resize: resize4 } = useECharts(
        chartRef4 as Ref<HTMLDivElement>,
      );
      const { setOptions: setOptions5, resize: resize5 } = useECharts(
        chartRef5 as Ref<HTMLDivElement>,
      );

      onMounted(() => {
        setOptions1({
          legend: {
            data: ['昨日', '今日'],
          },
          radar: {
            // shape: 'circle',
            indicator: [
              { name: '制药工序1超员', max: 10 },
              { name: '制药工序2超员', max: 10 },
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
                  value: [6, 1, 5, 1, 3],
                  name: '昨日',
                },
                {
                  value: [7, 6, 1, 3, 4],
                  name: '今日',
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
              { name: '制药工序1超员', max: 10 },
              { name: '制药工序2超员', max: 10 },
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
                  value: [6, 1, 5, 1, 3],
                  name: '第一季度',
                },
                {
                  value: [7, 1, 3, 1, 4],
                  name: '第二季度',
                },
                {
                  value: [2, 3, 1, 4, 7],
                  name: '第三季度',
                },
                {
                  value: [2, 4, 1, 8, 1],
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
              { name: '制药工序1超员', max: 10 },
              { name: '制药工序2超员', max: 10 },
              { name: '装药工序超员', max: 10 },
              { name: '包装工序超员', max: 10 },
              { name: '装车工序超员', max: 10 },
            ],
          },
          series: [
            {
              type: 'radar',
              data: [
                {
                  value: [6, 3, 5, 1, 3],
                  name: '本月',
                },
                {
                  value: [7, 1, 3, 3, 4],
                  name: '上月',
                },
                {
                  value: [4, 3, 2, 1, 7],
                  name: '上上月',
                },
              ],
            },
          ],
        });
      });
      onMounted(() => {
        setOptions4({
          title: {
            text: '生产线超员巡检总次数月趋势',
          },
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line',
              smooth: true,
            },
          ],
        });
      });
      onMounted(() => {
        setOptions5({
          title: {
            text: '生产线超员巡检总次数年趋势',
          },
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line',
              smooth: true,
            },
          ],
        });
      });

      return {
        formData,
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
        chartRef4,
        chartRef5,
        chartRef6,
        chartRef7,
        activeKey,
      };
    },
  };
</script>
