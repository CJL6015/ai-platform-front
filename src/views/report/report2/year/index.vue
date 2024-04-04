<template>
  <PageWrapper title="年度报表下载">
    <Card>
      <a-row>
        <a-col :md="3" :xs="6">
          <a-date-picker
            v-model:value="time"
            style="width: 90%"
            @change="timeChange"
            picker="year"
          />
        </a-col>
        <a-col :md="3" :xs="6">
          <a-button type="primary" style="margin-bottom: 10px"
            ><a :href="wordDocSrc">下载报表</a></a-button
          >
        </a-col>
      </a-row>
      <vue-office-docx :src="wordDocSrc" />
    </Card>
  </PageWrapper>
</template>

<script lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { ref, onMounted } from 'vue';
  import { Divider, Card, Alert, Button, DatePicker, Col, Row } from 'ant-design-vue';
  import { getReportYear } from '/@/api/report/report';
  import VueOfficeDocx from '@vue-office/docx';
  import type { Dayjs } from 'dayjs';
  import dayjs from 'dayjs';

  export default {
    components: {
      PageWrapper,
      VueOfficeDocx,
      AButton: Button,
      Card,
      ADatePicker: DatePicker,
      ACol: Col,
      ARow: Row,
    },
    setup() {
      const time = ref<Dayjs>(dayjs().subtract(1, 'year').startOf('year'));
      const wordDocSrc = ref(null);
      async function getReport() {
        const params = {
          level: 2,
          plantId: parseInt(localStorage.getItem('plantId')),
          time: time.value.format('YYYYMM'),
        };
        const data = await getReportYear(params);
        wordDocSrc.value = data;
      }

      onMounted(() => {
        getReport();
      });
      function download() {
        return wordDocSrc.value;
      }

      function timeChange() {
        getReport();
      }
      return {
        wordDocSrc,
        download,
        time,
        timeChange,
      };
    },
  };
</script>
<style>
  /* 样式可以根据你的需求进行调整 */
</style>
