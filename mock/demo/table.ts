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

function getRandomPics(count = 10): string[] {
  const arr: string[] = [];
  for (let i = 0; i < count; i++) {
    arr.push(Random.image('800x600', Random.color(), Random.color(), Random.title()));
  }
  return arr;
}

const generateRandomDate = (): string => {
  const year = 2023;
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1;
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours
    .toString()
    .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

const generateRandomBoolean = (): boolean => {
  return Math.random() < 0.5;
};

const generateHistoryData = () => {
  const historyData: any[] = [];
  for (let i = 1; i <= 30; i++) {
    historyData.push({
      st: generateRandomDate(),
      et: generateRandomDate(),
      duration: Math.floor(Math.random() * 60) + 1,
      count: Math.floor(Math.random() * 100),
      photo: getRandomPics(Math.ceil(Math.random() * 3) + 1),
      freeze: generateRandomBoolean(),
    });
  }
  return historyData;
};

export default [
  {
    url: '/basic-api/system/getPointList',
    timeout: 100,
    method: 'get',
    response: () => {
      return resultSuccess(pointList);
    },
  },
  {
    url: '/basic-api/system/getHistoryList',
    timeout: 100,
    method: 'get',
    response: () => {
      return resultSuccess(generateHistoryData);
    },
  },
] as MockMethod[];
