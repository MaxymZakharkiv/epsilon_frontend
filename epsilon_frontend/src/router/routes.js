
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path:'/region',
        name:'region',
        component: () => import('pages/Directives/Region')
      },
      {
        path: '/district',
        name:'district',
        component: () => import('../pages/Directives/District')
      },
      {
        path: '/communities',
        name: 'communities',
        component: () => import('../pages/Directives/Communities')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
