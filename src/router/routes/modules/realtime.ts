import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const realtime: AppRouteModule = {
  path: '/monitor',
  name: t('routes.realtime.title'),
  component: LAYOUT,
  meta: {
    orderNo: 1,
    icon: 'ion:ios-monitor',
    title: t('routes.realtime.title'),
  },
  children: [
    {
      path: 'monitor',
      name: 'monitor',
      component: () => import('/@/views/realtime/monitor/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.realtime.monitor'),
      },
    },
    {
      path: 'overrun',
      name: 'overrun',
      component: () => import('/@/views/realtime/overrun/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.realtime.overrun'),
        showInMenu: false,
      },
    },
    {
      path: 'overcrowd',
      name: 'overcrowd',
      component: () => import('/@/views/realtime/overcrowd/index.vue'),
      meta: {
        title: t('routes.realtime.overcrowd'),
      },
    },
  ],
};

export default realtime;
