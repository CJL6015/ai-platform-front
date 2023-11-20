import { defHttp } from '/@/utils/http/axios';

enum Api {
  REAL_TIME_VALUES = '/exa/values',
  MONTH_TREND = '/point/inspection/trend/month/line/',
  DAILY_TREND = '/point/inspection/trend/daily/line/',
  BENCHMARK = '/point/benchmark/line/',
  TREND_DETAIL_MONTH = '/point/trend/month/detail/line/',
  TREND_DETAIL_DAILY = '/point/trend/daily/detail/line/',
  POINT_LIMIT = '/point/limits',
}

export const getPointsValues = (params: any) =>
  defHttp.get<any>({ url: Api.REAL_TIME_VALUES, params });

export const getPointsLimits = (params: any) => defHttp.get<any>({ url: Api.POINT_LIMIT, params });

export const getTrendMonth = (id: any, params: any) =>
  defHttp.get<any>({ url: Api.MONTH_TREND + id, params });

export const getTrendDaily = (id: any, params: any) =>
  defHttp.get<any>({ url: Api.DAILY_TREND + id, params });

export const getBenchmark = (id: any, params: any) =>
  defHttp.get<any>({ url: Api.BENCHMARK + id, params });
export const getTrendDetailMonth = (id: any) =>
  defHttp.get<any>({ url: Api.TREND_DETAIL_MONTH + id });

export const getTrendDetailDaily = (id: any) =>
  defHttp.get<any>({ url: Api.TREND_DETAIL_DAILY + id });
