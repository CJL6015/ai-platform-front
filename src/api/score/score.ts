import { defHttp } from '/@/utils/http/axios';

enum Api {
  SCORE = '/main/score',
  RATIO = '/main/ratio',
  TREND = '/main/trend',
}

export const getMainScore = () => defHttp.get<any>({ url: Api.SCORE, timeout: -1 });
export const getMainRatio = () => defHttp.get<any>({ url: Api.RATIO, timeout: -1 });
export const getMainTrend = () => defHttp.get<any>({ url: Api.TREND, timeout: -1 });
