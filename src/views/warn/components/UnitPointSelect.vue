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
    <a-col :md="6">
      <a-form-item label="测点">
        <a-select
          v-model:value="formData.point"
          style="width: 100%"
          :options="typeOptions.map((type) => ({ value: type['id'], label: type['name'] }))"
        />
      </a-form-item>
    </a-col>
    <a-col :md="3">
      <a-form-item>
        <a-button type="primary" html-type="submit">确定</a-button>
        <a-button type="primary" style="margin-left: 10px">保存</a-button>
      </a-form-item>
    </a-col>
  </a-form>
</template>
<script lang="ts">
  import { ref, onMounted } from 'vue';
  import { Form, Select, Button, Col } from 'ant-design-vue';
  import { optionListApi, lineOptionListApi } from '/@/api/warn/select';

  export default {
    components: {
      AFormItem: Form.Item,
      AForm: Form,
      ASelect: Select,
      AButton: Button,
      ACol: Col,
    },
    emits: ['optionSelected'],
    setup(_, context) {
      let plantData = ref([]);
      let lineData = ref([]);
      const formData = ref({
        plant: -1,
        line: -1,
        point: '',
      });

      const typeOptions = [
        { id: '', name: '全部' },
        { id: '1', name: '传感器类别' },
        { id: '2', name: '传感器所属设备' },
      ];

      onMounted(async () => {
        const options = await optionListApi();
        plantData.value = options.plantOptions;
        lineData.value = options.linesOptions;
        console.log(options);
        formData.value.plant = plantData.value[0]['id'];
        formData.value.line = lineData.value[0]['id'];
      });
      //第一次加载时传递参数
      context.emit('optionSelected', formData.value);
      //点击查询按钮提交表单触发事件
      const submitForm = (values) => {
        context.emit('optionSelected', values);
      };
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
      const labelCol = { style: { width: '80px' } };
      const onPlantChange = async (value) => {
        lineData.value = await lineOptionListApi(value);
        formData.value.line = lineData.value[0]['id'];
      };

      return {
        formData,
        plantData,
        lineData,
        submitForm,
        onFinishFailed,
        labelCol,
        onPlantChange,
        typeOptions,
      };
    },
  };
</script>
