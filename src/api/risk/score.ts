import { defHttp } from '/@/utils/http/axios';

enum Api {
  SCORE = '/score/',
  SCORE_TREND = '/score/trend/',
  RULE_EQUIPMENT = '/rule/equipment/',
  RULE_POINT = '/rule/point/',
}

export const getScoreApi = (id: any, params: any) =>
  defHttp.get<any>({ url: Api.SCORE + id, params });

export const getScoreTrendApi = (id: any, params: any) =>
  defHttp.get<any>({ url: Api.SCORE_TREND + id, params });

export const getEquipmentRule = (id: any, params: any) =>
  defHttp.get<any>({ url: Api.RULE_EQUIPMENT + id, params: params });

export const getPointRule = (id: any, params: any) =>
  defHttp.get<any>({ url: Api.RULE_POINT + id, params: params });
