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
      path: '/forum/edit/:id',
      name: 'edit',
      component: () => import('../components/forum/ForumPointEdit.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../components/adminPanel/admin.vue')
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
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../components/profile/profile.vue')
    },
    {
      path: '/registration',
      name: 'Registration',
      component: () => import('../components/profile/registration.vue')
    }
  ]
})

export default router
