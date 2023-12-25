<template>
  <PageWrapper title="成品仓库超员监测">
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
          <a-form-item label="仓库" name="line">
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
            <a-date-picker v-model:value="formData.time" />
          </a-form-item>
        </a-col>
        <a-col :md="1">
          <a-form-item>
            <a-button type="primary" html-type="submit">确定</a-button>
          </a-form-item>
        </a-col>
      </a-form>
      <a-divider />
      <a-alert style="width: 60%; margin: 10px" type="info" show-icon>
        <template #message
          ><span style="font-size: 20px; font-weight: bold"
            >本日超员次数<span style="color: red; font-size: 22px">1</span>&nbsp;
          </span></template
        ></a-alert
      >
      <a-row :gutter="30" class="custom-row-gap">
        <a-col :md="6">
          <a-form-item label="相机1识别人数">
            <a-form-item name="input-number" no-style>
              <a-input-number value="5" addon-after="人" disabled />
            </a-form-item>
          </a-form-item>
        </a-col>
        <a-col :md="6">
          <a-form-item label="相机2识别人数">
            <a-form-item name="input-number" no-style>
              <a-input-number value="5" addon-after="人" disabled />
            </a-form-item>
          </a-form-item>
        </a-col>
        <a-col :md="6">
          <a-form-item label="定员人数">
            <a-form-item name="input-number" no-style>
              <a-input-number value="8" addon-after="人" disabled />
            </a-form-item>
          </a-form-item>
        </a-col>
        <a-col :md="6">
          <a-form-item label="超员人数">
            <a-form-item name="input-number" no-style>
              <a-input-number value="0" addon-after="人" disabled />
            </a-form-item>
          </a-form-item>
        </a-col>
      </a-row>

      <a-divider orientation="left">相机拍摄画面</a-divider>
      <div class="grid md:grid-cols-2 gap-2">
        <a-card style="width: 95%">
          <template #cover>
            <a-image
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              style="height: 400px"
            />
          </template>
          <a-card-meta title="相机1拍摄画面" />
        </a-card>
        <a-card style="width: 95%">
          <template #cover>
            <a-image
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              style="height: 400px"
            />
          </template>
          <a-card-meta title="相机2拍摄画面" />
        </a-card>
      </div>
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
    Alert,
  } from 'ant-design-vue';
  import { optionListApi, lineOptionListApi } from '/@/api/warn/select';
  import dayjs from 'dayjs';

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
      AInputNumber: InputNumber,
      AAvatar: Avatar,
      ASpace: Space,
      ACardMeta: CardMeta,
      AImage: Image,
      AAlert: Alert,
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

      const labelCol = { style: { width: '80px' } };

      const submitForm = () => {
        const value = { ...formData.value };
      };

      return { formData, plantData, submitForm, onPlantChange, labelCol, lineData };
    },
  };
</script>
