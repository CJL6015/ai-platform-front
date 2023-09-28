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
  import { defineComponent, PropType, watch, toRaw } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getPointList } from '/@/api/data/table';
  import dayjs from 'dayjs';
  import { columns } from './point.data';
  import { InputSearch } from 'ant-design-vue';

  export default defineComponent({
    name: 'PointTable',
    components: {
      BasicTable,
      TableAction,
      AInputSearch: InputSearch,
    },
    props: {
      selectData: {
        type: Object as PropType<Object>,
      },
    },
    setup(props, _) {
      const [registerTable, methods] = useTable({
        title: '测点详情',
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
      watch(props, async (newData, _) => {
        const data = toRaw(newData.selectData);
        if (data && data['line'] && data['line'] > 0) {
          const time = toRaw(data['time']);
          const params = {
            st: dayjs(time[0]).format('YYYY-MM-DD HH:mm:ss'),
            et: dayjs(time[1]).format('YYYY-MM-DD HH:mm:ss'),
          };
          const tableData = await getPointList(data['line'], params);
          methods.setTableData(tableData);
        }
      });

      function handleEdit(record) {
        const value = toRaw(record);
        console.log(value);
      }

      function handleDelete(record) {
        const value = toRaw(record);
        console.log(value);
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
