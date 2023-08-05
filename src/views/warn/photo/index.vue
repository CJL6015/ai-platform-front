<template>
  <PageWrapper title="模型中心" contentFullHeight>
    <a-card> <UnitSelect /> <Manage /><PhotoCard /> </a-card>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import UnitSelect from '../components/UnitSelect.vue';
  import Manage from './Manage.vue';
  import { Card } from 'ant-design-vue';
  import PhotoCard from './PhotoCard.vue';

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);

  export default defineComponent({
    components: {
      PageWrapper,
      UnitSelect,
      PhotoCard,
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
