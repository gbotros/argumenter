<template>
  <div v-if="timeline?.getActiveSegment()" class="w-full flex flex-col gap-2 min-w-[180px] text-left">
    <div class="flex items-center gap-3 text-lg bg-zinc-900 border-b border-zinc-700 rounded-t px-4 py-2">
      <span class="text-2xl" :class="timeline?.getActiveSegment()?.type === 'text' ? 'text-green-400' : 'text-blue-400'">
        {{ timeline?.getActiveSegment()?.type === 'text' ? '📝' : '🎬' }}
      </span>
      <span class="font-bold text-zinc-100 text-base">
     {{ timeline?.getActiveSegment()?.description }}
      </span>


      <span class="ml-auto text-blue-400 font-semibold flex items-center">
        ⏳
        {{ Number(timeline?.getActiveSegment()?.getCurrentlyAtTime()).toFixed(0) }}s -
        {{ Number(timeline?.getActiveSegment()?.endAt).toFixed(0) }}s
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTimelineStore } from '@/timeline/stores/timelineStore';
import { storeToRefs } from 'pinia';

const timelineStore = useTimelineStore();
const { timeline } = storeToRefs(timelineStore);
</script>
