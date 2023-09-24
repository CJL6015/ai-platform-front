import { BasicColumn } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '起始时间',
    dataIndex: 'st',
  },
  {
    title: '结束时间',
    dataIndex: 'et',
  },
  {
    title: '冻结时长(分)',
    dataIndex: 'freezeTime',
    sorter: true,
  },
  {
    title: '超员次数',
    dataIndex: 'exceededNum',
    sorter: true,
  },
  {
    title: '抓拍照片',
    dataIndex: 'imageUrl',
    sorter: true,
  },
];
