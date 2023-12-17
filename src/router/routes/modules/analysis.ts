import type { AppRouteModule } from '/@/router/types';
import { RoleEnum } from '/@/enums/roleEnum';

import { LAYOUT } from '/@/router/constant';

const analysis: AppRouteModule = {
  path: '/analysis',
  name: '生产线安全综合分析',
  component: LAYOUT,
  meta: {
    orderNo: 4,
    icon: 'icon-park-outline:analysis',
    title: '生产线安全综合分析',
    roles: [RoleEnum.Line],
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
      path: 'diagnosis',
      name: 'diagnosis',
      component: () => import('/@/views/analysis/diagnosis/index.vue'),
      meta: {
        title: '生产线月度安全情况诊断报告',
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
