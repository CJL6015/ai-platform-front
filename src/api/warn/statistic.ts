import { defHttp } from '/@/utils/http/axios';

enum Api {
  STATISTIC = '/statistic/',
  PARAM_BENCHMARK = '/analyze/param/',
  INSPECTION_BENCHMARK = '/analyze/inspection/',
  INSPECTION_DAILY = '/analyze/inspection/daily/',
  INSPECTION_MONTH = '/analyze/inspection/month/',
  INSPECTION_QUARTER = '/analyze/inspection/quarter/',
  PARAM_DAILY = '/analyze/param/daily/',
  PARAM_MONTH = '/analyze/param/month/',
  PARAM_QUARTER = '/analyze/param/quarter/',
}

export const getStatistic = (id: any, params: any) =>
  defHttp.get<any>({ url: Api.STATISTIC + id, params, timeout: -1 });

export const getParamBenchmark = (id: any, params: any) =>
  defHttp.get<any>({ url: Api.PARAM_BENCHMARK + id, params, timeout: -1 });

export const getInspectionBenchmark = (id: any, params) =>
  defHttp.get<any>({ url: Api.INSPECTION_BENCHMARK + id, params, timeout: -1 });

export const getInspectionDaily = (id: any, params) =>
  defHttp.get<any>({ url: Api.INSPECTION_DAILY + id, params, timeout: -1 });

export const getInspectionMonth = (id: any, params) =>
  defHttp.get<any>({ url: Api.INSPECTION_MONTH + id, params, timeout: -1 });

export const getInspectionQuarter = (id: any, params) =>
  defHttp.get<any>({ url: Api.INSPECTION_QUARTER + id, params, timeout: -1 });

export const getParamDaily = (id: any, params) =>
  defHttp.get<any>({ url: Api.PARAM_DAILY + id, params, timeout: -1 });

export const getParamMonth = (id: any, params) =>
  defHttp.get<any>({ url: Api.PARAM_MONTH + id, params, timeout: -1 });

export const getParamQuarter = (id: any, params) =>
  defHttp.get<any>({ url: Api.PARAM_QUARTER + id, params, timeout: -1 });
