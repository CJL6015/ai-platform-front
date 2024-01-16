<template>
  <a-card>
    <div ref="pdfContent">
      <BasicTable @register="registerTable" />
    </div>
    <Divider />
    <a-button @click="exportReport" style="float: right"> 导出报表 </a-button>
  </a-card>
</template>

<script lang="ts">
  import { defineComponent, toRaw, watch, ref, onMounted } from 'vue';
  import html2canvas from 'html2canvas';
  import jsPDF from 'jspdf';
  import { BasicDrawer } from '/@/components/Drawer';
  import {
    BasicTable,
    useTable,
    TableAction,
    BasicColumn,
    ColumnChangeParam,
  } from '/@/components/Table';
  import { Card, Divider } from 'ant-design-vue';

  export default defineComponent({
    components: {
      BasicDrawer,
      BasicTable,
      ACard: Card,
      Divider,
    },
    setup() {
      const pdfContent = ref(null);
      const columns = JSON.parse(localStorage.getItem('reportColumns'));
      const reportData = JSON.parse(localStorage.getItem('reportData'));
      console.log(columns, reportData);
      const [registerTable, { setTableData }] = useTable({
        title: '报表详情',
        formConfig: {
          labelWidth: 120,
        },
        columns,
        pagination: false,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
      });
      onMounted(() => {
        setTableData(reportData);
      });

      function exportReport() {
        html2canvas(pdfContent.value, { scale: 2 }).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          const imgWidth = 210; // A4尺寸宽度
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
          pdf.save('对标报表.pdf');
        });
      }

      return {
        registerTable,
        exportReport,
        pdfContent,
      };
    },
  });
</script>
