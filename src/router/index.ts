import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/Home.vue'

import { LINKS } from '@/consts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: LINKS.HOME,
      name: 'home',
      component: Home
    },
    {
      path: LINKS.CREATE_QUOTE,
      name: 'create-quote',
      component: () => import('@/pages/CreateQuote.vue')
    },
    {
      path: `${LINKS.HOME}:id`,
      name: 'edit-quote',
      component: () => import('@/pages/EditQuote.vue')
    }
  ]
})

export default router
