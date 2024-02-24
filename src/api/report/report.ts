import { defHttp } from '/@/utils/http/axios';

enum Api {
  REPORT_DAY = '/report/day',
  REPORT_MONTH = '/report/month',
  REPORT_QUARTER = '/report/quarter',
  REPORT_YEAR = '/report/year',
  REPORT1 = '/report/report1',
  REPORT2 = '/report/report2',
  REPORT3 = '/report/report3/',
}

export const getReportDay = (params: any) => defHttp.get<any>({ url: Api.REPORT_DAY, params });
export const getReportMonth = (params: any) => defHttp.get<any>({ url: Api.REPORT_MONTH, params });
export const getReportQuarter = (params: any) =>
  defHttp.get<any>({ url: Api.REPORT_QUARTER, params });
export const getReportYear = (params: any) => defHttp.get<any>({ url: Api.REPORT_YEAR, params });
export const getReport1 = () => defHttp.get<any>({ url: Api.REPORT1 });
export const getReport2 = () => defHttp.get<any>({ url: Api.REPORT2 });
export const getReport3 = (id: any) => defHttp.get<any>({ url: Api.REPORT3 + id });
