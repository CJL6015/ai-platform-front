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
    title: '持续时间阈值(分钟)',
    dataIndex: 'threshold',
    sorter: true,
    edit: true,
  },
  {
    title: '该测点历史平均超限时间(小时)',
    dataIndex: 'duration',
    sorter: true,
  },
];
