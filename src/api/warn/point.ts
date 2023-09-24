import { defHttp } from '/@/utils/http/axios';

enum Api {
  STATIC = '/point/static',
  HISTORY_LIST = '/point/history',
  LIST = '/point/line/',
}

export const pointStaticApi = () => defHttp.get<any>({ url: Api.STATIC });

export const pointHistoryApi = (params: any) => defHttp.get<any>({ url: Api.HISTORY_LIST, params });

export const pointListApi = (id: any) => defHttp.get<any>({ url: Api.LIST + id });
