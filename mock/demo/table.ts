import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../_util';
import { Random } from 'mockjs';

const pointList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 300; index++) {
    result.push({
      id: `${index}`,
      groupName: `组名${index + 1}`,
      pointId: `Point${index + 1}`,
      desc: '描述',
      orderNo: index + 1,
      num: index,
      unit: '℃',
      overrun: Random.integer(0, 10000),
      error: Random.integer(0, 10000),
    });
  }
  return result;
})();

export default [
  {
    url: '/basic-api/system/getPointList',
    timeout: 100,
    method: 'get',
    response: () => {
      return resultSuccess(pointList);
    },
  },
] as MockMethod[];
