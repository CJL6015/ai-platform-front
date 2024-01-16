<template>
  <PageWrapper title="生产线月度安全情况诊断报告">
    <a-spin size="large" :spinning="spinning">
      <a-card>
        <div ref="pdfContent">
          <BasicTable @register="registerTable" />
        </div>
        <Divider />
        <a-button @click="exportReport" style="float: right"> 导出报表 </a-button>
      </a-card>
    </a-spin>
  </PageWrapper>
</template>

<script lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { defineComponent, ref, onMounted } from 'vue';
  import { getReport } from '/@/api/data/benchmark';
  import { BasicTable, useTable, BasicColumn } from '/@/components/Table';
  import { Spin, Divider, Card } from 'ant-design-vue';
  import html2canvas from 'html2canvas';
  import jsPDF from 'jspdf';

  export default defineComponent({
    components: {
      BasicTable,
      PageWrapper,
      ASpin: Spin,
      Divider,
      ACard: Card,
    },
    setup() {
      const columns: BasicColumn[] = [
        {
          title: '指标',
          dataIndex: 'name',
        },
        {
          title: '生产线',
          dataIndex: 'P1',
        },
      ];

      const pdfContent = ref(null);

      const [registerTable, { setTableData }] = useTable({
        title: '生产线月度安全情况诊断报告',
        formConfig: {
          labelWidth: 120,
        },
        columns,
        pagination: false,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
      });
      const tableData = ref([]);

      const spinning = ref(false);
      onMounted(async () => {
        const params = {
          pic: true,
          line1: ['1'],
          time: '2',
          totalIndicators: ['0', '1', '2'],
          subIndicators: [],
          extremeNumber: 3,
          extremeIndicators: ['1', '2', '3', '4', '5'],
          trend: ['1', '2', '3', '4'],
          correlationNumber: 3,
          correlation: [],
        };
        spinning.value = true;
        const data = await getReport(params);
        tableData.value = data;
        setTableData(data);
        spinning.value = false;
      });

      function exportReport() {
        spinning.value = true;
        html2canvas(pdfContent.value, { scale: 2 }).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          const imgWidth = 210; // A4尺寸宽度
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          console.log(imgWidth, imgHeight, canvas.width, canvas.height);
          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
          pdf.save('月度报表.pdf');
          spinning.value = false;
        });
      }

      return {
        registerTable,
        exportReport,
        spinning,
        pdfContent,
      };
    },
  });
</script>
