<template>
  <PageWrapper title="日报下载">
    <Card>
      <a-button type="primary" style="margin-bottom: 10px"
        ><a :href="wordDocSrc">下载报表</a></a-button
      >
      <vue-office-docx :src="wordDocSrc" :options="option" />
    </Card>
  </PageWrapper>
</template>

<script lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { ref, onMounted } from 'vue';
  import { Divider, Card, Alert, Button } from 'ant-design-vue';
  import { getReportDay } from '/@/api/report/report';
  import VueOfficeDocx from '@vue-office/docx';

  export default {
    components: {
      PageWrapper,
      AButton: Button,
      Card,
      VueOfficeDocx,
    },
    setup() {
      const option = ref({
        useMathMLPolyfill: false,
      });
      const wordDocSrc = ref(null);
      async function getReport() {
        const params = {
          level: 1,
        };
        const data = await getReportDay(params);
        wordDocSrc.value = data;
      }

      onMounted(() => {
        getReport();
      });
      function download() {
        return wordDocSrc.value;
      }
      return {
        wordDocSrc,
        download,
        option,
      };
    },
  };
</script>
<style>
  /* 样式可以根据你的需求进行调整 */
</style>
