import type { AppRouteModule } from '/@/router/types';
import { RoleEnum } from '/@/enums/roleEnum';

import { LAYOUT } from '/@/router/constant';

const risk: AppRouteModule = {
  path: '/report',
  name: '报表下载',
  component: LAYOUT,
  meta: {
    orderNo: 5,
    icon: 'grommet-icons:risk',
    title: '报表下载',
    roles: [RoleEnum.LINE, RoleEnum.LEIGUAN],
  },
  children: [
    {
      path: 'report1',
      name: 'report1',
      component: () => import('/@/views/report/report1/index.vue'),
      meta: {
        title: '一级平台报表下载',
      },
    },
    {
      path: 'report2',
      name: 'report2',
      component: () => import('/@/views/report/report2/index.vue'),
      meta: {
        title: '二级平台报表下载',
      },
    },
    {
      path: 'report3',
      name: 'report3',
      component: () => import('/@/views/report/report3/index.vue'),
      meta: {
        title: '三级平台报表下载',
      },
    },
  ],
};

export default risk;
