import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import LegalPage from '@/pages/LegalPage.vue'
import CircuitPage from '@/pages/CircuitPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/legal',
      name: 'legal',
      component: LegalPage,
    },
    {
      path: '/circuit/:id',
      name: 'circuit',
      component: CircuitPage,
    },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      const element = document.querySelector(to.hash)
      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY - 80
        return { left: 0, top: top }
      }
    }
    return { top: 0 }
  },
})

export default router
