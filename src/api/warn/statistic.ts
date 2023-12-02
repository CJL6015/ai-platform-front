import { defHttp } from '/@/utils/http/axios';

enum Api {
  STATISTIC = '/statistic/',
  PARAM_BENCHMARK = '/analyze/param/',
  INSPECTION_BENCHMARK = '/analyze/inspection/',
}

export const getStatistic = (id: any, params: any) =>
  defHttp.get<any>({ url: Api.STATISTIC + id, params });

export const getParamBenchmark = (id: any) => defHttp.get<any>({ url: Api.PARAM_BENCHMARK + id });

export const getInspectionBenchmark = (id: any) =>
  defHttp.get<any>({ url: Api.INSPECTION_BENCHMARK + id });
