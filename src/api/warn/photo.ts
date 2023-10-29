import { defHttp } from '/@/utils/http/axios';

enum Api {
  RESULT = '/detection/result',
  MONTH_TREND = '/detection/trend/month',
  DAILY_TREND = '/detection/trend/daily',
}

export const detectionResult = (params: any) => defHttp.get<any>({ url: Api.RESULT, params });

export const getTrendMonth = (params: any) => defHttp.get<any>({ url: Api.MONTH_TREND, params });

export const getTrendDaily = (params: any) => defHttp.get<any>({ url: Api.DAILY_TREND, params });
