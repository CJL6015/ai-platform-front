<template>
  <PageWrapper title="历史运行数据管理" contentFullHeight>
    <Card>
      <UnitSelect @option-selected="handleOptionSelected" />
      <Divider />
      <Pie :lines="lines" /> </Card
    ><Card style="margin-top: 10px">
      <PointTable />
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
  const lines = ref<Number | null>(null);

  const handleOptionSelected = (values) => {
    plant.value = values['plant'];
    lines.value = values['line'];
    console.log(values);
  };
</script>
