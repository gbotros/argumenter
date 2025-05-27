<template>
  <div
    v-if="timeline?.getActiveTextSegment()"
    class="flex flex-col items-center bg-zinc-800 rounded-xl p-6 w-full max-w-lg mx-auto mt-4"
  >
    <div class="text-lg text-zinc-100 mb-4 text-center">{{ timeline?.getActiveTextSegment()?.content }}</div>
    <div class="text-base text-green-400 mb-4">
      {{ timeline?.getActiveTextSegment()?.getRemainingTime() }}s
    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, inject } from 'vue';
import { useTimelineStore } from '@/timeline/stores/timelineStore';
import { storeToRefs } from 'pinia';
import type { Logger } from '../types/logger';

const timelineStore = useTimelineStore();
const { timeline, isPaused } = storeToRefs(timelineStore);
const logger = inject<Logger>('logger');
const emit = defineEmits(['segment-complete']);

let timer: number | null = null;

function startTimer() {
  timer = window.setInterval(() => {
    if (isPaused.value) return;
    const activeTextualSegment = timeline.value?.getActiveTextSegment();
    if (!activeTextualSegment) return;

    const remainingTime = activeTextualSegment.getRemainingTime() ?? 0;
    if (remainingTime > 0) {
      const newAtTime = activeTextualSegment.getCurrentlyAtTime() + 1;
      activeTextualSegment.setCurrentlyAtTime(newAtTime);
    } else {
      completeSegment();
    }
  }, 1000);

}

function completeSegment() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }

  emit('segment-complete');
}

onMounted(() => {
  startTimer();
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
  timelineStore.resume();
});
</script>
