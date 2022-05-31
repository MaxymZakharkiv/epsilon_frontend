
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
        path: '/community',
        name: 'community',
        component: () => import('../pages/Directives/Communities')
      },
      {
        path: '/city',
        name:'city',
        component: () => import('../pages/Directives/City')
      },
      {
        path: '/city-district',
        name:'city_district',
        component: () => import('../pages/Directives/City_Districts')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
