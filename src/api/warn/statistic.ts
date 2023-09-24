import { defHttp } from '/@/utils/http/axios';

enum Api {
  STATISTIC = '/statistic/',
}

export const getStatistic = (id: any, params: any) =>
  defHttp.get<any>({ url: Api.STATISTIC + id, params });
