import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const risk: AppRouteModule = {
  path: '/risk',
  name: '安全隐患',
  component: LAYOUT,
  meta: {
    orderNo: 3,
    icon: 'ion:ios-monitor',
    title: '设备安全隐患分析',
  },
  children: [
    {
      path: 'security',
      name: 'security',
      component: () => import('/@/views/risk/security/index.vue'),
      meta: {
        title: '设备安全状态分析',
      },
    },
    {
      path: 'equipment',
      name: 'equipment',
      component: () => import('/@/views/risk/equipment/index.vue'),
      meta: {
        title: '设备超限相关性分析',
      },
    },
    {
      path: 'correlation',
      name: 'correlation',
      component: () => import('/@/views/risk/correlation/index.vue'),
      meta: {
        title: '传感器超限相关性分析',
      },
    },
  ],
};

export default risk;
