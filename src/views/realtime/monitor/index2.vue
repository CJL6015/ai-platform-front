<template> <svg></svg> <Divider /></template>

<script lang="ts">
  import Monitor from './Monitor.vue';
  import Trend from '../../warn/components/Trend.vue';
  import { useModal } from '/@/components/Modal';
  import { getPointsValues } from '/@/api/data/point';
  import { defineComponent, onMounted, onBeforeUnmount } from 'vue';
  import { Card, Divider } from 'ant-design-vue';

  export default defineComponent({
    name: 'monitorTrend',
    components: {
      Monitor,
      Trend,
      Divider,
    },
    setup() {
      console.log(88);
      const [registerModal, { openModal }] = useModal();
      return {
        registerModal,
      };
    },
  });
</script>
