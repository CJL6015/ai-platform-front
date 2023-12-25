import { defHttp } from '/@/utils/http/axios';

enum Api {
  RESULT = '/detection/result/',
  MONTH_TREND = '/detection/trend/month',
  DAILY_TREND = '/detection/trend/daily',
  DETECTION_TIME = '/detection/times/',
}

export const detectionResult = (id: any, params: any) =>
  defHttp.get<any>({ url: Api.RESULT + id, params });

export const getTrendMonth = (params: any) => defHttp.get<any>({ url: Api.MONTH_TREND, params });

export const getTrendDaily = (params: any) => defHttp.get<any>({ url: Api.DAILY_TREND, params });

export const detectionTimes = (id: any) => defHttp.get<any>({ url: Api.DETECTION_TIME + id });
