import type { AppRouteModule } from '/@/router/types';
import { RoleEnum } from '/@/enums/roleEnum';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const realtime: AppRouteModule = {
  path: '/monitor',
  name: t('routes.realtime.title'),
  component: LAYOUT,
  meta: {
    orderNo: 1,
    icon: 'material-symbols:monitor-outline',
    title: t('routes.realtime.title'),
    roles: [RoleEnum.LEIGUAN],
  },
  children: [
    {
      path: 'overcrowd',
      name: 'overcrowd',
      component: () => import('/@/views/realtime/overcrowd/index.vue'),
      meta: {
        title: t('routes.realtime.overcrowd'),
      },
    },
    {
      path: 'overrun',
      name: 'overrun',
      component: () => import('/@/views/realtime/overrun/index.vue'),
      meta: {
        // affix: true,
        title: '故障停机巡检抓拍',
        showInMenu: false,
      },
    },
    {
      path: 'monitor',
      name: 'monitor',
      component: () => import('/@/views/realtime/monitor/index.vue'),
      meta: {
        // affix: true,
        title: '故障与停机状态历史回查',
      },
    },
  ],
};

export default realtime;
