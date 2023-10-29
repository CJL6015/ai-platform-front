<template>
  <div>
    <BasicTable @register="registerTable" @edit-end="handleEdit" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable } from '/@/components/Table';
  import { getPointList } from '/@/api/data/table';

  import { columns } from './point.data';

  export default defineComponent({
    name: 'PointTable',
    components: { BasicTable },
    setup() {
      const [registerTable] = useTable({
        title: '测点详情',
        api: getPointList,
        columns,
        formConfig: {
          labelWidth: 120,
        },
        pagination: true,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
      });

      function handleEdit(record) {
        console.log(record);
      }

      function handleDelete(record) {
        console.log(record);
      }

      function onSearch() {}

      return {
        registerTable,
        handleDelete,
        handleEdit,
        onSearch,
      };
    },
  });
</script>
