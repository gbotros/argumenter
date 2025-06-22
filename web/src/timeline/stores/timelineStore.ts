import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Timeline } from '@/timeline/data/Timeline';

// Pinia store for timeline state management
export const useTimelineStore = defineStore('timeline', () => {
  // State
  const timeline = ref<Timeline | null>(null);
  const isPaused = ref(false);

  // Actions

  function pause() {
    if (isPaused.value) return;
    isPaused.value = true;
  }

  function resume() {
    if (!isPaused.value) return;
    isPaused.value = false;
  }

  return {
    timeline,
    isPaused,
    pause,
    resume,
  };
});
