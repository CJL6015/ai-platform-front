import type { AppRouteModule } from '/@/router/types';
import { RoleEnum } from '/@/enums/roleEnum';

import { LAYOUT } from '/@/router/constant';

const risk: AppRouteModule = {
  path: '/report',
  name: '报表下载',
  component: LAYOUT,
  meta: {
    orderNo: 5,
    icon: 'grommet-icons:risk',
    title: '报表下载',
    roles: [RoleEnum.LEVEL1, RoleEnum.LEVEL2, RoleEnum.LEVEL3],
  },
  children: [
    {
      path: 'level1',
      name: 'level1',
      meta: {
        title: '一级平台报表下载',
        roles: [RoleEnum.LEVEL1],
      },
      children: [
        {
          path: 'day1',
          name: 'day1',
          component: () => import('/@/views/report/report1/day/index.vue'),
          meta: {
            title: '日报下载',
            roles: [RoleEnum.LEVEL1],
          },
        },
        {
          path: 'month1',
          name: 'month1',
          component: () => import('/@/views/report/report1/month/index.vue'),
          meta: {
            title: '月报下载',
            roles: [RoleEnum.LEVEL1],
          },
        },
        {
          path: 'quarter1',
          name: 'quarter1',
          component: () => import('/@/views/report/report1/quarter/index.vue'),
          meta: {
            title: '季报下载',
            roles: [RoleEnum.LEVEL1],
          },
        },
        {
          path: 'year1',
          name: 'year1',
          component: () => import('/@/views/report/report1/year/index.vue'),
          meta: {
            title: '年报下载',
            roles: [RoleEnum.LEVEL1],
          },
        },
      ],
    },
    {
      path: 'report2',
      name: 'report2',
      meta: {
        title: '二级平台报表下载',
        roles: [RoleEnum.LEVEL1, RoleEnum.LEVEL2],
      },
      children: [
        {
          path: 'day2',
          name: 'day2',
          component: () => import('/@/views/report/report2/day/index.vue'),
          meta: {
            title: '日报下载',
            roles: [RoleEnum.LEVEL1, RoleEnum.LEVEL2],
          },
        },
        {
          path: 'month2',
          name: 'month2',
          component: () => import('/@/views/report/report2/month/index.vue'),
          meta: {
            title: '月报下载',
            roles: [RoleEnum.LEVEL1, RoleEnum.LEVEL2],
          },
        },
        {
          path: 'quarter2',
          name: 'quarter2',
          component: () => import('/@/views/report/report2/quarter/index.vue'),
          meta: {
            title: '季报下载',
            roles: [RoleEnum.LEVEL1, RoleEnum.LEVEL2],
          },
        },
        {
          path: 'year2',
          name: 'year2',
          component: () => import('/@/views/report/report2/year/index.vue'),
          meta: {
            title: '年报下载',
            roles: [RoleEnum.LEVEL1, RoleEnum.LEVEL2],
          },
        },
      ],
    },
    {
      path: 'report3',
      name: 'report3',
      meta: {
        title: '三级平台报表下载',
      },
      children: [
        {
          path: 'day3',
          name: 'day3',
          component: () => import('/@/views/report/report3/day/index.vue'),
          meta: {
            title: '日报下载',
          },
        },
        {
          path: 'month3',
          name: 'month3',
          component: () => import('/@/views/report/report3/month/index.vue'),
          meta: {
            title: '月报下载',
          },
        },
        {
          path: 'quarter3',
          name: 'quarter3',
          component: () => import('/@/views/report/report3/quarter/index.vue'),
          meta: {
            title: '季报下载',
          },
        },
        {
          path: 'year3',
          name: 'year3',
          component: () => import('/@/views/report/report3/year/index.vue'),
          meta: {
            title: '年报下载',
          },
        },
      ],
    },
  ],
};

export default risk;
