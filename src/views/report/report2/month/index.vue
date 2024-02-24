<template>
  <PageWrapper title="月度报表下载">
    <Card>
      <a-button type="primary" style="margin-bottom: 10px"
        ><a :href="wordDocSrc">下载报表</a></a-button
      >
      <vue-office-docx :src="wordDocSrc" />
    </Card>
  </PageWrapper>
</template>

<script lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { ref, onMounted } from 'vue';
  import { Divider, Card, Alert, Button } from 'ant-design-vue';
  import { getReportMonth } from '/@/api/report/report';
  import VueOfficeDocx from '@vue-office/docx';

  export default {
    components: {
      PageWrapper,
      VueOfficeDocx,
      AButton: Button,
      Card,
    },
    setup() {
      const wordDocSrc = ref(null);
      async function getReport() {
        const params = {
          level: 2,
          plantId: parseInt(localStorage.getItem('plantId')),
        };
        const data = await getReportMonth(params);
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
      };
    },
  };
</script>
<style>
  /* 样式可以根据你的需求进行调整 */
</style>
