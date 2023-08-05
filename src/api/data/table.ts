import { GetPointTableModel } from './model/pointModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  PointList = '/system/getPointList',
}

export const getPointList = () => defHttp.get<GetPointTableModel>({ url: Api.PointList });
