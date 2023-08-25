<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <span style="margin-right: 5px; font-size: 16px">测点</span>
        <a-select size="large" option-label-prop="label" style="width: 400px">
          <a-select-option value="-1" label="全部">全部</a-select-option>
          <a-select-option value="1" label="传感器类型">传感器类型</a-select-option>
          <a-select-option value="2" label="传感器所属设备">传感器所属设备</a-select-option>
        </a-select>

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
  import { InputSearch, Select, SelectOption } from 'ant-design-vue';

  export default defineComponent({
    name: 'PointTable',
    components: {
      BasicTable,
      TableAction,
      AInputSearch: InputSearch,
      ASelect: Select,
      ASelectOption: SelectOption,
    },
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
