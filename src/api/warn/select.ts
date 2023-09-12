import { defHttp } from '/@/utils/http/axios';

enum Api {
  LIST = '/select/list',
  LINE_LIST = '/select/line/list/',
}

export const optionListApi = () => defHttp.get<any>({ url: Api.LIST });

export const lineOptionListApi = (id?: any) => defHttp.get<any>({ url: Api.LIST + id });
