<template>
  <div
    class="border-4 rounded-2xl p-6 mb-6 transition-colors duration-300 h-full"
    :class="{
      'border-green-800': activeSegment?.stance === 'main',
      'border-green-500': activeSegment?.stance === 'supporting',
      'border-red-700': activeSegment?.stance === 'against',
      'border-zinc-700': !activeSegment?.stance
    }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useTimelineStore } from '@/timeline/stores/timelineStore';
import { storeToRefs } from 'pinia';

const timelineStore = useTimelineStore();
const { activeSegment } = storeToRefs(timelineStore);
</script>
