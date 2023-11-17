<template>
  <PageWrapper title="定员超限多维对标分析">
    <a-card>
      <a-form>
        <a-form-item label="历史时间">
          <a-range-picker
            v-model:value="historyTime"
            show-time
            :placeholder="['开始时间', '结束时间']"
          />
        </a-form-item>
      </a-form>
      <a-divider />
      <div class="grid md:grid-cols-3 gap-4">
        <div
          ref="chartRef1"
          class="border border-gray-400"
          style="height: 380px; widows: 100%"
        ></div>
        <div
          ref="chartRef2"
          class="border border-gray-400"
          style="height: 380px; widows: 100%"
        ></div>
        <div
          ref="chartRef3"
          class="border border-gray-400"
          style="height: 380px; widows: 100%"
        ></div>
        <div
          ref="chartRef4"
          class="border border-gray-400"
          style="height: 380px; widows: 100%"
        ></div>
        <div
          ref="chartRef5"
          class="border border-gray-400"
          style="height: 380px; widows: 100%"
        ></div>
        <div
          ref="chartRef6"
          class="border border-gray-400"
          style="height: 380px; widows: 100%"
        ></div>
        <div>
          <Alert style="width: 100%; height: 220px" type="info">
            <template #message
              ><div style="width: 100%; height: 220px; overflow-y: scroll"
                ><span style="font-size: 18px; font-weight: bold"
                  >超限走势分析结论:<br />
                  1.制药工序超限整体呈现<span style="color: red; font-size: 22px">下降趋势</span
                  ><br />
                  2.装药工序1超限整体呈现<span style="color: red; font-size: 22px">上升趋势</span
                  ><br />
                  3.装药工序2超限整体呈现<span style="color: red; font-size: 22px">上升趋势</span
                  ><br />
                  4.包装工序超限整体呈现<span style="color: red; font-size: 22px">下降趋势</span
                  ><br />
                  5.装车工序超限整体呈现<span style="color: red; font-size: 22px">下降趋势</span
                  ><br />
                  6.整体超限次数呈现<span style="color: red; font-size: 22px">下降趋势</span
                  ><br /></span></div></template
          ></Alert>
        </div>
        <div>
          <Alert style="width: 100%; height: 220px" type="info">
            <template #message
              ><span style="font-size: 18px; font-weight: bold"
                >超限高峰时间和工序位置分析结论:<br />
                1.定员超限占比最高的工序为<span style="color: red; font-size: 22px">装药工序1</span
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
                1.定员超限单日最高为<span style="color: red; font-size: 22px">15次</span>,于<span
                  style="color: red; font-size: 22px"
                  >2023-03-06</span
                >发生<br />
                1.制药工序、装药工序1、装药工序2、包装工序、装车工序定员超限分别为<span
                  style="color: red; font-size: 22px"
                  >5次、2次、4次、2次、3次</span
                ><br /></span></template
          ></Alert>
        </div>
      </div>
    </a-card>
  </PageWrapper>
</template>
<script lang="ts">
  import { useECharts } from '/@/hooks/web/useECharts';
  import dayjs, { Dayjs } from 'dayjs';
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
      type RangeValue = [Dayjs, Dayjs];
      const value = ref<RangeValue>();
      const historyTime = ref<RangeValue>();
      const currentDate: Dayjs = dayjs();
      const lastMonthDate: Dayjs = currentDate.subtract(1, 'month');
      const rangeValue: RangeValue = [lastMonthDate, currentDate];
      historyTime.value = rangeValue;

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
            text: '各道工序超限趋势',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['制药工序', '装药工序1', '装药工序2', '包装工序', '装车工序'],
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
            data: [
              '2023-09-25',
              '2023-09-26',
              '2023-09-27',
              '2023-09-28',
              '2023-09-29',
              '2023-09-30',
              '2023-10-01',
            ],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: '制药工序',
              type: 'line',
              stack: 'Total',
              data: [120, 132, 101, 134, 90, 230, 210],
            },
            {
              name: '装药工序1',
              type: 'line',
              stack: 'Total',
              data: [220, 182, 191, 234, 290, 330, 310],
            },
            {
              name: '装药工序2',
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
              name: '包装工序',
              type: 'line',
              stack: 'Total',
              data: [820, 932, 901, 934, 1290, 1330, 1320],
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
          series: [
            {
              name: '超限份额',
              type: 'pie',
              radius: [0, 140],
              center: ['50%', '50%'],
              data: [
                { value: 30, name: '制药工序' },
                { value: 28, name: '装药工序1' },
                { value: 12, name: '装药工序2' },
                { value: 56, name: '包装工序' },
                { value: 21, name: '装车工序' },
              ],
            },
          ],
        });
      });
      onMounted(() => {
        setOptions3({
          title: {
            text: '工序超员峰值统计',
          },
          radar: {
            // shape: 'circle',
            indicator: [
              { name: '制药工序', max: 6500 },
              { name: '装药工序1', max: 16000 },
              { name: '装药工序2', max: 30000 },
              { name: '包装工序', max: 38000 },
              { name: '装车工序', max: 52000 },
            ],
          },
          series: [
            {
              name: '工序超员峰值统计',
              type: 'radar',
              data: [
                {
                  value: [4200, 3000, 20000, 3500, 50000, 18000],
                  name: 'Allocated Budget',
                },
              ],
            },
          ],
        });
      });

      onMounted(() => {
        setOptions4({
          title: {
            text: '生产线超员总次数',
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
            data: ['乳化3线'],
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
              data: [
                '2023-09-25',
                '2023-09-26',
                '2023-09-27',
                '2023-09-28',
                '2023-09-29',
                '2023-09-30',
                '2023-10-01',
              ],
            },
          ],
          yAxis: [
            {
              type: 'value',
            },
          ],
          series: [
            {
              name: '乳化3线',
              type: 'line',
              stack: 'Total',
              areaStyle: {},
              emphasis: {
                focus: 'series',
              },
              data: [120, 132, 101, 134, 90, 230, 210],
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
              data: [
                '10月05日14时',
                '10月05日15时',
                '10月05日16时',
                '10月05日17时',
                '10月05日18时',
                '10月05日19时',
                '10月05日20时',
              ],
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
          radar: {
            // shape: 'circle',
            indicator: [
              { name: '制药工序', max: 6500 },
              { name: '装药工序1', max: 16000 },
              { name: '装药工序2', max: 30000 },
              { name: '包装工序', max: 38000 },
              { name: '装车工序', max: 52000 },
            ],
            radius: 120,
            startAngle: 90,
            splitNumber: 4,
            shape: 'circle',
            axisName: {
              formatter: '【{value}】',
              color: '#428BD4',
            },
          },
          series: [
            {
              name: 'Budget vs spending',
              type: 'radar',
              data: [
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
        historyTime,
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
