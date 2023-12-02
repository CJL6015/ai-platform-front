import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const storehouse: AppRouteModule = {
  path: '/storehouse',
  name: '成品仓库超员监测',
  component: LAYOUT,
  meta: {
    orderNo: 4,
    icon: 'ion:ios-monitor',
    title: '成品仓库超员监测',
  },
  children: [
    {
      path: 'storehouse',
      name: 'storehouse',
      component: () => import('/@/views/storehouse/index.vue'),
      meta: {
        title: '成品仓库超员监测',
      },
    },
  ],
};

export default storehouse;
