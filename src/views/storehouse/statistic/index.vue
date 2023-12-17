<template>
  <PageWrapper title="成品仓库存量超量统计">
    <a-card>
      <a-form layout="inline" :model="formData" :label-col="labelCol" @finish="submitForm">
        <a-col :md="6">
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
        <a-col :md="6">
          <a-form-item label="生产线" name="line">
            <a-select
              v-model:value="formData.line"
              style="width: 100%"
              disabled
              :options="lineData.map((line) => ({ value: line['id'], label: line['name'] }))"
            />
          </a-form-item>
        </a-col>
        <a-col :md="3">
          <a-form-item label="时间选择" name="time">
            <a-date-picker v-model:value="formData.time" picker="month" />
          </a-form-item>
        </a-col>
        <a-col :md="1">
          <a-form-item>
            <a-button type="primary" html-type="submit">确定</a-button>
          </a-form-item>
        </a-col>
      </a-form>
      <a-divider />
      <BasicTable @register="registerTable" />
    </a-card> </PageWrapper
></template>

<script lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { ref, onMounted } from 'vue';
  import {
    Form,
    Select,
    Row,
    Col,
    Card,
    CardMeta,
    InputNumber,
    Divider,
    Avatar,
    Button,
    DatePicker,
    Space,
    Image,
  } from 'ant-design-vue';
  import { optionListApi, lineOptionListApi } from '/@/api/warn/select';
  import dayjs from 'dayjs';
  import { columns } from './point.data';
  import { BasicTable, useTable } from '/@/components/Table';
  import { jsonToSheetXlsx } from '/@/components/Excel';

  export default {
    components: {
      PageWrapper,
      ACard: Card,
      ARow: Row,
      ACol: Col,
      AFormItem: Form.Item,
      AForm: Form,
      ASelect: Select,
      AButton: Button,
      ADatePicker: DatePicker,
      ADivider: Divider,
      BasicTable,
    },
    setup() {
      let plantData = ref([]);
      let lineData = ref([]);

      const currentDate: dayjs.Dayjs = dayjs();
      const formData = ref({
        plant: -1,
        line: 1,
        time: currentDate,
        plantName: null,
      });
      const [registerTable, methods] = useTable({
        title: '当月库存量超限天数',
        columns,
        formConfig: {
          labelWidth: 120,
        },
        pagination: true,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
      });
      let options;
      onMounted(async () => {
        options = await optionListApi();
        plantData.value = options.plantOptions;
        formData.value.plant = localStorage.getItem('plantId')
          ? parseInt(localStorage.getItem('plantId'))
          : -1;

        const lineName = options.linesOptions.find((item) => item.id === formData.value.line).name;

        formData.value.plant = localStorage.getItem('plantId')
          ? parseInt(localStorage.getItem('plantId'))
          : -1;
        const plantName = options.plantOptions.find(
          (item) => item.id === formData.value.plant,
        ).name;
        formData.value.plantName = plantName;
        await onPlantChange(formData.value.plant);
      });

      const onPlantChange = async (value) => {
        lineData.value = await lineOptionListApi(value);
        formData.value.line = parseInt(localStorage.getItem('lineId'));
        options.linesOptions = lineData.value;
        const plantName = options.plantOptions.find(
          (item) => item.id === formData.value.plant,
        ).name;
        const lineName = options.linesOptions.find((item) => item.id === formData.value.line).name;
        formData.value.plantName = plantName;
        formData.value.lineName = lineName;
      };
      function aoaToExcel() {
        const data = [
          {
            id: 'ID',
            time: '时间',
            limit: '安全定量(吨)',
            stock: '库存量(吨)',
            exceed: '是否超限',
          },
        ];
        jsonToSheetXlsx({
          data,
          header: {
            id: 'ID',
            time: '时间',
            limit: '安全定量(吨)',
            stock: '库存量(吨)',
            exceed: '是否超限',
          },
          filename: '当月库存量超限天数.xlsx',
        });
      }

      const labelCol = { style: { width: '80px' } };

      const submitForm = () => {
        aoaToExcel();
      };

      return { formData, plantData, lineData, submitForm, labelCol, onPlantChange, registerTable };
    },
  };
</script>
