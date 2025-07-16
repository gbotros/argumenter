import { createRouter, createWebHistory } from 'vue-router';
import TimelinePlayer from '@/player/TimelinePlayer.vue';
import TimelineEditor from '@/editor/TimelineEditor.vue';
import Dashboard from '../dashboard/Dashboard.vue';
import HelpPage from '@/layout/HelpPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/player',
      name: 'player',
      component: TimelinePlayer,
    },
    {
      path: '/editor',
      name: 'editor',
      component: TimelineEditor,
    },
    {
      path: '/help',
      name: 'help',
      component: HelpPage,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
    },
  ],
});

export default router;
