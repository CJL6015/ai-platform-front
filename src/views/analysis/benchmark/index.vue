<template>
  <PageWrapper title="多生产线安全性自由对标分析">
    <a-card>
      <a-form :model="formData" @finish="submitForm"
        ><a-divider orientation="left">对标产线选择</a-divider>
        <a-form-item label="乳化炸药" name="line1">
          <a-checkbox-group v-model:value="formData.line1">
            <a-checkbox value="1" name="line1">荆门乳化产线</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="膨化炸药" name="line2">
          <a-checkbox-group v-model:value="formData.line2">
            <a-checkbox value="2" name="line2">荆门膨化产线</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="雷管产线" name="line3">
          <a-checkbox-group v-model:value="formData.line3">
            <a-checkbox value="3" name="line3">辽宁雷管二期A线</a-checkbox>
            <a-checkbox value="4" name="line3">辽宁雷管二期B线</a-checkbox>
          </a-checkbox-group>
        </a-form-item>

        <a-divider orientation="left">对标指标选择</a-divider>
        <a-form-item label="对标时间" name="time">
          <a-select style="width: 300px" v-model:value="formData.time">
            <a-select-option value="0">年度</a-select-option>
            <a-select-option value="1">季度</a-select-option>
            <a-select-option value="2">月度</a-select-option>
            <a-select-option value="3">天</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="总体指标" name="totalIndicators">
          <a-checkbox-group v-model:value="formData.totalIndicators">
            <a-checkbox value="1" name="totalIndicators">生产线平均安全评分</a-checkbox>
            <a-checkbox value="2" name="totalIndicators">超员平均扣分</a-checkbox>
            <a-checkbox value="3" name="totalIndicators">设备超限平均扣分</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="分项指标" name="subIndicators">
          <a-checkbox-group v-model:value="formData.subIndicators">
            <a-checkbox value="1" name="subIndicators">生产线平均超限次数</a-checkbox>
            <a-checkbox value="2" name="subIndicators">生产线各工序平均超员次数</a-checkbox>
            <a-checkbox value="3" name="subIndicators">生产线平均参数超限次数</a-checkbox>
            <a-checkbox value="4" name="subIndicators">生产线各设备超限次数</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="极值个数" name="extremeNumber">
          <a-select style="width: 300px" v-model:value="formData.extremeNumber">
            <a-select-option value="1">1</a-select-option>
            <a-select-option value="2">2</a-select-option>
            <a-select-option value="3">3</a-select-option>
            <a-select-option value="4">4</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="极值指标" name="extremeIndicators">
          <a-checkbox-group v-model:value="formData.extremeIndicators">
            <a-checkbox value="1" name="extremeIndicators">超员人数最高的工序及次数</a-checkbox>
            <a-checkbox value="2" name="extremeIndicators">超限次数最高的设备及次数</a-checkbox>
            <a-checkbox value="3" name="extremeIndicators">超限次数最高的传感器及次数</a-checkbox>
            <a-checkbox value="4" name="extremeIndicators">发生超员次数最高的时段及次数</a-checkbox>
            <a-checkbox value="5" name="extremeIndicators">参数超限次数最高的时段及次数</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="趋势指标" name="trend">
          <a-checkbox-group v-model:value="formData.trend">
            <a-checkbox value="1" name="trend">超员同比、环比增长率</a-checkbox>
            <a-checkbox value="2" name="trend">参数超限同比、环比增长率</a-checkbox>
            <a-checkbox value="3" name="trend">超员次数变化趋势(升/降)</a-checkbox>
            <a-checkbox value="4" name="trend">参数超限次数变化趋势(升/降)</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="相关性个数" name="correlationNumber">
          <a-select v-model:value="formData.correlationNumber" style="width: 300px">
            <a-select-option value="1" name="correlationNumber">1</a-select-option>
            <a-select-option value="2" name="correlationNumber">2</a-select-option>
            <a-select-option value="3" name="correlationNumber">3</a-select-option>
            <a-select-option value="4" name="correlationNumber">4</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="相关性指标" name="correlation">
          <a-checkbox-group v-model:value="formData.correlation">
            <a-checkbox value="1" name="correlation">传感器之间超限支持度</a-checkbox>
            <a-checkbox value="2" name="correlation">设备之间超限提升度</a-checkbox>
            <a-checkbox value="3" name="correlation">传感器之间超限提升度</a-checkbox>
            <a-checkbox value="4" name="correlation">设备之间超限提升度</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <a-divider orientation="left">报表设置</a-divider>
        <a-form-item label="是否带图">
          <a-switch v-model:checked="formData.pic" />
        </a-form-item>
        <a-divider />
        <a-form-item>
          <a-button type="primary" html-type="submit">生成对标报表</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </PageWrapper>
</template>
<script lang="ts">
  import { useECharts } from '/@/hooks/web/useECharts';
  import dayjs, { Dayjs } from 'dayjs';
  import { PageWrapper } from '/@/components/Page';
  import { ref, Ref, onMounted, toRaw, reactive } from 'vue';
  import { getReport } from '/@/api/data/benchmark';
  import { useDrawer } from '/@/components/Drawer';
  import Report from './Report.vue';
  import { BasicColumn } from '/@/components/Table';
  import { useGo } from '/@/hooks/web/usePage';
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
      Report,
    },
    setup() {
      type RangeValue = [Dayjs, Dayjs];
      const historyTime = ref<RangeValue>();
      const currentDate: Dayjs = dayjs();
      const lastMonthDate: Dayjs = currentDate.subtract(1, 'month');
      const rangeValue: RangeValue = [lastMonthDate, currentDate];
      historyTime.value = rangeValue;
      const [registerDraw, { openDrawer }] = useDrawer();

      const tableData = ref([]);
      const tableColumn = ref([]);
      const line1Name = {
        1: '荆门乳化产线',
      };
      const line2Name = {
        2: '荆门膨化产线',
      };
      const line3Name = {
        3: '辽宁雷管二期A线',
        4: '辽宁雷管二期B线',
      };
      const go = useGo();

      const submitForm = async () => {
        const params = toRaw(formData);
        console.log(params);
        const data = await getReport(params);
        console.log(data);
        tableData.value = data;
        const line1 = params.line1;
        const line2 = params.line2;
        const line3 = params.line3;
        let columns: BasicColumn[] = [
          {
            title: '指标',
            dataIndex: 'name',
          },
        ];
        if (line1.length > 0) {
          for (let p of line1) {
            columns.push({
              title: line1Name[p],
              dataIndex: 'P' + p,
            });
          }
        }
        if (line2.length > 0) {
          for (let p of line2) {
            columns.push({
              title: line2Name[p],
              dataIndex: 'P' + p,
            });
          }
        }
        if (line3.length > 0) {
          for (let p of line3) {
            columns.push({
              title: line3Name[p],
              dataIndex: 'P' + p,
            });
          }
        }
        localStorage.setItem('reportColumns', JSON.stringify(columns));
        localStorage.setItem('reportData', JSON.stringify(data));
        go(`/analysis/report`);
      };
      const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };

      const formData = reactive({
        pic: true,
        line1: [],
        line2: [],
        line3: [],
        time: '0',
        totalIndicators: [],
        subIndicators: [],
        extremeNumber: 3,
        extremeIndicators: [],
        trend: [],
        correlationNumber: 3,
        correlation: [],
      });

      return {
        historyTime,
        submitForm,
        layout,
        formData,
        tableData,
        registerDraw,
        tableColumn,
      };
    },
  };
</script>
