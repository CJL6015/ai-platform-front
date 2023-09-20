import { GetPointTableModel } from './model/pointModel';
import { GetHistoryModel } from './model/historyModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  PointList = '/statistic/',
  HistoryList = '/system/getHistoryList',
}

export const getPointList = (id: any) =>
  defHttp.get<GetPointTableModel>({ url: Api.PointList + id });
export const getHistoryList = () => defHttp.get<GetHistoryModel>({ url: Api.HistoryList });
