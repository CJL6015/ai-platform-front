import { GetHistoryModel } from './model/historyModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  PointList = '/statistic/point/',
  StatusList = '/statistic/point/status/',
  HistoryList = '/system/getHistoryList',
}

export const getPointList = (id: any, params: any) =>
  defHttp.get<any>({ url: Api.PointList + id, params });

export const getPointStatus = (id: any, params: any) =>
  defHttp.get<any>({ url: Api.StatusList + id, params });

export const getHistoryList = () => defHttp.get<GetHistoryModel>({ url: Api.HistoryList });
