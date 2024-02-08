import { defHttp } from '/@/utils/http/axios';

enum Api {
  REPORT_MONTH = '/report/month',
  REPORT1 = '/report/report1',
  REPORT2 = '/report/report2',
  REPORT3 = '/report/report3/',
}

export const getReportMonth = (params: any) => defHttp.get<any>({ url: Api.REPORT_MONTH, params });
export const getReport1 = () => defHttp.get<any>({ url: Api.REPORT1 });
export const getReport2 = () => defHttp.get<any>({ url: Api.REPORT2 });
export const getReport3 = (id: any) => defHttp.get<any>({ url: Api.REPORT3 + id });
