import { defHttp } from '/@/utils/http/axios';

enum Api {
  REPORT_MONTH = '/report/month',
}

export const getReportMonth = (params: any) => defHttp.get<any>({ url: Api.REPORT_MONTH, params });
