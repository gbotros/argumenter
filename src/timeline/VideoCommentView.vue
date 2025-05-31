<template>
  <div
    v-if="timeline"
    class="flex flex-col items-center w-full h-full justify-center border border-zinc-600 p-6 bg-zinc-800 rounded-lg">
    <div class="text-base mb-2 text-center">{{ timeline?.getActiveVideoComment()?.content }}</div>
    <div class="text-sm mb-2">
      {{ timeline?.getActiveVideoComment()?.startAt }}s -
      {{ timeline?.getActiveVideoComment()?.endAt }}s
    </div>
    <div class="text-xs text-center">{{ timeline?.getActiveVideoComment()?.title }}</div>
  </div>
</template>

<script setup lang="ts">
import { useTimelineStore } from '@/timeline/stores/timelineStore';
import { storeToRefs } from 'pinia';

const timelineStore = useTimelineStore();
const { timeline } = storeToRefs(timelineStore);
</script>
