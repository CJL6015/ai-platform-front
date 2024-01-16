<template>
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
          @change="onLineChange"
          :options="lineData.map((line) => ({ value: line['id'], label: line['name'] }))"
        />
      </a-form-item>
    </a-col>
    <a-col :md="6">
      <a-form-item label="历史时间" name="time">
        <a-range-picker v-model:value="formData.time" />
      </a-form-item>
    </a-col>
    <a-col :md="1">
      <a-form-item>
        <a-button type="primary" html-type="submit">确定</a-button>
      </a-form-item>
    </a-col>
  </a-form>
</template>
<script lang="ts">
  import { ref, onMounted } from 'vue';
  import dayjs from 'dayjs';
  import { Form, Select, Button, Col, RangePicker } from 'ant-design-vue';
  import { optionListApi, lineOptionListApi } from '/@/api/warn/select';

  export default {
    components: {
      AFormItem: Form.Item,
      AForm: Form,
      ASelect: Select,
      AButton: Button,
      ACol: Col,
      ARangePicker: RangePicker,
    },
    emits: ['optionSelected'],
    setup(_, context) {
      let plantData = ref([]);
      let lineData = ref([]);
      type RangeValue = [dayjs.Dayjs, dayjs.Dayjs];

      const currentDate: dayjs.Dayjs = dayjs();
      const lastMonthDate: dayjs.Dayjs = currentDate.subtract(1, 'month');
      const rangeValue: RangeValue = [lastMonthDate, currentDate];
      const formData = ref<{
        plant: number;
        line: number;
        time: RangeValue | null;
        plantName: String | null;
        lineName: String | null;
      }>({
        plant: -1,
        line: -1,
        time: rangeValue,
        plantName: null,
        lineName: null,
      });
      let options;
      onMounted(async () => {
        options = await optionListApi();
        plantData.value = options.plantOptions;
        lineData.value = options.linesOptions;
        formData.value.plant = plantData.value[0]['id'];
        formData.value.line = lineData.value[0]['id'];

        const lineName = options.linesOptions.find((item) => item.id === formData.value.line).name;

        formData.value.lineName = lineName;
        formData.value.plant = localStorage.getItem('plantId')
          ? parseInt(localStorage.getItem('plantId'))
          : -1;
        const plantName = options.plantOptions.find(
          (item) => item.id === formData.value.plant,
        ).name;
        formData.value.plantName = plantName;
        await onPlantChange(formData.value.plant);
        submitForm();
      });

      //点击查询按钮提交表单触发事件
      const submitForm = () => {
        const value = { ...formData.value };
        context.emit('optionSelected', value);
      };
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
      const labelCol = { style: { width: '80px' } };
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

      const onLineChange = (value) => {
        formData.value.line = value;
        const lineName = options.linesOptions.find((item) => item.id === formData.value.line).name;
        formData.value.lineName = lineName;
      };

      return {
        formData,
        plantData,
        lineData,
        submitForm,
        onFinishFailed,
        labelCol,
        onPlantChange,
        onLineChange,
      };
    },
  };
</script>
