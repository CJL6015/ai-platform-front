import { defHttp } from '/@/utils/http/axios';

enum Api {
  SCORE = '/score/',
  SCORE_TREND = '/score/trend/',
}

export const getScoreApi = (id: any, params: any) =>
  defHttp.get<any>({ url: Api.SCORE + id, params });

export const getScoreTrendApi = (id: any, params: any) =>
  defHttp.get<any>({ url: Api.SCORE_TREND + id, params });
