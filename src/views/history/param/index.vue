<template>
  <PageWrapper title="参数超限多维对标分析">
    <a-card>
      <a-form>
        <a-form-item label="历史时间">
          <a-range-picker
            v-model:value="value"
            show-time
            :placeholder="['冻结开始时间', '冻结结束时间']"
          />
        </a-form-item>
      </a-form>
      <a-divider />
      <div class="grid md:grid-cols-3 gap-4">
        <div
          ref="chartRef1"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
        <div
          ref="chartRef2"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
        <div
          ref="chartRef3"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
        <div
          ref="chartRef4"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
        <div
          ref="chartRef5"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
        <div
          ref="chartRef6"
          class="border border-gray-400"
          style="width: 100%; height: 380px"
        ></div>
        <div>
          <Alert style="width: 100%; height: 220px" type="info">
            <template #message
              ><span style="font-size: 18px; font-weight: bold"
                >超限走势分析结论:<br />
                1.泵1参数超限整体呈现<span style="color: red; font-size: 22px">下降趋势</span><br />
                2.泵2参数超限整体呈现<span style="color: red; font-size: 22px">上升趋势</span><br />
                3.泵3参数超限整体呈现<span style="color: red; font-size: 22px">上升趋势</span><br />
                4.泵4参数超限整体呈现<span style="color: red; font-size: 22px">下降趋势</span><br />
                5.整体超限次数呈现<span style="color: red; font-size: 22px">下降趋势</span
                ><br /></span></template
          ></Alert>
        </div>
        <div>
          <Alert style="width: 100%; height: 220px" type="info">
            <template #message
              ><span style="font-size: 18px; font-weight: bold"
                >超限高峰时间和工序位置分析结论:<br />
                1.参数超限占比最高的工序为<span style="color: red; font-size: 22px">泵1</span
                >,有提升的空间<br />
                2.定员超限最高发的时间为<span style="color: red; font-size: 22px">09:00-10:00</span
                >,可加强该时段的监控<br /></span></template
          ></Alert>
        </div>
        <div>
          <Alert style="width: 100%; height: 220px" type="info">
            <template #message
              ><span style="font-size: 18px; font-weight: bold"
                >超限峰值分析结论:<br />
                1.参数超限单日最高为<span style="color: red; font-size: 22px">15次</span>,于<span
                  style="color: red; font-size: 22px"
                  >2023-03-06</span
                >发生<br />
                1.泵1、泵2、泵3、泵4峰值参数超限分别为<span style="color: red; font-size: 22px"
                  >5次、4次、2次、3次</span
                ><br /></span></template
          ></Alert>
        </div>
      </div>
    </a-card>
  </PageWrapper>
