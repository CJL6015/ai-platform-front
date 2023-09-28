import { defHttp } from '/@/utils/http/axios';

enum Api {
  STATIC = '/point/static',
  HISTORY_LIST = '/point/history',
  LIST = '/point/line/',
  TREND = '/point/trend/',
}

export const pointStaticApi = () => defHttp.get<any>({ url: Api.STATIC });

export const pointHistoryApi = (params: any) => defHttp.get<any>({ url: Api.HISTORY_LIST, params });

export const pointListApi = (id: any) => defHttp.get<any>({ url: Api.LIST + id });

export const pointTrendApi = (id: any, params: any) =>
  defHttp.get<any>({ url: Api.TREND + id, params });
