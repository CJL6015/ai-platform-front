import { defHttp } from '/@/utils/http/axios';

enum Api {
  STATIC = '/point/static',
  HISTORY_LIST = '/point/history',
}

export const pointStaticApi = () => defHttp.get<any>({ url: Api.STATIC });

export const pointHistoryApi = (params: any) => defHttp.get<any>({ url: Api.HISTORY_LIST, params });
