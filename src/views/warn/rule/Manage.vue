<template>
  <a-form :model="manageData" layout="inline" :label-col="labelCol">
    <a-col :md="8">
      <a-form-item label="巡检抓拍周期设定">
        <a-form-item name="input-number" no-style>
          <a-input-number v-model:value="manageData.cycles" :min="1" :max="24" addon-after="小时" />
        </a-form-item> </a-form-item
    ></a-col>
    <a-col :md="8">
      <a-form-item label="巡检抓拍模式设定">
        <a-select v-model:value="manageData.mode">
          <a-select-option value="随机">随机</a-select-option>
          <a-select-option value="定巡">定巡</a-select-option>
        </a-select>
      </a-form-item></a-col
    ><a-col :md="8">
      <a-form-item label="巡检抓拍周期">
        <a-form-item name="input-number" no-style>
          <a-input-number v-model:value="manageData.storage" :min="1" :max="6" addon-after="月" />
        </a-form-item>
      </a-form-item>
    </a-col>
  </a-form>
</template>
<script lang="ts">
  import { Form, FormItem, InputNumber, Select, SelectOption, Col } from 'ant-design-vue';
  import { reactive } from 'vue';

  export default {
    components: {
      ACol: Col,
      AForm: Form,
      ASelect: Select,
      AFormItem: FormItem,
      AInputNumber: InputNumber,
      ASelectOption: SelectOption,
    },
    setup() {
      const labelCol = { style: { width: '150px' } };
      const manageData = reactive<Record<string, any>>({
        cycles: 1,
        mode: '随机',
        storage: 1,
      });
      return {
        manageData,
        labelCol,
      };
    },
  };
</script>
