import { defHttp } from '/@/utils/http/axios';

enum Api {
  REAL_TIME_VALUES = '/exa/values',
}

export const getPointsValues = (params: any) =>
  defHttp.get<any>({ url: Api.REAL_TIME_VALUES, params });
