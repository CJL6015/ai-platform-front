<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-input-search
          placeholder="搜索点号"
          size="large"
          style="width: 400px"
          @search="onSearch"
          enter-button="搜索"
        />
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'ph:activity',
                label: '趋势',
                onClick: handleEdit.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getPointList } from '/@/api/data/table';

  import { columns } from './point.data';
  import { InputSearch } from 'ant-design-vue';

  export default defineComponent({
    name: 'PointTable',
    components: { BasicTable, TableAction, AInputSearch: InputSearch },
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
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          fixed: undefined,
        },
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
