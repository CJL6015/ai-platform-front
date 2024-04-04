import { defHttp } from '/@/utils/http/axios';

enum Api {
  SCORE = '/score/',
  SCORE_TREND = '/score/trend/',
  RULE_EQUIPMENT = '/rule/equipment/',
  RULE_POINT = '/rule/point/',
  SCORE_SUMMARY = '/score/summary/',
}

export const getScoreApi = (id: any, params: any) =>
  defHttp.get<any>({ url: Api.SCORE + id, params, timeout: -1 });

export const getScoreSummaryApi = (id: any) =>
  defHttp.get<any>({ url: Api.SCORE_SUMMARY + id, timeout: -1 });

export const getScoreTrendApi = (id: any, params: any) =>
  defHttp.get<any>({ url: Api.SCORE_TREND + id, params, timeout: -1 });

export const getEquipmentRule = (id: any, params: any) =>
  defHttp.get<any>({ url: Api.RULE_EQUIPMENT + id, params: params, timeout: -1 });

export const getPointRule = (id: any, params: any) =>
  defHttp.get<any>({ url: Api.RULE_POINT + id, params: params, timeout: -1 });
