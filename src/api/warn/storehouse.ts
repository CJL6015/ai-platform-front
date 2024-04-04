import { defHttp } from '/@/utils/http/axios';

enum Api {
  HISTORY = '/storehouse/history',
  PICTURE_PATH = '/storehouse/images',
}

export const getStorehouseHistory = (params: any) =>
  defHttp.get<any>({ url: Api.HISTORY, params, timeout: -1 });

export const getStorehousePicture = (params: any) =>
  defHttp.get<any>({ url: Api.PICTURE_PATH, params, timeout: -1 });
