/**
The routing of this file will not show the layout.
It is an independent new page.
the contents of the file still need to log in to access
 */
import type { AppRouteModule } from '/@/router/types';

// test
// http:ip:port/main-out
export const mainOutRoutes: AppRouteModule[] = [
  {
    path: '/main-out',
    name: 'MainOut',
    component: () => import('/@/views/main-out/index.vue'),
    meta: {
      title: 'MainOut',
      ignoreAuth: true,
    },
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('/@/views/main/index.vue'),
    meta: {
      title: '主界面',
      hideBreadcrumb: true,
      hideMenu: true,
    },
  },
];

export const mainOutRouteNames = mainOutRoutes.map((item) => item.name);
