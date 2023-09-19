import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const realtime: AppRouteModule = {
  path: '/history',
  name: '历史分析',
  component: LAYOUT,
  meta: {
    orderNo: 2,
    icon: 'ion:ios-monitor',
    title: '历史超限统计与分析',
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
      path: 'correlation',
      name: 'correlation',
      component: () => import('/@/views/history/correlation/index.vue'),
      meta: {
        title: '超限指标相关性分析',
      },
    },
  ],
};

export default realtime;
