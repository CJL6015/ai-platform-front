<template>
  <PageWrapper title="运行参数超限巡检抓拍">
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
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col :md="5">
            <a-form-item label="生产线" name="line">
              <a-select
                v-model:value="formData.line"
                disabled
                style="width: 100%"
                :options="lineData.map((line) => ({ value: line['id'], label: line['name'] }))"
              />
            </a-form-item>
          </a-col>
          <a-col :md="5">
            <a-form-item name="input-number" label="巡检间隔">
              <a-input-number
                :min="0.5"
                :max="24"
                step="0.5"
                addon-after="小时"
                value="1"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col :md="1">
            <a-button
              type="primary"
              html-type="submit"
              style="margin-left: 10px"
              @click="fetchResult"
              >确定</a-button
            >
          </a-col>
          <a-col :md="7">
            <Alert style="height: 33px; margin-left: 30px" type="info" show-icon>
              <template #message
                ><span style="font-size: 18px; font-weight: bold"
                  >上次抓拍时间:<span style="color: rgb(26 7 240); font-size: 22px">{{
                    lastDay
                  }}</span
                  >,{{ indexName }}测点数量:
                  <span style="color: red; font-size: 22px">{{ lastCount }}</span></span
                ></template
              ></Alert
            >
          </a-col>
        </a-row>
      </a-form>
      <a-row
        ><a-col :md="12">
          <a-button
            type="primary"
            html-type="submit"
            @click="openMonthDetail"
            style="margin-right: 100px; float: right"
            >查看雷达图详情</a-button
          ></a-col
        >
        <a-col :md="12"
          ><a-button
            type="primary"
            html-type="submit"
            @click="openDailyDetail"
            style="margin-right: 100px; float: right"
            >查看雷达图详情</a-button
          ></a-col
        ></a-row
      >
      <div class="grid md:grid-cols-2 gap-1">
        <div ref="chartRef4" style="height: 400px; widows: 100%"></div>
        <div ref="chartRef5" style="height: 400px; widows: 100%"></div>
        <Alert style="width: 90%; margin: 30px" type="info" show-icon>
          <template #message
            ><span style="font-size: 18px; font-weight: bold"
              >主要结论:当月运行参数{{ indexName }}巡检次数呈现<span
                style="color: red; font-size: 22px"
                >{{ monthSlope > 0 ? '上升' : monthSlope == 0 ? '不变' : '下降' }}</span
              >趋势,拟合直线{{
                monthSlope > 0 ? '上升' : monthSlope == 0 ? '不变' : '下降'
              }}斜率为<span style="color: red; font-size: 22px">{{ monthSlope.toFixed(2) }}</span
              >,{{ indexName }}次数<span style="color: red; font-size: 22px">{{
                monthSlope > 0 ? '小幅上升' : monthSlope == 0 ? '不变' : '小幅下降'
              }}</span></span
            ></template
          ></Alert
        >
        <Alert style="width: 90%; margin: 30px" type="info" show-icon>
          <template #message
            ><span style="font-size: 18px; font-weight: bold"
              >主要结论:当日运行参数{{ indexName }}巡检次数呈现<span
                style="color: red; font-size: 22px"
                >{{ dailySlope > 0 ? '上升' : dailySlope == 0 ? '不变' : '下降' }}</span
              >趋势,拟合直线{{
                dailySlope > 0 ? '上升' : dailySlope == 0 ? '不变' : '下降'
              }}斜率为<span style="color: red; font-size: 22px">{{ dailySlope.toFixed(2) }}</span
              >,{{ indexName }}次数<span style="color: red; font-size: 22px">{{
                dailySlope > 0 ? '小幅上升' : dailySlope == 0 ? '不变' : '小幅下降'
              }}</span></span
            ></template
          ></Alert
        >
      </div>

      <a-divider />
      <div class="grid md:grid-cols-3 gap-4">
        <a-card style="width: 80%" title="季对标">
          <template #extra>
            <a-form-item label="对标季度数" style="margin: 0">
              <a-input-number v-model:value="benchmark1" max="3" min="2" />
            </a-form-item>
          </template>
          <template #cover>
            <div ref="chartRef1" style="height: 500px; widows: 100%"></div>
          </template>
          <a-card-meta>
            <template #description>
              <span style="color: black; font-size: 20px"
                >本季度相较于前几季度,巡检{{ indexName }}次数<span
                  style="color: red; font-size: 22px"
                  >{{ benchmarkQuarter > 0 ? '上涨' : '下降' }}</span
                >了<span style="color: red; font-size: 22px">
                  {{ benchmarkQuarter.toFixed(2) }}%</span
                >
              </span>
            </template>
          </a-card-meta>
        </a-card>
        <a-card style="width: 80%" title="月对标">
          <template #extra>
            <a-form-item label="对比月数" style="margin: 0">
              <a-input-number v-model:value="benchmark2" max="3" min="2" />
            </a-form-item>
          </template>
          <template #cover>
            <div ref="chartRef2" style="height: 500px; widows: 100%"></div>
          </template>
          <a-card-meta>
            <template #description>
              <span style="color: black; font-size: 20px"
                >本月相较于前几月,巡检{{ indexName }}次数<span
                  style="color: red; font-size: 22px"
                  >{{ benchmarkMonth > 0 ? '上涨' : '下降' }}</span
                >了<span style="color: red; font-size: 22px">
                  {{ benchmarkMonth.toFixed(2) }}%</span
                >
              </span>
            </template>
          </a-card-meta>
        </a-card>
        <a-card style="width: 80%" title="日对标">
          <template #extra>
            <a-form-item label="对比日数" style="margin: 0">
              <a-input-number v-model:value="benchmark3" max="3" min="2" />
            </a-form-item>
          </template>
          <template #cover>
            <div ref="chartRef3" style="height: 500px; widows: 100%"></div>
          </template>
          <a-card-meta>
            <template #description>
              <span style="color: black; font-size: 20px"
                >今日相较于前几日,巡检{{ indexName }}次数<span
                  style="color: red; font-size: 22px"
                  >{{ benchmarkDay > 0 ? '上涨' : '下降' }}</span
                >了<span style="color: red; font-size: 22px"> {{ benchmarkDay.toFixed(2) }}%</span>
              </span>
            </template>
          </a-card-meta>
        </a-card>
      </div>
    </a-card>
    <Details @register="registerModal" />
  </PageWrapper>
