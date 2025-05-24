import { createRouter, createWebHistory } from 'vue-router'
import TimelinePlayer from '@/timeline/TimelinePlayer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TimelinePlayer,
    }
  ],
})

export default router
