import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import LegalPage from '@/pages/LegalPage.vue'

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
  ],
  scrollBehavior(to) {
    if (to.hash) {
      const element = document.querySelector(to.hash)
      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY - 80
        return { left: 0, top: top, behavior: 'smooth' }
      }
    }
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
