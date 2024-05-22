import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/main/Main.vue')
    },
    {
      path: '/application',
      name: 'application',
      component: () => import('../components/application/Main.vue')
    },
    {
      path: '/forum',
      name: 'forumsMap',
      component: () => import('../components/forum/ForumsMap.vue')
    },
    {
      path: '/forum/:id',
      name: 'forum',
      component: () => import('../components/forum/ForumPoint.vue')
    },
    {
      path: '/404',
      name: 'notfoundpage',
      component: () => import('../components/ErrPages/404NotFound.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'notfoundredirect',
      redirect: '/404'
    },
    {
      path: '/auth',
      name: 'Authentification',
      component: () => import('../components/profile/auth.vue')
    }
  ]
})

export default router
