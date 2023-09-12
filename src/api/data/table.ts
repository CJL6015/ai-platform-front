import { GetPointTableModel } from './model/pointModel';
import { GetHistoryModel } from './model/historyModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  PointList = '/system/getPointList',
  HistoryList = '/system/getHistoryList',
}

export const getPointList = () => defHttp.get<GetPointTableModel>({ url: Api.PointList });
export const getHistoryList = () => defHttp.get<GetHistoryModel>({ url: Api.HistoryList });
