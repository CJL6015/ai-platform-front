<template>
  <PageWrapper title="多生产线安全性自由对标分析">
    <a-card>
      <a-form :model="formData"
        ><a-divider orientation="left">对标产线选择</a-divider>
        <a-form-item label="乳化炸药">
          <a-checkbox-group>
            <a-checkbox value="1" name="type">荆门乳化产线</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="膨化炸药">
          <a-checkbox-group>
            <a-checkbox value="1" name="type">荆门膨化产线</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="雷管产线">
          <a-checkbox-group>
            <a-checkbox value="1" name="type">辽宁雷管二期A线</a-checkbox>
            <a-checkbox value="2" name="type">辽宁雷管二期B线</a-checkbox>
          </a-checkbox-group>
        </a-form-item>

        <a-divider orientation="left">对标指标选择</a-divider>
        <a-form-item label="对标时间">
          <a-select value="年度" style="width: 300px">
            <a-select-option value="年度">年度</a-select-option>
            <a-select-option value="季度">季度</a-select-option>
            <a-select-option value="月度">月度</a-select-option>
            <a-select-option value="天">天</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="总体指标">
          <a-checkbox-group>
            <a-checkbox value="1" name="type">生产线平均安全评分</a-checkbox>
            <a-checkbox value="2" name="type">超员平均扣分</a-checkbox>
            <a-checkbox value="2" name="type">设备超限平均扣分</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="分项指标">
          <a-checkbox-group>
            <a-checkbox value="1" name="type">生产线平均超员次数</a-checkbox>
            <a-checkbox value="2" name="type">生产线各工序平均超员次数</a-checkbox>
            <a-checkbox value="3" name="type">生产线平均参数超限次数</a-checkbox>
            <a-checkbox value="4" name="type">生产线各设备超限次数</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="极值个数">
          <a-select value="3" style="width: 300px">
            <a-select-option value="1">1</a-select-option>
            <a-select-option value="2">2</a-select-option>
            <a-select-option value="3">3</a-select-option>
            <a-select-option value="4">4</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="极值指标">
          <a-checkbox-group>
            <a-checkbox value="1" name="type">超员人数最高的工序及次数</a-checkbox>
            <a-checkbox value="2" name="type">超限次数最高的设备及次数</a-checkbox>
            <a-checkbox value="3" name="type">超限次数最高的传感器及次数</a-checkbox>
            <a-checkbox value="4" name="type">发生超员次数最高的时段及次数</a-checkbox>
            <a-checkbox value="4" name="type">参数超限次数最高的时段及次数</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="趋势指标">
          <a-checkbox-group>
            <a-checkbox value="1" name="type">超员同比、环比增长率</a-checkbox>
            <a-checkbox value="2" name="type">参数超限同比、环比增长率</a-checkbox>
            <a-checkbox value="3" name="type">超员次数变化趋势(升/降)</a-checkbox>
            <a-checkbox value="4" name="type">参数超限次数变化趋势(升/降)</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="相关性个数">
          <a-select value="3" style="width: 300px">
            <a-select-option value="1">1</a-select-option>
            <a-select-option value="2">2</a-select-option>
            <a-select-option value="3">3</a-select-option>
            <a-select-option value="4">4</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="相关性指标">
          <a-checkbox-group>
            <a-checkbox value="1" name="type">传感器之间超限支持度</a-checkbox>
            <a-checkbox value="2" name="type">设备之间超限提升度</a-checkbox>
            <a-checkbox value="3" name="type">传感器之间超限提升度</a-checkbox>
            <a-checkbox value="4" name="type">设备之间超限提升度</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-divider orientation="left">报表设置</a-divider>
        <a-form-item label="是否带图">
          <a-switch v-model:checked="formData.pic" />
        </a-form-item>
      </a-form>
      <a-divider />

      <a-form-item>
        <a-button type="primary">生成对标报表</a-button>
      </a-form-item>
    </a-card>
  </PageWrapper>
</template>
<script lang="ts">
  import { useECharts } from '/@/hooks/web/useECharts';
  import dayjs, { Dayjs } from 'dayjs';
  import { PageWrapper } from '/@/components/Page';
  import { ref, Ref, onMounted } from 'vue';
  import {
    Form,
    FormItem,
    Divider,
    Card,
    Button,
    Select,
    SelectOption,
    CheckboxGroup,
    Checkbox,
    Switch,
  } from 'ant-design-vue';

  export default {
    components: {
      PageWrapper,
      ACard: Card,
      AForm: Form,
      AFormItem: FormItem,
      ADivider: Divider,
      AButton: Button,
      ASelect: Select,
      ASelectOption: SelectOption,
      ACheckboxGroup: CheckboxGroup,
      ACheckbox: Checkbox,
      ASwitch: Switch,
    },
    setup() {
      type RangeValue = [Dayjs, Dayjs];
      const historyTime = ref<RangeValue>();
      const currentDate: Dayjs = dayjs();
      const lastMonthDate: Dayjs = currentDate.subtract(1, 'month');
      const rangeValue: RangeValue = [lastMonthDate, currentDate];
      historyTime.value = rangeValue;

      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

      onMounted(() => {
        setOptions({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          legend: {},
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
          yAxis: [
            {
              type: 'value',
            },
            {
              type: 'value',
            },
          ],
          series: [
            {
              name: '当日参数超限扣分',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [320, 302, 301, 334, 390, 330, 320],
            },
            {
              name: '当日超员扣分',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: [120, 132, 101, 134, 90, 230, 210],
            },
            {
              name: '当日生产线综合得分',
              type: 'line',
              yAxisIndex: 1,
              data: [120, 132, 101, 134, 90, 230, 210],
            },
          ],
        });
      });

      const historyTimeChange = () => {};
      const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };

      const formData = ref({
        pic: true,
      });

      return {
        historyTime,
        historyTimeChange,
        chartRef,
        layout,
        formData,
      };
    },
  };
</script>
