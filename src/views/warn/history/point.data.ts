import { BasicColumn } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '组名',
    dataIndex: 'groupName',
    align: 'left',
  },
  {
    title: '点号',
    dataIndex: 'pointId',
  },
  {
    title: '描述',
    dataIndex: 'desc',
  },
  {
    title: '单位',
    dataIndex: 'unit',
  },
  {
    title: '超限时间(分)',
    dataIndex: 'overrun',
    sorter: true,
  },
  {
    title: '刷新异常时间(分)',
    dataIndex: 'error',
    sorter: true,
  },
];
