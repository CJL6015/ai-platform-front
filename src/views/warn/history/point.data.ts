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
    title: '实时值',
    dataIndex: 'value',
  },
  {
    title: '实时刷新状态',
    dataIndex: 'state',
    sorter: (a, b) => a.state - b.state,
  },
  {
    title: '超限时间(分)',
    dataIndex: 'exceededTime',
    sorter: (a, b) => a.exceededTime - b.exceededTime,
  },
  {
    title: '刷新异常时间(分)',
    dataIndex: 'exceptionTime',
    sorter: (a, b) => a.exceptionTime - b.exceptionTime,
  },
];

export const columns1: BasicColumn[] = [
  {
    title: '描述',
    dataIndex: 'description',
  },
  {
    title: '是否运行',
    dataIndex: 'status',
  },
  {
    title: '是否故障',
    dataIndex: 'isExceeded',
    sorter: (a, b) => a.state - b.state,
  },
  {
    title: '停机时间(分)',
    dataIndex: 'exceededTime',
    sorter: (a, b) => a.exceededTime - b.exceededTime,
  },
  {
    title: '故障停机时间(分)',
    dataIndex: 'exceptionTime',
    sorter: (a, b) => a.exceptionTime - b.exceptionTime,
  },
];
