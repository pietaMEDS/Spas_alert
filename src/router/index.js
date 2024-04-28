import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
    }
  ]
})

export default router
