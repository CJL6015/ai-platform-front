import type { AppRouteModule } from '/@/router/types';
import { RoleEnum } from '/@/enums/roleEnum';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const warn: AppRouteModule = {
  path: '/warn',
  name: t('routes.warn.title'),
  component: LAYOUT,
  redirect: '/warn/history',
  meta: {
    orderNo: 0,
    icon: 'icon-park-outline:setting-web',
    title: t('routes.warn.title'),
    roles: [RoleEnum.SUPER],
  },
  children: [
    {
      path: 'history',
      name: 'history',
      component: () => import('/@/views/warn/history/index.vue'),
      meta: {
        affix: false,
        title: t('routes.warn.history'),
      },
    },
    {
      path: 'photo',
      name: 'photo',
      component: () => import('/@/views/warn/photo/index.vue'),
      meta: {
        affix: false,
        title: t('routes.warn.photo'),
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
