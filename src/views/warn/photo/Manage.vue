<template>
  <a-form layout="inline" :model="formData" :label-col="labelCol" @finish="submitForm">
    <a-col :md="6">
      <a-form-item label="公司" name="plant">
        <a-select
          v-model:value="formData.plant"
          style="width: 100%"
          @change="onPlantChange"
          :options="plantData.map((plant) => ({ value: plant['id'], label: plant['name'] }))"
        />
      </a-form-item>
    </a-col>
    <a-col :md="6">
      <a-form-item label="生产线" name="line">
        <a-select
          v-model:value="formData.line"
          style="width: 100%"
          :options="lineData.map((line) => ({ value: line['id'], label: line['name'] }))"
        />
      </a-form-item>
    </a-col>
    <a-col :md="3">
      <a-form-item>
        <a-button type="primary" html-type="submit">确定</a-button>
        <a-button type="primary" style="margin-left: 10px" @click="updateConfig">保存</a-button>
      </a-form-item>
    </a-col>
    <a-col :md="6">
      <HorizontalScrollText />
    </a-col>
  </a-form>
  <a-divider orientation="left"> 巡检抓拍数据管理 </a-divider>
  <a-form :model="manageData" :label-col="labelCol">
    <a-row :gutter="30" class="custom-row-gap">
      <a-col :md="9">
        <a-form-item label="巡检抓拍周期">
          <a-form-item name="input-number" no-style>
            <a-input-number
              v-model:value="manageData.inspectionCaptureInterval"
              :min="1"
              :max="24"
              addon-after="小时"
            />
          </a-form-item> </a-form-item
      ></a-col>
      <a-col :md="15">
        <a-alert
          message="定义: 每天每间隔多长时间涨检抓拍一次，默认1小时。"
          type="info"
          show-icon
        />
      </a-col>
    </a-row>
    <a-row :gutter="30" class="custom-row-gap">
      <a-col :md="9">
        <a-form-item label="巡检抓拍模式">
          <a-select v-model:value="manageData.inspectionCaptureMode">
            <a-select-option value="0">随机</a-select-option>
            <a-select-option value="1">定巡</a-select-option>
          </a-select>
        </a-form-item></a-col
      >
      <a-col :md="15">
        <a-alert type="info" show-icon class="custom-alert">
          <template #message>
            随机模式:在每个巡检抓拍周期内，随机一个时间抓拍。<br />定巡模式:在每个巡检抓拍周期内，固定一时间抓拍。
          </template>
        </a-alert>
      </a-col>
    </a-row>
    <a-row :gutter="30" class="custom-row-gap">
      <a-col :md="9">
        <a-form-item label="历史照片存储时间">
          <a-form-item name="input-number" no-style>
            <a-input-number
              v-model:value="manageData.historicalPhotoRetentionPeriod"
              :min="1"
              :max="6"
              addon-after="月"
            />
          </a-form-item>
        </a-form-item>
      </a-col>
      <a-col :md="15">
        <a-alert message="定义:每天每间隔多长时闻巡检抓拍一次，默认3个月。" type="info" show-icon />
      </a-col>
    </a-row>
    <a-row :gutter="30" class="custom-row-gap">
      <a-col :md="7">
        <a-form-item label="系统冻结时间">
          <a-range-picker
            v-model:value="value"
            show-time
            :placeholder="['冻结开始时间', '冻结结束时间']"
          />
        </a-form-item>
      </a-col>
      <a-col :md="2"><a-button @click="freeze">冻结</a-button></a-col>
      <a-col :md="15">
        <a-alert
          message="定义:特殊情况下(如领导视察期间)出现超员，这个期间的超员次数不计入考核，但仍统计。"
          type="info"
          show-icon
        />
      </a-col>
    </a-row>
    <a-divider orientation="left"> 历史数据查询 </a-divider>
    <a-row :gutter="30" class="custom-row-gap">
      <a-col :md="9" style="padding-top: 10px">
        <a-form-item label="历史时间">
          <a-range-picker
            v-model:value="historyTime"
            show-time
            :placeholder="['冻结开始时间', '冻结结束时间']"
            @change="historyTimeChange"
          />
        </a-form-item>
        <div ref="chartRef" :style="{ height, width }"></div>
      </a-col>
      <a-col :md="15">
        <BasicTable @register="registerTable">
          <template #bodyCell="{ column, record, text }">
            <template v-if="column.key === 'photo'">
              <TableImg :size="60" :imgList="text" />
            </template>
            <template v-else-if="column.key === 'freeze' && record.freeze">
              <Tag color="green">
                {{ '解冻' }}
              </Tag>
            </template>
            <template v-else-if="column.key === 'freeze' && !record.freeze">
              <Tag color="red">
                {{ '冻结' }}
              </Tag>
            </template>
          </template>
        </BasicTable>
      </a-col>
    </a-row>
  </a-form>
