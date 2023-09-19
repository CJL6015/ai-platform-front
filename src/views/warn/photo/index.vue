<template>
  <PageWrapper title="巡检抓拍数据管理" contentFullHeight>
    <a-card> <Manage /> </a-card>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import Manage from './Manage.vue';
  import { Card } from 'ant-design-vue';

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);

  export default defineComponent({
    components: {
      PageWrapper,
      ACard: Card,
      Manage,
    },
    setup() {
      return {
        loading,
      };
    },
  });
</script>