</template>
<script lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { ref, Ref, onMounted, watch } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import {
    Form,
    Select,
    Row,
    Col,
    Card,
    CardMeta,
    InputNumber,
    Divider,
    Alert,
    Button,
  } from 'ant-design-vue';
  import dayjs, { Dayjs } from 'dayjs';
  import { optionListApi, lineOptionListApi } from '/@/api/warn/select';
  import {
    getTrendMonth,
    getTrendDaily,
    getBenchmark,
    getTrendDetailMonth,
    getTrendDetailDaily,
  } from '/@/api/data/point';
  import { useModal } from '/@/components/Modal';
  import { getParamDaily, getParamMonth, getParamQuarter } from '/@/api/warn/statistic';

  import Details from '../components/Details.vue';

  export default {
    components: {
      ADivider: Divider,
      ARow: Row,
      AFormItem: Form.Item,
      ACardMeta: CardMeta,
      AForm: Form,
      ASelect: Select,
      AInputNumber: InputNumber,
      ACol: Col,
      ACard: Card,
      Alert,
      AButton: Button,
      PageWrapper,
      Details,
    },
    setup() {
      const [registerModal, { openModal }] = useModal();
      let plantData = ref([]);
      let lineData = ref([]);
      const formData = ref({
        plant: -1,
        line: -1,
      });
      const indexName = ref('');
      indexName.value = parseInt(localStorage.getItem('plantId')) === 3 ? '故障停机' : '超限';
      onMounted(async () => {
        const options = await optionListApi();
        plantData.value = options.plantOptions;
        lineData.value = options.linesOptions;
        formData.value.plant = localStorage.getItem('plantId')
          ? parseInt(localStorage.getItem('plantId'))
          : plantData.value[0]['id'];
        await onPlantChange(formData.value.plant);
        fetchResult();
      });

      function fetchResult() {
        setMonthTrend();
        setDailyTrend();
        setQuarter();
        setMonth();
        setDaily();
      }
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
        formData.value.line = parseInt(localStorage.getItem('lineId'));
      };

      const timeValue = ref<Dayjs>(dayjs());

      const monthSlope = ref(0);
      const setMonthTrend = async () => {
        const currentDate: Dayjs = dayjs();
        const lastMonthDate: Dayjs = currentDate.subtract(1, 'month');
        const time = {
          st: dayjs(lastMonthDate).format('YYYY-MM-DD HH:mm:ss'),
          et: dayjs(currentDate).format('YYYY-MM-DD HH:mm:ss'),
        };
        const monthTrend = await getTrendMonth(formData.value.line, time);
        monthSlope.value = monthTrend.params[1];
        setOptions4({
          title: {
            text: `生产线${indexName.value}巡检总次数月趋势`,
          },
          legend: {
            data: ['统计数据', '拟合线'],
          },
          xAxis: {
            type: 'category',
            data: monthTrend.times,
          },
          yAxis: {
            type: 'value',
            min: 0.9 * Math.min(...monthTrend.value, ...monthTrend.fitValue),
          },
          series: [
            {
              data: monthTrend.value,
              type: 'line',
              smooth: true,
              name: '统计数据',
            },
            {
              data: monthTrend.fitValue,
              type: 'line',
              smooth: true,
              name: '拟合线',
              lineStyle: {
                color: '#5470C6',
                width: 2,
                type: 'dashed',
              },
            },
          ],
        });
      };
      const openMonthDetail = async () => {
        const detailData = await getTrendDetailMonth(formData.value.line);
        openModal(true, detailData);
      };

      const openDailyDetail = async () => {
        const detailData = await getTrendDetailDaily(formData.value.line);
        openModal(true, detailData);
      };

      const dailySlope = ref(0);
      const lastCount = ref(0);
      const lastDay = ref('');
      const setDailyTrend = async () => {
        const currentDate: Dayjs = dayjs();
        const lastDayDate: Dayjs = currentDate.subtract(1, 'day');
        const time = {
          st: dayjs(lastDayDate).format('YYYY-MM-DD HH:mm:ss'),
          et: dayjs(currentDate).format('YYYY-MM-DD HH:mm:ss'),
        };
        localStorage.setItem('lineId', formData.value.line);
        const dailyTrend = await getTrendDaily(formData.value.line, time);
        dailySlope.value = dailyTrend.params[1];
        lastCount.value = dailyTrend.value[dailyTrend.value.length - 1];
        lastDay.value = dailyTrend.times[dailyTrend.times.length - 1];
        setOptions5({
          title: {
            text: `生产线${indexName.value}巡检总次数日趋势`,
          },
          legend: {
            data: ['统计数据', '拟合线'],
          },
          xAxis: {
            type: 'category',
            data: dailyTrend.times,
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: dailyTrend.value,
              type: 'line',
              smooth: true,
              name: '统计数据',
            },
            {
              data: dailyTrend.fitValue,
              type: 'line',
              smooth: true,
              name: '拟合线',
              lineStyle: {
                color: '#5470C6',
                width: 2,
                type: 'dashed',
              },
            },
          ],
        });
      };

      const benchmarkDay = ref(0);
      const benchmarkMonth = ref(0);
      const benchmarkQuarter = ref(0);

      const benchmark1 = ref(2);
      const benchmark2 = ref(2);
      const benchmark3 = ref(2);

      watch(benchmark1, () => {
        setQuarter();
      });

      watch(benchmark2, () => {
        setMonth();
      });

      watch(benchmark3, () => {
        setDaily();
      });

      async function setQuarter() {
        const params = {
          num: benchmark1.value,
        };
        const data = await getParamQuarter(formData.value.line, params);
        console.log(data);
        benchmarkQuarter.value = data.rate;
        let indicator = [];
        for (let i = 0; i < data.names.length; i++) {
          indicator.push({ name: data.names[i], max: data.max });
        }
        let legend = ['第一季度', '第二季度', '第三季度', '本季度'];
        let series = [];
        let legendData = [];
        for (let i = 0; i < data.values.length; i++) {
          legendData.push(legend[i]);
          series.push({
            value: data.values[i],
            name: legend[i],
          });
        }
        console.log(series, 111);
        setOptions1({
          legend: {
            data: legendData,
          },
          radar: {
            // shape: 'circle',
            indicator: indicator,
          },
          series: [{ type: 'radar', data: series }],
        });
      }

      async function setMonth() {
        const params = {
          num: benchmark2.value,
        };
        const data = await getParamMonth(formData.value.line, params);
        benchmarkMonth.value = data.rate;
        console.log(data);
        let indicator = [];
        for (let i = 0; i < data.names.length; i++) {
          indicator.push({ name: data.names[i], max: data.max });
        }
        let legend = ['本月', '上月', '上上月'];
        let series = [];
        let legendData = [];
        for (let i = 0; i < data.values.length; i++) {
          legendData.push(legend[i]);
          series.push({
            value: data.values[i],
            name: legend[i],
          });
        }
        setOptions2({
          legend: {
            data: legendData,
          },
          radar: {
            // shape: 'circle',
            indicator: indicator,
          },
          series: [{ type: 'radar', data: series }],
        });
      }

      async function setDaily() {
        const params = {
          num: benchmark3.value,
        };
        const data = await getParamDaily(formData.value.line, params);
        benchmarkDay.value = data.rate;
        console.log(data);
        let indicator = [];
        for (let i = 0; i < data.names.length; i++) {
          indicator.push({ name: data.names[i], max: data.max });
        }
        let legend = ['今日', '昨日', '前日'];
        let series = [];
        let legendData = [];
        for (let i = 0; i < data.values.length; i++) {
          legendData.push(legend[i]);
          series.push({
            value: data.values[i],
            name: legend[i],
          });
        }
        let options = {
          legend: {
            data: legendData,
          },
          radar: {
            // shape: 'circle',
            indicator: indicator,
          },
          series: [{ type: 'radar', data: series }],
        };
        console.log(111, options);
        setOptions3(options);
      }

      const chartRef1 = ref<HTMLDivElement | null>(null);
      const chartRef2 = ref<HTMLDivElement | null>(null);
      const chartRef3 = ref<HTMLDivElement | null>(null);
      const chartRef4 = ref<HTMLDivElement | null>(null);
      const chartRef5 = ref<HTMLDivElement | null>(null);
      const { setOptions: setOptions1 } = useECharts(chartRef1 as Ref<HTMLDivElement>);
      const { setOptions: setOptions2 } = useECharts(chartRef2 as Ref<HTMLDivElement>);
      const { setOptions: setOptions3 } = useECharts(chartRef3 as Ref<HTMLDivElement>);
      const { setOptions: setOptions4 } = useECharts(chartRef4 as Ref<HTMLDivElement>);
      const { setOptions: setOptions5 } = useECharts(chartRef5 as Ref<HTMLDivElement>);

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
        monthSlope,
        dailySlope,
        lastCount,
        lastDay,
        benchmarkDay,
        benchmarkMonth,
        benchmarkQuarter,
        openMonthDetail,
        openDailyDetail,
        registerModal,
        benchmark1,
        benchmark2,
        benchmark3,
        fetchResult,
        indexName,
      };
    },
  };
</script>
