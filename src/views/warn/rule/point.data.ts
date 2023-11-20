import { BasicColumn } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '描述',
    dataIndex: 'description',
  },
  {
    title: '单位',
    dataIndex: 'unit',
    edit: true,
  },
  {
    title: '高限值',
    dataIndex: 'upperLimit',
    sorter: true,
    edit: true,
  },
  {
    title: '低限值',
    dataIndex: 'lowerLimit',
    sorter: true,
    edit: true,
  },
  {
    title: '高高限值',
    dataIndex: 'upperUpperLimit',
    sorter: true,
    edit: true,
  },
  {
    title: '低低限值',
    dataIndex: 'lowerLowerLimit',
    sorter: true,
    edit: true,
  },
  {
    title: '超高/低限扣分',
    dataIndex: 'score',
    sorter: true,
    edit: true,
  },
  {
    title: '超高高/低低限扣分',
    dataIndex: 'highScore',
    sorter: true,
    edit: true,
  },
];
