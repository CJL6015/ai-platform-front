import { defHttp } from '/@/utils/http/axios';

enum Api {
  LIMIT = '/limit/',
  LIMIT_LINE = '/limit/line/',
}

export const getRuleConfig = (id: any) => defHttp.get<any>({ url: Api.LIMIT + id, timeout: -1 });

export const updateConfig = (params: any) =>
  defHttp.get<any>({ url: Api.LIMIT_LINE, params, timeout: -1 });
