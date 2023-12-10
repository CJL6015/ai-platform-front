import { BasicColumn } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '当前组',
    dataIndex: 'sub',
  },
  {
    title: '目标组',
    dataIndex: 'target',
  },
  {
    title: '置信度',
    dataIndex: 'conf',
    sorter: (a, b) => a.conf - b.conf,
  },
  {
    title: '支持度',
    dataIndex: 'support',
    sorter: (a, b) => a.support - b.support,
  },
  {
    title: '是否强相关',
    dataIndex: 'relevant',
    sorter: (a, b) => a.relevant - b.relevant,
  },
];