</template>
<script lang="ts">
  import {
    Form,
    FormItem,
    InputNumber,
    Select,
    SelectOption,
    Col,
    Tag,
    Row,
    Alert,
    Button,
    RangePicker,
    Divider,
  } from 'ant-design-vue';
  import { ref, Ref, PropType, onMounted, toRaw } from 'vue';
  import dayjs, { Dayjs } from 'dayjs';
  import { useECharts } from '/@/hooks/web/useECharts';

  import { BasicTable, useTable, TableImg } from '/@/components/Table';
  import {
    getInspectionConfig,
    getInspectionHistory,
    updateInspectionConfig,
    freezeInspection,
  } from '/@/api/data/config';
  import { columns } from './data';
  import { optionListApi, lineOptionListApi } from '/@/api/warn/select';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default {
    components: {
      Tag,
      ARow: Row,
      ACol: Col,
      AForm: Form,
      AButton: Button,
      ASelect: Select,
      AFormItem: FormItem,
      AInputNumber: InputNumber,
      ASelectOption: SelectOption,
      AAlert: Alert,
      ADivider: Divider,
      ARangePicker: RangePicker,
      BasicTable,
      TableImg,
    },
    props: {
      width: {
        type: String as PropType<string>,
        default: '100%',
      },
      height: {
        type: String as PropType<string>,
        default: '250px',
      },
      line: {
        type: String as PropType<string>,
        default: '1',
      },
    },
    setup() {
      const { createMessage } = useMessage();
      let plantData = ref([]);
      let lineData = ref([]);
      const formData = ref({
        plant: -1,
        line: -1,
      });
      const manageData = ref({
        inspectionCaptureInterval: 1,
        inspectionCaptureMode: '0',
        historicalPhotoRetentionPeriod: 1,
      });
      type RangeValue = [Dayjs, Dayjs];
      const value = ref<RangeValue>();
      const historyTime = ref<RangeValue>();
      const currentDate: Dayjs = dayjs();
      const lastMonthDate: Dayjs = currentDate.subtract(1, 'month');
      const rangeValue: RangeValue = [lastMonthDate, currentDate];
      historyTime.value = rangeValue;
      const freeze = async function () {
        const [startDate, endDate] = value.value;
        const startDateDate = startDate.toDate();
        const endDateDate = endDate.toDate();
        const time = {
          st: dayjs(startDateDate).format('YYYY-MM-DD HH:mm:ss'),
          et: dayjs(endDateDate).format('YYYY-MM-DD HH:mm:ss'),
        };
        const res = await freezeInspection(formData.value.line, time);
        if (res) {
          createMessage.success('冻结成功 ');
        } else {
          createMessage.error('冻结异常,请重试');
        }
      };
      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

      const setChart = function (chartValue) {
        setOptions({
          legend: {
            data: ['冻结'],
            icon: 'rect',
            top: '20px',
            right: '20px',
            itemStyle: {
              color: '#c23531',
            },
          },
          tooltip: {
            trigger: 'axis',
            triggerOn: 'click',
            formatter: function (params) {
              console.log(params);
              if (params[0].data == 1) {
                return '<img src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>';
              }
            },
          } as any,
          dataZoom: [{}],
          color: ['#c23531'],
          xAxis: {
            data: chartValue.timestamps,
            axisTick: {
              show: false,
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: '#333',
              },
            },
          },
          yAxis: {
            name: '冻结状态',
            type: 'value',
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            axisLine: {
              show: true,
            },
            splitLine: {
              show: false,
            },
            show: true,
            max: 1.5,
          },
          series: [
            {
              name: '冻结',
              data: chartValue.values,
              type: 'line',
              symbolSize: 0,
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 30,
                    color: '#c23531',
                  },
                },
              },
              emphasis: {
                focus: 'series',
              },
            } as any,
          ],
        });
      };

      const [registerTable, methods] = useTable({
        title: '测点详情',
        columns,
        formConfig: {
          labelWidth: 120,
        },
        pagination: true,
        bordered: true,
        showIndexColumn: true,
        canResize: false,
        size: 'small',
        scroll: { y: 250 },
      });
      onMounted(async () => {
        const options = await optionListApi();
        plantData.value = options.plantOptions;
        lineData.value = options.linesOptions;
        formData.value.plant = plantData.value[0]['id'];
        formData.value.line = lineData.value[0]['id'];
        setConfig(lineData.value[0]['id']);
        getHistory(lineData.value[0]['id']);
      });
      const submitForm = () => {
        setConfig(formData.value.line);
        getHistory(formData.value.line);
      };
      const historyTimeChange = () => {
        getHistory(formData.value.line);
      };

      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
      const setConfig = async function (id) {
        const config = await getInspectionConfig(id);
        manageData.value.inspectionCaptureInterval = config.inspectionCaptureInterval;
        manageData.value.inspectionCaptureMode = `${config.inspectionCaptureMode}`;
        manageData.value.historicalPhotoRetentionPeriod = config.historicalPhotoRetentionPeriod;
      };
      const getHistory = async function (id) {
        const [startDate, endDate] = historyTime.value;
        const startDateDate = startDate.toDate();
        const endDateDate = endDate.toDate();
        const time = {
          st: dayjs(startDateDate).format('YYYY-MM-DD HH:mm:ss'),
          et: dayjs(endDateDate).format('YYYY-MM-DD HH:mm:ss'),
        };
        const history = await getInspectionHistory(id, time);
        console.log(history);
        setChart(history.chartValue);
        methods.setTableData(history.tableData);
      };
      const updateConfig = async () => {
        const config = toRaw(manageData.value);
        config['lineId'] = formData.value.line;
        console.log(config);
        const res = await updateInspectionConfig(config);
        if (res) {
          createMessage.success('更新成功');
        } else {
          createMessage.error('更新失败,请重试');
        }
      };
      const onPlantChange = async (value) => {
        lineData.value = await lineOptionListApi(value);
        formData.value.line = lineData.value[0]['id'];
      };

      const labelCol = { style: { width: '120px' } };

      return {
        manageData,
        labelCol,
        value,
        chartRef,
        registerTable,
        formData,
        plantData,
        lineData,
        onPlantChange,
        submitForm,
        onFinishFailed,
        updateConfig,
        freeze,
        historyTime,
        historyTimeChange,
      };
    },
  };
</script>
<style>
  .custom-row-gap {
    margin-bottom: 16px;
  }
</style>