</template>
<script lang="ts">
  import { useECharts } from '/@/hooks/web/useECharts';
  import type { Dayjs } from 'dayjs';
  import { PageWrapper } from '/@/components/Page';
  import { computed, ref, watch, Ref, onMounted } from 'vue';
  import { Form, FormItem, RangePicker, Divider, Card, Alert } from 'ant-design-vue';

  export default {
    components: {
      PageWrapper,
      ACard: Card,
      AForm: Form,
      AFormItem: FormItem,
      ADivider: Divider,
      ARangePicker: RangePicker,
      Alert,
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

      type RangeValue = [Dayjs, Dayjs];
      const value = ref<RangeValue>();

      const chartRef1 = ref<HTMLDivElement | null>(null);
      const chartRef2 = ref<HTMLDivElement | null>(null);
      const chartRef3 = ref<HTMLDivElement | null>(null);
      const chartRef4 = ref<HTMLDivElement | null>(null);
      const chartRef5 = ref<HTMLDivElement | null>(null);
      const chartRef6 = ref<HTMLDivElement | null>(null);
      const { setOptions: setOptions1 } = useECharts(chartRef1 as Ref<HTMLDivElement>);
      const { setOptions: setOptions2 } = useECharts(chartRef2 as Ref<HTMLDivElement>);
      const { setOptions: setOptions3 } = useECharts(chartRef3 as Ref<HTMLDivElement>);
      const { setOptions: setOptions4 } = useECharts(chartRef4 as Ref<HTMLDivElement>);
      const { setOptions: setOptions5 } = useECharts(chartRef5 as Ref<HTMLDivElement>);
      const { setOptions: setOptions6 } = useECharts(chartRef6 as Ref<HTMLDivElement>);
      onMounted(() => {
        setOptions1({
          title: {
            text: '不同设备对应参数超限趋势',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['制药工序1', '制药工序2', '装药工序', '包装工序', '装车工序'],
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: '制药工序1',
              type: 'line',
              stack: 'Total',
              data: [120, 132, 101, 134, 90, 230, 210],
            },
            {
              name: '制药工序2',
              type: 'line',
              stack: 'Total',
              data: [220, 182, 191, 234, 290, 330, 310],
            },
            {
              name: '装药工序',
              type: 'line',
              stack: 'Total',
              data: [150, 232, 201, 154, 190, 330, 410],
            },
            {
              name: '包装工序',
              type: 'line',
              stack: 'Total',
              data: [320, 332, 301, 334, 390, 330, 320],
            },
            {
              name: '装车工序',
              type: 'line',
              stack: 'Total',
              data: [820, 932, 901, 934, 1290, 1330, 1320],
            },
          ],
        });
      });
      onMounted(() => {
        setOptions2({
          title: {
            text: '超限份额统计',
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          legend: {
            top: 'bottom',
            data: ['停机时间', '运行时间'],
          },
          series: [
            {
              name: '本月停机比',
              type: 'pie',
              radius: [0, 100],
              center: ['50%', '50%'],
              data: [
                { value: 30, name: '停机时间' },
                { value: 28, name: '运行时间' },
              ],
              label: {
                show: false,
              },
            },
          ],
        });
      });
      onMounted(() => {
        setOptions3({
          title: {
            text: '工序超员峰值统计',
          },
          legend: {
            data: ['Allocated Budget', 'Actual Spending'],
          },
          radar: {
            // shape: 'circle',
            indicator: [
              { name: 'Sales', max: 6500 },
              { name: 'Administration', max: 16000 },
              { name: 'Information Technology', max: 30000 },
              { name: 'Customer Support', max: 38000 },
              { name: 'Development', max: 52000 },
              { name: 'Marketing', max: 25000 },
            ],
          },
          series: [
            {
              name: 'Budget vs spending',
              type: 'radar',
              data: [
                {
                  value: [4200, 3000, 20000, 35000, 50000, 18000],
                  name: 'Allocated Budget',
                },
                {
                  value: [5000, 14000, 28000, 26000, 42000, 21000],
                  name: 'Actual Spending',
                },
              ],
            },
          ],
        });
      });

      onMounted(() => {
        setOptions4({
          title: {
            text: '参数总超限次数趋势',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985',
              },
            },
          },
          legend: {
            data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
          ],
          yAxis: [
            {
              type: 'value',
            },
          ],
          series: [
            {
              name: 'Email',
              type: 'line',
              stack: 'Total',
              areaStyle: {},
              emphasis: {
                focus: 'series',
              },
              data: [120, 132, 101, 134, 90, 230, 210],
            },
            {
              name: 'Union Ads',
              type: 'line',
              stack: 'Total',
              areaStyle: {},
              emphasis: {
                focus: 'series',
              },
              data: [220, 182, 191, 234, 290, 330, 310],
            },
            {
              name: 'Video Ads',
              type: 'line',
              stack: 'Total',
              areaStyle: {},
              emphasis: {
                focus: 'series',
              },
              data: [150, 232, 201, 154, 190, 330, 410],
            },
            {
              name: 'Direct',
              type: 'line',
              stack: 'Total',
              areaStyle: {},
              emphasis: {
                focus: 'series',
              },
              data: [320, 332, 301, 334, 390, 330, 320],
            },
            {
              name: 'Search Engine',
              type: 'line',
              stack: 'Total',
              label: {
                show: true,
                position: 'top',
              },
              areaStyle: {},
              emphasis: {
                focus: 'series',
              },
              data: [820, 932, 901, 934, 1290, 1330, 1320],
            },
          ],
        });
      });

      onMounted(() => {
        setOptions5({
          title: {
            text: '超限时段统计',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              axisTick: {
                alignWithLabel: true,
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
            },
          ],
          series: [
            {
              name: 'Direct',
              type: 'bar',
              barWidth: '60%',
              data: [10, 52, 200, 334, 390, 330, 220],
            },
          ],
        });
      });

      onMounted(() => {
        setOptions6({
          title: {
            text: '超员人数峰值统计',
          },
          legend: {
            data: ['Allocated Budget', 'Actual Spending'],
          },
          radar: {
            // shape: 'circle',
            indicator: [
              { name: 'Sales', max: 6500 },
              { name: 'Administration', max: 16000 },
              { name: 'Information Technology', max: 30000 },
              { name: 'Customer Support', max: 38000 },
              { name: 'Development', max: 52000 },
              { name: 'Marketing', max: 25000 },
            ],
            radius: 120,
            startAngle: 90,
            splitNumber: 4,
            shape: 'circle',
            axisName: {
              formatter: '【{value}】',
              color: '#428BD4',
            },
            splitArea: {
              areaStyle: {
                color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10,
              },
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(211, 253, 250, 0.8)',
              },
            },
          },
          series: [
            {
              name: 'Budget vs spending',
              type: 'radar',
              data: [
                {
                  value: [4200, 3000, 20000, 35000, 50000, 18000],
                  name: 'Allocated Budget',
                },
                {
                  value: [5000, 14000, 28000, 26000, 42000, 21000],
                  name: 'Actual Spending',
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
        value,
        chartRef1,
        chartRef2,
        chartRef3,
        chartRef4,
        chartRef5,
        chartRef6,
      };
    },
  };
</script>
<style scoped>
  .grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
  }
</style>
