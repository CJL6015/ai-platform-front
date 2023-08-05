<template>
  <PageWrapper title="模型中心" contentFullHeight>
    <a-card>
      <UnitSelect />
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
  import { Card } from 'ant-design-vue';
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
