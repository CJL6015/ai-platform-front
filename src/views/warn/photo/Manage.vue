<template>
  <a-divider orientation="left"> 巡检抓拍数据管理 </a-divider>
  <a-form :model="manageData" :label-col="labelCol">
    <a-row :gutter="30" class="custom-row-gap">
      <a-col :md="9">
        <a-form-item label="巡检抓拍周期">
          <a-form-item name="input-number" no-style>
            <a-input-number
              v-model:value="manageData.cycles"
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
          <a-select v-model:value="manageData.mode">
            <a-select-option value="随机">随机</a-select-option>
            <a-select-option value="定巡">定巡</a-select-option>
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
            <a-input-number v-model:value="manageData.storage" :min="1" :max="6" addon-after="月" />
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
      <a-col :md="2"><a-button>冻结</a-button></a-col>
      <a-col :md="15">
        <a-alert
          message="定义:特殊情况下(如领导视察期间)出现超员，这个期间的超员次数不计入考核，但仍统计。"
          type="info"
          show-icon
        />
      </a-col>
    </a-row>
    <a-divider orientation="left"> 历史数据 </a-divider>
    <a-row :gutter="30" class="custom-row-gap">
      <a-col :md="9" style="padding-top: 10px">
        <a-form-item label="历史时间">
          <a-range-picker
            v-model:value="value"
            show-time
            :placeholder="['冻结开始时间', '冻结结束时间']"
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
                {{ '未冻结' }}
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
  import { reactive, ref, Ref, PropType, onMounted } from 'vue';
  import type { Dayjs } from 'dayjs';
  import { useECharts } from '/@/hooks/web/useECharts';

  import { BasicTable, useTable, TableImg } from '/@/components/Table';
  import { getHistoryList } from '/@/api/data/table';
  import { columns } from './data';

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
    },
    setup() {
      const [registerTable] = useTable({
        title: '测点详情',
        api: getHistoryList,
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

      const startDate = new Date();
      const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);

      const timestamps: any[] = []; // 使用 number 类型的数组
      const values: (any | null)[] = []; // 使用联合类型表示值数组

      const interval = 60 * 60 * 1000;

      for (
        let timestamp = startDate.getTime();
        timestamp < endDate.getTime();
        timestamp += interval
      ) {
        timestamps.push(timestamp);
        const randomValue = Math.random() < 0.5 ? null : 1;
        values.push(randomValue);
      }

      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
      onMounted(() => {
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
          dataZoom: [
            {
              start: timestamps[0],
              end: timestamps[timestamps.length - 1],
            },
          ],
          color: ['#c23531'],
          xAxis: {
            data: timestamps,
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
              data: values,
              type: 'line',
              symbolSize: 0,
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 30,
                    color: '#c23531',
                  },
                },
              } as any,
            },
          ],
        });
      });

      const labelCol = { style: { width: '120px' } };
      const manageData = reactive<Record<string, any>>({
        cycles: 1,
        mode: '随机',
        storage: 1,
      });
      type RangeValue = [Dayjs, Dayjs];
      const value = ref<RangeValue>();
      return {
        manageData,
        labelCol,
        value,
        chartRef,
        registerTable,
      };
    },
  };
</script>
<style>
  .custom-row-gap {
    margin-bottom: 16px;
  }
</style>
