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
      path: 'month',
      name: 'month',
      component: () => import('/@/views/report/month/index.vue'),
      meta: {
        title: '月度报表下载',
      },
    },
  ],
};

export default risk;
