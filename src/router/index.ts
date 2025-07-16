import { createRouter, createWebHistory } from 'vue-router';
import TimelinePlayer from '@/player/TimelinePlayer.vue';
import TimelineEditor from '@/editor/TimelineEditor.vue';
import HelpPage from '@/layout/HelpPage.vue';
import PersonalDashboard from '../dashboard/PersonalDashboard.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: TimelinePlayer,
    },
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
      component: PersonalDashboard,
    },
  ],
});

export default router;
