<template>
  <PageWrapper title="生产线月度安全情况诊断报告">
    <div id="printContent">
      <BasicTable @register="registerTable">
        <template #toolbar>
          <a-button @click="exportReport"> 导出报表 </a-button>
        </template>
      </BasicTable>
    </div></PageWrapper
  >
</template>

<script lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { defineComponent, toRaw, watch, ref, onMounted } from 'vue';
  import { getReport } from '/@/api/data/benchmark';
  import { BasicTable, useTable, TableAction, BasicColumn } from '/@/components/Table';
  import { jsonToSheetXlsx } from '/@/components/Excel';
  import printJS from 'print-js';

  export default defineComponent({
    components: {
      BasicTable,
      PageWrapper,
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
      const tableData = ref([]);
      onMounted(async () => {
        const params = {
          pic: true,
          line1: ['1'],
          time: '2',
          totalIndicators: ['1', '2', '3'],
          subIndicators: [],
          extremeNumber: 3,
          extremeIndicators: ['1', '2', '3', '4', '5'],
          trend: ['1', '2', '3', '4'],
          correlationNumber: 3,
          correlation: [],
        };
        const data = await getReport(params);
        tableData.value = data;
        setTableData(data);
      });

      function exportReport() {
        // jsonToSheetXlsx({
        //   data: tableData.value,
        //   header: {
        //     name: '指标',
        //     P1: '生产线',
        //   },
        //   filename: '生产线月度安全情况诊断报告.xlsx',
        // });
        printJS({
          printable: 'printContent', // 指定要打印的元素的 ID
          type: 'html',
          targetStyles: ['*'],
        });
      }

      return {
        registerTable,
        exportReport,
      };
    },
  });
</script>
