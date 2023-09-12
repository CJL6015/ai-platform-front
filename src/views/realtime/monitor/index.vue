<template>
  <PageWrapper title="生产监控" contentFullHeight>
    <img src="../svg/p1.svg" class="svg-image" />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';

  export default defineComponent({
    components: { PageWrapper },
  });
</script>

<style>
  .svg-image {
    width: 100%;
    height: 100%;
  }
</style>
