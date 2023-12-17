<template>
  <BasicModal title="选择生产线" :height="100">
    <a-form-item label="生产线" name="line">
      <a-select
        v-model:value="line"
        style="width: 90%"
        :options="lineData.map((line) => ({ value: line['id'], label: line['name'] }))"
      />
    </a-form-item>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { BasicModal } from '/@/components/Modal';
  import { lineOptionListApi } from '/@/api/warn/select';
  import { Form, Select, Button, Col, RangePicker } from 'ant-design-vue';

  export default defineComponent({
    components: {
      BasicModal,
      AFormItem: Form.Item,
      AForm: Form,
      ASelect: Select,
      AButton: Button,
      ACol: Col,
    },
    setup() {
      const line = ref(-1);
      const lineData = ref([]);
      onMounted(async () => {
        const plant = localStorage.getItem('plantId')
          ? parseInt(localStorage.getItem('plantId'))
          : -1;
        lineData.value = await lineOptionListApi(plant);
        line.value = lineData.value[0]['id'];
      });
      return {
        line,
        lineData,
      };
    },
  });
</script>
