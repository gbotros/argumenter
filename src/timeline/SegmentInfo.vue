<template>
  <div v-if="timeline?.getActiveSegment()">
    <div
      class="flex items-center gap-3 text-lg bg-zinc-700 border-b border-zinc-700 rounded-t px-2 py-2">
      <span class="text-lg">
        {{ timeline?.getActiveSegment()?.type === 'text' ? '📝' : '🎬' }}
      </span>
      <span class="font-bold text-lg">
        {{ timeline?.getActiveSegment()?.description }}
      </span>
      <span class="ml-auto font-semibold flex items-center text-base">
        ⏳
        {{ Number(timeline?.getActiveSegment()?.getCurrentlyAtTime()).toFixed(0) }}s -
        {{ Number(timeline?.getActiveSegment()?.endAt).toFixed(0) }}s
      </span>
    </div>
    <StanceTheme></StanceTheme>
  </div>
</template>

<script setup lang="ts">
import { useTimelineStore } from '@/timeline/stores/timelineStore';
import { storeToRefs } from 'pinia';
import StanceTheme from './StanceTheme.vue';

const timelineStore = useTimelineStore();
const { timeline } = storeToRefs(timelineStore);
</script>
