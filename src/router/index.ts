import { createRouter, createWebHistory } from 'vue-router'
import TimelinePlayer from '@/timeline/TimelinePlayer.vue'
import TimelineEditor from '@/editor/TimelineEditor.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TimelinePlayer,
    },
    {
      path: '/editor',
      name: 'editor',
      component: TimelineEditor,
    }
  ],
})

export default router
