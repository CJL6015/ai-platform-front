import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const warn: AppRouteModule = {
  path: '/warn',
  name: t('routes.warn.title'),
  component: LAYOUT,
  redirect: '/warn/history',
  meta: {
    orderNo: 0,
    icon: 'ion:grid-outline',
    title: t('routes.warn.title'),
  },
  children: [
    {
      path: 'history',
      name: 'history',
      component: () => import('/@/views/warn/history/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.warn.history'),
      },
    },
    {
      path: 'photo',
      name: 'photo',
      component: () => import('/@/views/warn/photo/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.warn.photo'),
        showInMenu: false,
      },
    },
    {
      path: 'rule',
      name: 'rule',
      component: () => import('/@/views/warn/rule/index.vue'),
      meta: {
        title: t('routes.warn.rule'),
      },
    },
  ],
};

export default warn;
