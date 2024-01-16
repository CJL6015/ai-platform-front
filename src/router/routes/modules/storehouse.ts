import type { AppRouteModule } from '/@/router/types';
import { RoleEnum } from '/@/enums/roleEnum';

import { LAYOUT } from '/@/router/constant';

const storehouse: AppRouteModule = {
  path: '/storehouse',
  name: '成品仓库超员监测',
  component: LAYOUT,
  meta: {
    orderNo: 4,
    icon: 'ic:baseline-people',
    title: '成品仓库超员监测',
    roles: [RoleEnum.STORE],
  },
  children: [
    {
      path: 'store',
      name: 'store',
      component: () => import('../../../views/storehouse/store/index.vue'),
      meta: {
        title: '成品仓库超员监测',
      },
    },
    {
      path: 'statistic',
      name: 'statistic',
      component: () => import('../../../views/storehouse/statistic/index.vue'),
      meta: {
        title: '成品仓库存量超量统计',
      },
    },
  ],
};

export default storehouse;
