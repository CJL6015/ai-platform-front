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
    title: '上限值',
    dataIndex: 'up',
    sorter: true,
  },
  {
    title: '下限值',
    dataIndex: 'down',
    sorter: true,
  },
  {
    title: '持续时间阈值(分钟)',
    dataIndex: 'duration',
    sorter: true,
  },
];
