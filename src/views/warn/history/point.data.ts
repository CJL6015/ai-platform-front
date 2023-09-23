import { BasicColumn } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '描述',
    dataIndex: 'description',
  },
  {
    title: '单位',
    dataIndex: 'unit',
  },
  {
    title: '时实值',
    dataIndex: 'value',
  },
  {
    title: '时实刷新状态',
    dataIndex: 'state',
  },
  {
    title: '超限时间(分)',
    dataIndex: 'exceededTime',
    sorter: true,
  },
  {
    title: '刷新异常时间(分)',
    dataIndex: 'exceptionTime',
    sorter: true,
  },
];
