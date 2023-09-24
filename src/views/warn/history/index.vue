<template>
  <PageWrapper title="历史运行数据管理" contentFullHeight>
    <Card>
      <UnitSelect @option-selected="handleOptionSelected" />
      <Divider />
      <Pie :selectData="formData" />
    </Card>
    <Card style="margin-top: 10px">
      <PointTable :selectData="formData" />
    </Card>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import UnitSelect from '../components/UnitSelect.vue';
  import { Card, Divider } from 'ant-design-vue';
  import Pie from './Pie.vue';
  import PointTable from './PointTable.vue';

  const plant = ref(null);
  const formData = ref<any>(null);

  const handleOptionSelected = (values) => {
    plant.value = values['plant'];
    formData.value = values;
  };
</script>
