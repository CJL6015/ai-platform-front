import { defHttp } from '/@/utils/http/axios';

enum Api {
  INSPECTION_CONFIG = '/inspection/line/',
  INSPECTION_HISTORY = '/inspection/history/line/',
  INSPECTION = '/inspection',
  FREEZE = '/inspection/freeze/',
  UNFREEZE = '/inspection/unfreeze',
  WARN_RULE_CONFIG = '/limit/line/',
  WARN_RULE = '/limit/line/',
}

export const getInspectionConfig = (id: any) =>
  defHttp.get<any>({ url: Api.INSPECTION_CONFIG + id, timeout: -1 });

export const getInspectionHistory = (id: any, params: any) =>
  defHttp.get<any>({ url: Api.INSPECTION_HISTORY + id, params, timeout: -1 });

export const updateInspectionConfig = (params: any) =>
  defHttp.patch<any>({ url: Api.INSPECTION, params, timeout: -1 });

export const freezeInspection = (id: any, params: any) =>
  defHttp.post<any>({ url: Api.FREEZE + id, params, timeout: -1 });

export const unfreezeInspection = (params: any) =>
  defHttp.get<any>({ url: Api.UNFREEZE, params, timeout: -1 });

export const getWarnRuleConfig = (id: any) =>
  defHttp.get<any>({ url: Api.WARN_RULE_CONFIG + id, timeout: -1 });

export const updateWarnRuleConfig = (id: any, params: any) =>
  defHttp.patch<any>({ url: Api.WARN_RULE + id, params, timeout: -1 });
