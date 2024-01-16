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
    title: '冻结时长(小时)',
    dataIndex: 'freezeTime',
    sorter: (a, b) => a.freezeTime - b.freezeTime,
  },
  {
    title: '超员次数',
    dataIndex: 'exceededNum',
    sorter: (a, b) => a.exceededNum - b.exceededNum,
  },
  {
    title: '超员位次',
    dataIndex: 'exceededPeople',
    sorter: (a, b) => a.exceededPeople - b.exceededPeople,
  },
  {
    title: '抓拍照片',
    dataIndex: 'imageUrl',
  },
];
