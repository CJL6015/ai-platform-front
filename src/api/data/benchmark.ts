import { defHttp } from '/@/utils/http/axios';

enum Api {
  EQUIPMENT = '/benchmark/equipment/',
  TREND = '/benchmark/trend/',
  DETECTION = '/benchmark/detection/',
  DETECTION_TREND = '/benchmark/trend/detection/',
  REPORT = '/benchmark/report',
}

export const getBenchmarkEquipment = (id: any, params: any) =>
  defHttp.get<any>({ url: Api.EQUIPMENT + id, params });

export const getBenchmarkTrend = (id: any, params: any) =>
  defHttp.get<any>({ url: Api.TREND + id, params });

export const getBenchmarkDetection = (id: any, params: any) =>
  defHttp.get<any>({ url: Api.DETECTION + id, params });

export const getBenchmarkDetectionTrend = (id: any, params: any) =>
  defHttp.get<any>({ url: Api.DETECTION_TREND + id, params });

export const getReport = (params: any) => defHttp.post<any>({ url: Api.REPORT, params });
