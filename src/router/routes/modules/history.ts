import type { AppRouteModule } from '/@/router/types';
import { RoleEnum } from '/@/enums/roleEnum';

import { LAYOUT } from '/@/router/constant';

const realtime: AppRouteModule = {
  path: '/history',
  name: '历史分析',
  component: LAYOUT,
  meta: {
    orderNo: 2,
    icon: 'ion:bar-chart-outline',
    title: '历史超限统计与分析',
    roles: [RoleEnum.Line],
  },
  children: [
    {
      path: 'people',
      name: 'people',
      component: () => import('/@/views/history/people/index.vue'),
      meta: {
        // affix: true,
        title: '定员超限多维对标分析',
      },
    },
    {
      path: 'param',
      name: 'param',
      component: () => import('/@/views/history/param/index.vue'),
      meta: {
        // affix: true,
        title: '参数超限多维对标分析',
        showInMenu: false,
      },
    },
    {
      path: 'compare',
      name: 'compare',
      component: () => import('/@/views/history/compare/index.vue'),
      meta: {
        title: '同比环比分析',
      },
    },
  ],
};

export default realtime;
