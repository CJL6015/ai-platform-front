<template>
  <PageWrapper title="超限抓拍">
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
          <a-col :md="5">
            <a-form-item label="上次抓拍时间">
              <a-date-picker style="width: 100%" v-model:value="timeValue" />
            </a-form-item>
          </a-col>
          <a-col :md="4">
            <Alert style="width: 80%; height: 33px; margin-left: 30px" type="info" show-icon>
              <template #message
                ><span style="font-size: 18px; font-weight: bold"
                  >上次抓拍超限测点数量:<span style="color: red; font-size: 22px">5</span></span
                ></template
              ></Alert
            >
          </a-col>
        </a-row>
      </a-form>
      <div class="grid md:grid-cols-2 gap-1">
        <div ref="chartRef4" style="height: 400px; widows: 100%"></div>
        <div ref="chartRef5" style="height: 400px; widows: 100%"></div>
      </div>
      <Alert style="width: 90%; margin: 30px" type="info" show-icon>
        <template #message
          ><span style="font-size: 18px; font-weight: bold"
            >主要结论:当月运行参数超限巡检次数呈现<span style="color: red; font-size: 22px"
              >下降</span
            >趋势,拟合直线下降斜率为<span style="color: red; font-size: 22px">-1.5</span></span
          ></template
        ></Alert
      >
      <a-divider />
      <div class="grid md:grid-cols-2 gap-1">
        <div ref="chartRef6" style="height: 400px; widows: 100%"></div>
        <div ref="chartRef7" style="height: 400px; widows: 100%"></div>
      </div>
      <Alert style="width: 90%; margin: 30px" type="info" show-icon>
        <template #message
          ><span style="font-size: 18px; font-weight: bold"
            >主要结论:当日运行参数超限巡检次数呈现<span style="color: red; font-size: 22px"
              >下降</span
            >趋势,拟合直线下降斜率为<span style="color: red; font-size: 22px">-1.5</span></span
          ></template
        ></Alert
      >
      <a-divider />
      <div class="grid md:grid-cols-3 gap-4">
        <a-card style="width: 80%" title="季对标">
          <template #cover>
            <div ref="chartRef1" style="height: 500px; widows: 100%"></div>
          </template>
          <a-card-meta>
            <template #description>
              <span style="color: black; font-size: 20px"
                >本季度相较于前3季度,巡检超限次数下降了5%</span
              >
            </template>
          </a-card-meta>
        </a-card>
        <a-card style="width: 80%" title="月对标">
          <template #cover>
            <div ref="chartRef2" style="height: 500px; widows: 100%"></div>
          </template>
          <a-card-meta>
            <template #description>
              <span style="color: black; font-size: 20px"
                >本季度相较于前3季度,巡检超限次数下降了5%</span
              >
            </template>
          </a-card-meta>
        </a-card>
        <a-card style="width: 80%" title="日对标">
          <template #cover>
            <div ref="chartRef3" style="height: 500px; widows: 100%"></div>
          </template>
          <a-card-meta>
            <template #description>
              <span style="color: black; font-size: 20px"
                >今日相较于前2日,巡检超限次数下降了5%</span
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
    Alert,
  } from 'ant-design-vue';
  import dayjs, { Dayjs } from 'dayjs';
  import { optionListApi, lineOptionListApi } from '/@/api/warn/select';

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
      Alert,
      PageWrapper,
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
      const { setOptions: setOptions6, resize: resize6 } = useECharts(
        chartRef6 as Ref<HTMLDivElement>,
      );
      const { setOptions: setOptions7, resize: resize7 } = useECharts(
        chartRef7 as Ref<HTMLDivElement>,
      );
      onMounted(() => {
        setOptions3({
          legend: {
            data: ['前日', '昨日', '今日'],
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
                  value: [2, 4, 5, 1, 3],
                  name: '前日',
                },
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
        setOptions1({
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
        setOptions2({
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
            text: '生产线超限巡检总次数月趋势',
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
        setOptions6({
          title: {
            text: '生产线超限巡检总次数日趋势',
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
        const cellSize = [80, 80];
        const pieRadius = 30;
        function getVirtualData() {
          const date = 1485878400000;
          const end = 1488297600000;
          const dayTime = 3600 * 24 * 1000;
          const data = [];
          for (let time = date; time < end; time += dayTime) {
            data.push([dayjs(time).format('YYYY-MM-DD'), Math.floor(Math.random() * 10000)]);
          }
          return data;
        }
        const scatterData = getVirtualData();
        const pieSeries = scatterData.map(function (item, index) {
          return {
            type: 'pie',
            id: 'pie-' + index,
            center: item[0],
            radius: pieRadius,
            coordinateSystem: 'calendar',
            label: {
              formatter: '{c}',
              position: 'inside',
            },
            data: [
              { name: '制药工序1', value: Math.round(Math.random() * 10) },
              { name: '制药工序2', value: Math.round(Math.random() * 10) },
              { name: '装药工序', value: Math.round(Math.random() * 10) },
              { name: '包装工序', value: Math.round(Math.random() * 10) },
              { name: '装车工序', value: Math.round(Math.random() * 10) },
            ],
          };
        });

        setOptions5({
          title: {
            text: '生产线超限巡检详情',
          },
          tooltip: {},
          legend: {
            data: ['制药工序1', '制药工序2', '装药工序', '包装工序', '装车工序'],
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
          },
          calendar: {
            top: 'middle',
            left: 'center',
            orient: 'vertical',
            cellSize: cellSize,
            yearLabel: {
              show: false,
              fontSize: 30,
            },
            dayLabel: {
              margin: 20,
              firstDay: 1,
              nameMap: ['周日', '周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            },
            monthLabel: {
              show: false,
            },
            range: ['2017-02'],
          },
          series: [
            {
              id: 'label',
              type: 'scatter',
              coordinateSystem: 'calendar',
              symbolSize: 0,
              label: {
                show: true,
                formatter: function (params) {
                  return dayjs(params.value[0]).format('DD');
                },
                offset: [-cellSize[0] / 2 + 10, -cellSize[1] / 2 + 10],
                fontSize: 14,
              },
              data: scatterData,
            },
            ...pieSeries,
          ],
        });
      });
      onMounted(() => {
        const cellSize = [80, 80];
        const pieRadius = 30;
        function getVirtualData() {
          const date = 1485878400000;
          const end = 1488297600000;
          const dayTime = 3600 * 24 * 1000;
          const data = [];
          for (let time = date; time < end; time += dayTime) {
            data.push([dayjs(time).format('YYYY-MM-DD'), Math.floor(Math.random() * 10000)]);
          }
          return data;
        }
        const scatterData = getVirtualData();
        const pieSeries = scatterData.map(function (item, index) {
          return {
            type: 'pie',
            id: 'pie-' + index,
            center: item[0],
            radius: pieRadius,
            coordinateSystem: 'calendar',
            label: {
              formatter: '{c}',
              position: 'inside',
            },
            data: [
              { name: '制药工序1', value: Math.round(Math.random() * 10) },
              { name: '制药工序2', value: Math.round(Math.random() * 10) },
              { name: '装药工序', value: Math.round(Math.random() * 10) },
              { name: '包装工序', value: Math.round(Math.random() * 10) },
              { name: '装车工序', value: Math.round(Math.random() * 10) },
            ],
          };
        });

        setOptions7({
          title: {
            text: '生产线超限巡检详情',
          },
          tooltip: {},
          legend: {
            data: ['制药工序1', '制药工序2', '装药工序', '包装工序', '装车工序'],
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
          },
          calendar: {
            top: 'middle',
            left: 'center',
            orient: 'vertical',
            cellSize: cellSize,
            yearLabel: {
              show: false,
              fontSize: 30,
            },
            dayLabel: {
              margin: 20,
              firstDay: 1,
              nameMap: ['周日', '周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            },
            monthLabel: {
              show: false,
            },
            range: ['2017-02'],
          },
          series: [
            {
              id: 'label',
              type: 'scatter',
              coordinateSystem: 'calendar',
              symbolSize: 0,
              label: {
                show: true,
                formatter: function (params) {
                  return dayjs(params.value[0]).format('DD');
                },
                offset: [-cellSize[0] / 2 + 10, -cellSize[1] / 2 + 10],
                fontSize: 14,
              },
              data: scatterData,
            },
            ...pieSeries,
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
      };
    },
  };
</script>
