import { defHttp } from '/@/utils/http/axios';

enum Api {
  LIST = '/select/list',
  LINE_LIST = '/select/line/list/',
  POINT_LIST = '/select/point/list/',
  EQUIPMENT_LIST = '/equipment/name/',
  POINT_LINE = '/select/point/line/',
  CAMERA_LINE = '/select/camera/line/',
}

export const optionListApi = () => defHttp.get<any>({ url: Api.LIST });

export const lineOptionListApi = (id?: any) => defHttp.get<any>({ url: Api.LINE_LIST + id });

export const pointOptionListApi = (id: any) => defHttp.get<any>({ url: Api.POINT_LIST + id });

export const equipmentOptionListApi = (id?: any) =>
  defHttp.get<any>({ url: Api.EQUIPMENT_LIST + id });

export const pointNameListApi = (id?: any) => defHttp.get<any>({ url: Api.POINT_LINE + id });

export const cameraListApi = (id?: any) => defHttp.get<any>({ url: Api.CAMERA_LINE + id });
