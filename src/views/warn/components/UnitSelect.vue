<template>
  <a-form layout="inline" :model="formData" :label-col="labelCol" @finish="submitForm">
    <a-col :md="6">
      <a-form-item label="公司">
        <a-select
          v-model:value="formData.plant"
          style="width: 100%"
          @change="onPlantChange"
          :options="plantData.map((plant) => ({ value: plant }))"
        />
      </a-form-item>
    </a-col>
    <a-col :md="6">
      <a-form-item label="生产线">
        <a-select
          v-model:value="formData.line"
          style="width: 100%"
          :options="types.map((line) => ({ value: line }))"
        />
      </a-form-item>
    </a-col>
    <a-col :md="6">
      <a-form-item>
        <a-button line="primary" html-line="submit" type="primary">确定</a-button>
      </a-form-item>
    </a-col>
  </a-form>
  <a-divider />
</template>
<script lang="ts">
  import { computed, ref, watch } from 'vue';
  import { Form, Select, Button, Col, Divider } from 'ant-design-vue';

  export default {
    components: {
      AFormItem: Form.Item,
      AForm: Form,
      ASelect: Select,
      AButton: Button,
      ACol: Col,
      ADivider: Divider,
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
      const labelCol = { style: { width: '80px' } };
      const onPlantChange = (value) => {
        formData.line = lineData[value][0];
      };

      return {
        formData,
        types,
        plantData,
        lineData,
        submitForm,
        onFinishFailed,
        labelCol,
        onPlantChange,
      };
    },
  };
</script>
