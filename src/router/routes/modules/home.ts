import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const about: AppRouteModule = {
  path: '/about',
  name: 'About',
  component: LAYOUT,
  redirect: '/main',
  meta: {
    hideChildrenInMenu: true,
    icon: 'material-symbols:home-outline',
    title: '集团级监控主画面',
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: 'AboutPage',
      component: () => import('/@/views/main/index.vue'),
      meta: {
        title: '主界面',
        icon: 'simple-icons:about-dot-me',
        hideBreadcrumb: true,
        hideMenu: true,
      },
    },
  ],
};

export default about;
