<template>
  <PageWrapper title="历史运行数据管理" contentFullHeight>
    <a-card>
      <UnitSelect />
      <a-divider />
      <Pie /> </a-card
    ><a-card style="margin-top: 10px">
      <PointTable />
    </a-card>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import UnitSelect from '../components/UnitSelect.vue';
  import { Card, Divider } from 'ant-design-vue';
  import Pie from './Pie.vue';
  import PointTable from './PointTable.vue';

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);

  export default defineComponent({
    components: {
      PageWrapper,
      UnitSelect,
      ACard: Card,
      ADivider: Divider,
      Pie,
      PointTable,
    },
    setup() {
      return {
        loading,
      };
    },
  });
</script>
