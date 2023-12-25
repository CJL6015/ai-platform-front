import { defHttp } from '/@/utils/http/axios';

enum Api {
  HISTORY = '/storehouse/history',
}

export const getStorehouseHistory = (params: any) => defHttp.get<any>({ url: Api.HISTORY, params });
