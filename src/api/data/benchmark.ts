import { defHttp } from '/@/utils/http/axios';

enum Api {
  EQUIPMENT = '/benchmark/equipment',
  TREND = '/benchmark/trend',
}

export const getBenchmarkEquipment = (params: any) =>
  defHttp.get<any>({ url: Api.EQUIPMENT, params });

export const getBenchmarkTrend = (params: any) => defHttp.get<any>({ url: Api.TREND, params });
