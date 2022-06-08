
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
        component: () => import('pages/Directives/Community')
      },
      {
        path: '/city',
        name:'city',
        component: () => import('../pages/Directives/City')
      },
      {
        path: '/city-district',
        name:'city_district',
        component: () => import('pages/Directives/City_District')
      },
      {
        path: '/street',
        name: 'street',
        component: () => import('../pages/Directives/Street')
      },
      {
        path: '/people',
        name: 'people',
        component: () => import('../pages/Directives/People')
      },
      {
        path: '/service',
        name: 'service',
        component: () => import('../pages/Directives/Service')
      },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
