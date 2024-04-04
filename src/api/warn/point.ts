import { defHttp } from '/@/utils/http/axios';

enum Api {
  STATIC = '/point/static',
  HISTORY_LIST = '/point/history',
  LIST = '/point/line/',
  TREND = '/point/trend/',
  UPDATE = '/point/',
}

export const pointStaticApi = () => defHttp.get<any>({ url: Api.STATIC, timeout: -1 });

export const pointHistoryApi = (params: any) =>
  defHttp.get<any>({ url: Api.HISTORY_LIST, params, timeout: -1 });

export const pointListApi = (id: any) => defHttp.get<any>({ url: Api.LIST + id, timeout: -1 });

export const pointTrendApi = (id: any, params: any) =>
  defHttp.get<any>({ url: Api.TREND + id, params, timeout: -1 });

export const updatePoint = (params: any) =>
  defHttp.patch<any>({ url: Api.UPDATE, params, timeout: -1 });
