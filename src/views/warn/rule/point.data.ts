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
    title: '高限值',
    dataIndex: 'upperLimit',
    sorter: true,
  },
  {
    title: '低限值',
    dataIndex: 'lowerLimit',
    sorter: true,
  },
  {
    title: '高高限值',
    dataIndex: 'upperUpperLimit',
    sorter: true,
  },
  {
    title: '低低限值',
    dataIndex: 'lowerLowerLimit',
    sorter: true,
  },
  {
    title: '持续时间阈值(分钟)',
    dataIndex: 'threshold',
    sorter: true,
  },
  {
    title: '该测点历史平均超限时间(分钟)',
    dataIndex: 'duration',
    sorter: true,
  },
];
