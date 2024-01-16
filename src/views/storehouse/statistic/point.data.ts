import { BasicColumn } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '时间',
    dataIndex: 'time',
    sorter: (a, b) => a.time - b.time,
  },
  {
    title: '安全定量(吨)',
    dataIndex: 'limit',
  },
  {
    title: '库存量(吨)',
    dataIndex: 'stock',
    sorter: (a, b) => a.stock - b.stock,
  },
  {
    title: '是否超限',
    dataIndex: 'exceed',
    sorter: (a, b) => a.exceed - b.exceed,
  },
];
