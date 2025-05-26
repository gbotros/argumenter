<template>
  <div v-if="activeConcurrentTextualSegment" class="flex flex-col items-center bg-zinc-800 rounded-xl p-4 w-full max-w-xs mx-auto mt-2">
    <div class="text-base text-zinc-100 mb-2 text-center">{{ activeConcurrentTextualSegment.content }}</div>
    <div class="text-sm text-green-400 mb-2">{{ activeConcurrentTextualSegment.startAt }}s - {{ activeConcurrentTextualSegment.endAt }}s</div>
    <div class="text-xs text-green-400 text-center">🗒️ {{ activeConcurrentTextualSegment.description }}</div>
  </div>
</template>

<script setup lang="ts">
import { useTimelineStore } from '@/timeline/stores/timelineStore';
import { storeToRefs } from 'pinia';

const timelineStore = useTimelineStore();
const { activeConcurrentTextualSegment } = storeToRefs(timelineStore);
</script>
