import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const analysis: AppRouteModule = {
  path: '/analysis',
  name: '生产线安全综合分析',
  component: LAYOUT,
  meta: {
    orderNo: 4,
    icon: 'ion:ios-monitor',
    title: '生产线安全综合分析',
  },
  children: [
    {
      path: 'score',
      name: 'score',
      component: () => import('/@/views/analysis/score/index.vue'),
      meta: {
        title: '评分规则及趋势分析',
      },
    },
    {
      path: 'benchmark',
      name: 'benchmark',
      component: () => import('/@/views/analysis/benchmark/index.vue'),
      meta: {
        title: '多产线安全行自由对标分析',
      },
    },
    {
      path: 'report',
      name: 'report',
      component: () => import('/@/views/analysis/benchmark/Report.vue'),
      meta: {
        title: '报表',
        hideMenu: true,
      },
    },
  ],
};

export default analysis;
