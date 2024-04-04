<template>
  <PageWrapper title="超员违规情况巡检抓拍">
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
                style="width: 100%"
                :options="lineData.map((line) => ({ value: line['id'], label: line['name'] }))"
                disabled
              />
            </a-form-item>
          </a-col>
          <a-col :md="5">
            <a-form-item label="巡检时间" name="line">
              <a-select
                v-model:value="time"
                style="width: 100%"
                :options="times.map((t) => ({ value: t, label: t }))"
              />
            </a-form-item>
          </a-col>
          <a-col :md="5">
            <a-form-item name="input-number" label="巡检间隔">
              <a-input-number
                :min="0.01"
                :max="24"
                step="1"
                addon-after="小时"
                v-model:value="step"
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
                  >上次抓拍时间:<span style="color: rgb(26 7 240); font-size: 22px">{{ time }}</span
                  >,超员人数:
                  <span style="color: red; font-size: 22px">{{ exceedPeople }}</span></span
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
          <a-card
            v-for="(item, index) in cardData"
            :key="index"
            style="width: 95%"
            :title="item['description']"
          >
            <template #cover>
              <a-image
                alt="当前无数据,请确认是否停机"
                :src="item['detectionPicturePath']"
                style="aspect-ratio: 16/9"
              />
            </template>
            <a-card-meta>
              <template #description>
                <a-from>
                  <a-form-item label="定员人数">
                    <a-input-number v-model:value="item['limit']" disabled />
                  </a-form-item>
                  <a-form-item label="识别人数">
                    <a-input-number v-model:value="item['peopleCount']" />
                  </a-form-item>
                  <a-form-item label="超员人数">
                    <a-input :value="item['exceeded']" />
                  </a-form-item>
                </a-from>
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
                >主要结论:当月运行参数超员巡检次数呈现<span style="color: red; font-size: 22px">{{
                  monthSlope > 0 ? '上升' : monthSlope == 0 ? '不变' : '下降'
                }}</span
                >趋势,拟合直线{{
                  monthSlope > 0 ? '上升' : monthSlope == 0 ? '不变' : '下降'
                }}斜率为<span style="color: red; font-size: 22px">{{ monthSlope.toFixed(2) }}</span
                >,超员次数<span style="color: red; font-size: 22px">{{
                  monthSlope > 0 ? '小幅上升' : monthSlope == 0 ? '不变' : '小幅下降'
                }}</span></span
              ></template
            ></Alert
          >
          <Alert style="width: 90%; margin: 30px" type="info" show-icon>
            <template #message
              ><span style="font-size: 18px; font-weight: bold"
                >主要结论:当日运行参数超员巡检次数呈现<span style="color: red; font-size: 22px">{{
                  dailySlope > 0 ? '上升' : dailySlope == 0 ? '不变' : '下降'
                }}</span
                >趋势,拟合直线{{
                  dailySlope > 0 ? '上升' : dailySlope == 0 ? '不变' : '下降'
                }}斜率为<span style="color: red; font-size: 22px">{{ dailySlope.toFixed(2) }}</span
                >,超员次数<span style="color: red; font-size: 22px">{{
                  dailySlope > 0 ? '小幅上升' : dailySlope == 0 ? '不变' : '小幅下降'
                }}</span></span
              ></template
            ></Alert
          >
        </div>
      </div>
      <div class="grid md:grid-cols-3 gap-1" style="margin-top: 10px">
        <a-card style="width: 95%; height: 550px" title="季对标">
          <template #extra>
            <a-form-item label="对标季度数" style="margin: 0">
              <a-input-number v-model:value="benchmark1" />
            </a-form-item>
          </template>
          <template #cover>
            <div ref="chartRef3" style="height: 400px; widows: 100%"></div>
          </template>
          <a-card-meta>
            <template #description>
              <span style="color: black; font-size: 20px"
                >本季度相较于前几季度,巡检超员次数<span style="color: red; font-size: 22px">{{
                  benchmarkQuarter > 0 ? '上涨' : benchmarkQuarter == 0 ? '不变' : '下降'
                }}</span
                >了<span style="color: red; font-size: 22px">
                  {{ benchmarkQuarter.toFixed(2) }}%</span
                >
              </span>
            </template>
          </a-card-meta>
        </a-card>
        <a-card style="width: 95%" title="月对标">
          <template #extra>
            <a-form-item label="对比月数" style="margin: 0">
              <a-input-number v-model:value="benchmark2" />
            </a-form-item>
          </template>
          <template #cover>
            <div ref="chartRef2" style="height: 400px; widows: 100%"></div>
          </template>
          <a-card-meta>
            <template #description>
              <span style="color: black; font-size: 20px"
                >本月相较于前几月,巡检超员次数<span style="color: red; font-size: 22px">{{
                  benchmarkMonth > 0 ? '上涨' : benchmarkMonth == 0 ? '不变' : '下降'
                }}</span
                >了<span style="color: red; font-size: 22px">
                  {{ benchmarkMonth.toFixed(2) }}%</span
                >
              </span>
            </template>
          </a-card-meta>
        </a-card>
        <a-card style="width: 95%" title="日对标">
          <template #extra>
            <a-form-item label="对比日数" style="margin: 0">
              <a-input-number v-model:value="benchmark3" />
            </a-form-item>
          </template>
          <template #cover>
            <div ref="chartRef1" style="height: 400px; widows: 100%"></div>
          </template>
          <a-card-meta>
            <template #description>
              <span style="color: black; font-size: 20px"
                >今日相较于前几日,巡检超员次数<span style="color: red; font-size: 22px">{{
                  benchmarkDay > 0 ? '上涨' : benchmarkDay == 0 ? '不变' : '下降'
                }}</span
                >了<span style="color: red; font-size: 22px"> {{ benchmarkDay.toFixed(2) }}%</span>
              </span>
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
    Input,
    Image,
    Alert,
    Tabs,
    Divider,
    Button,
  } from 'ant-design-vue';
  import dayjs, { Dayjs } from 'dayjs';
  import { optionListApi, lineOptionListApi } from '/@/api/warn/select';
  import { getInspectionConfig } from '/@/api/data/config';

  import { detectionResult, getTrendMonth, getTrendDaily, detectionTimes } from '/@/api/warn/photo';
  import {
    getInspectionDaily,
    getInspectionMonth,
    getInspectionQuarter,
  } from '/@/api/warn/statistic';

  export default {
    components: {
      AButton: Button,
      ARow: Row,
      AInput: Input,
      AFormItem: Form.Item,
      ACardMeta: CardMeta,
      AForm: Form,
      ASelect: Select,
      AInputNumber: InputNumber,
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
      const time = ref(null);
      const times = ref([]);
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
        formData.value.plant = localStorage.getItem('plantId')
          ? parseInt(localStorage.getItem('plantId'))
          : plantData.value[0]['id'];
        await onPlantChange(formData.value.plant);
        getTimes();
        getStep();
        setQuarter();
        setMonth();
        setDaily();
        setMonthTrend();
        setDailyTrend();
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
        formData.value.line = parseInt(localStorage.getItem('lineId'));
      };
      async function getTimes() {
        const data = await detectionTimes(formData.value.line);
        console.log(times);
        times.value = data;
        if (data.length > 0) {
          time.value = data[0];
        }
        fetchResult();
      }
      const step = ref(1);

      async function getStep() {
        const config = await getInspectionConfig(formData.value.line);
        step.value = config.inspectionCaptureInterval;
      }

      const activeKey = ref('1');

      watch(activeKey, (newValue, _) => {
        if (newValue === '2') {
          nextTick(() => {
            resize4();
            resize5();
          });
        }
      });

      const cardData = ref([]);
      const exceedPeople = ref(0);

      const fetchResult = async () => {
        const params = {
          time: time.value,
        };
        const result = await detectionResult(formData.value.line, params);
        cardData.value = result;
        exceedPeople.value = result.reduce((acc, curr) => acc + curr['exceeded'], 0);
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
            text: '生产线超员巡检总次数月趋势',
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
        const dailyTrend = await getTrendDaily(formData.value.line, time);
        dailySlope.value = dailyTrend.params[1];
        lastCount.value = dailyTrend.value[dailyTrend.value.length - 1];
        lastDay.value = dailyTrend.times[dailyTrend.times.length - 1];
        setOptions5({
          title: {
            text: '生产线超员巡检总次数日趋势',
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

      const benchmarkDay = ref(0);
      const benchmarkMonth = ref(0);
      const benchmarkQuarter = ref(0);

      async function setQuarter() {
        const params = {
          num: benchmark1.value,
        };
        const data = await getInspectionQuarter(formData.value.line, params);
        benchmarkQuarter.value = data.rate;
        console.log(data);
        let legend = ['本季度', '上季度', '上上季度'];
        let legendData = [];
        let series = [];
        if (data.names.length > 2) {
          let indicator = [];
          for (let i = 0; i < data.names.length; i++) {
            indicator.push({ name: data.names[i], max: data.max });
          }

          for (let i = 0; i < data.values.length; i++) {
            legendData.push(legend[i]);
            series.push({
              value: data.values[i],
              name: legend[i],
            });
          }
          setOptions3({
            legend: {
              data: legendData,
            },
            radar: {
              // shape: 'circle',
              indicator: indicator,
            },
            series: [{ type: 'radar', data: series }],
          });
        } else {
          let bar = [];
          for (let i = 0; i < data.values.length; i++) {
            legendData.push(legend[i]);
            let k = [data.names[i]];
            for (let j = 0; j < data.values.length; j++) {
              k.push(data.values[j][i]);
            }
            series.push(k);
            bar.push({ type: 'bar' });
          }
          setOptions3({
            legend: {},
            tooltip: {},
            dataset: {
              source: [['对标', ...legendData], ...series],
            },
            xAxis: { type: 'category' },
            yAxis: {},
            series: bar,
          });
        }
      }

      async function setMonth() {
        const params = {
          num: benchmark2.value,
        };
        const data = await getInspectionMonth(formData.value.line, params);
        benchmarkMonth.value = data.rate;
        console.log(data);
        let indicator = [];
        let legend = ['本月', '上月', '上上月'];
        let series = [];
        let legendData = [];
        if (data.names.length > 2) {
          for (let i = 0; i < data.names.length; i++) {
            indicator.push({ name: data.names[i], max: data.max });
          }

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
        } else {
          let bar = [];
          for (let i = 0; i < data.values.length; i++) {
            legendData.push(legend[i]);
            let k = [data.names[i]];
            for (let j = 0; j < data.values.length; j++) {
              k.push(data.values[j][i]);
            }
            series.push(k);
            bar.push({ type: 'bar' });
          }
          setOptions2({
            legend: {},
            tooltip: {},
            dataset: {
              source: [['对标', ...legendData], ...series],
            },
            xAxis: { type: 'category' },
            yAxis: {},
            series: bar,
          });
        }
      }

      async function setDaily() {
        const params = {
          num: benchmark3.value,
        };
        const data = await getInspectionDaily(formData.value.line, params);
        benchmarkDay.value = data.rate;
        console.log(data);
        let indicator = [];
        let legend = ['今日', '昨日', '前日'];
        let series = [];
        let legendData = [];
        if (data.names.length > 2) {
          for (let i = 0; i < data.names.length; i++) {
            indicator.push({ name: data.names[i], max: data.max });
          }

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
          setOptions1(options);
        } else {
          let bar = [];
          for (let i = 0; i < data.values.length; i++) {
            legendData.push(legend[i]);
            let k = [data.names[i]];
            for (let j = 0; j < data.values.length; j++) {
              k.push(data.values[j][i]);
            }
            series.push(k);
            bar.push({ type: 'bar' });
          }
          setOptions2({
            legend: {},
            tooltip: {},
            dataset: {
              source: [['对标', ...legendData], ...series],
            },
            xAxis: { type: 'category' },
            yAxis: {},
            series: bar,
          });
        }
      }

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
        benchmark1,
        benchmark2,
        benchmark3,
        monthSlope,
        dailySlope,
        lastCount,
        lastDay,
        time,
        times,
        fetchResult,
        step,
        benchmarkDay,
        benchmarkMonth,
        benchmarkQuarter,
        cardData,
        exceedPeople,
      };
    },
  };
</script>
