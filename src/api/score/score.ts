import { defHttp } from '/@/utils/http/axios';

enum Api {
  SCORE = '/main/score',
  RATIO = '/main/ratio',
  TREND = '/main/trend',
}

export const getMainScore = () => defHttp.get<any>({ url: Api.SCORE });
export const getMainRatio = () => defHttp.get<any>({ url: Api.RATIO });
export const getMainTrend = () => defHttp.get<any>({ url: Api.TREND });
