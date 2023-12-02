<template>
  <div>
    <BasicTable @register="registerTable" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, toRaw, watch, ref, onMounted } from 'vue';
  import { BasicDrawer } from '/@/components/Drawer';
  import {
    BasicTable,
    useTable,
    TableAction,
    BasicColumn,
    ColumnChangeParam,
  } from '/@/components/Table';

  export default defineComponent({
    components: {
      BasicDrawer,
      BasicTable,
    },
    setup() {
      const columns = JSON.parse(localStorage.getItem('reportColumns'));
      const reportData = JSON.parse(localStorage.getItem('reportData'));
      console.log(columns, reportData);
      const [registerTable, { setTableData }] = useTable({
        title: '报表详情',
        formConfig: {
          labelWidth: 120,
        },
        columns,
        pagination: true,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
      });
      onMounted(() => {
        setTableData(reportData);
      });

      return {
        registerTable,
      };
    },
  });
</script>
