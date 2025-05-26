<template>
  <div
    v-if="activeTextualSegment"
    class="flex flex-col items-center bg-zinc-800 rounded-xl p-6 w-full max-w-lg mx-auto mt-4"
  >
    <div class="text-lg text-zinc-100 mb-4 text-center">{{ activeTextualSegment.content }}</div>
    <div class="text-base text-green-400 mb-4">{{ segmentRemainingTime }}s</div>
    <div class="flex gap-3 mt-2">
      <button
        class="px-4 py-2 rounded bg-zinc-900 text-zinc-100 border border-zinc-700 hover:bg-zinc-700 transition"
        @click="togglePause"
      >
        {{ isPaused ? 'Resume' : 'Pause' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted, onUnmounted, inject, computed } from 'vue';
import { useTimelineStore } from '@/timeline/stores/timelineStore';
import { storeToRefs } from 'pinia';
import type { Logger } from '../types/logger';
import type { TextualSegment } from './types/index';

const timelineStore = useTimelineStore();
const { activeSegment, segmentRemainingTime, isPaused } = storeToRefs(timelineStore);
const { setSegmentRemainingTime, setIsPaused } = timelineStore;
const logger = inject<Logger>('logger');
const emit = defineEmits(['segment-complete']);

const activeTextualSegment = computed(() => {
  return activeSegment.value && activeSegment.value.type === 'text'
    ? (activeSegment.value as TextualSegment)
    : null;
});

let timer: number | null = null;


function startTimer() {
  timer = window.setInterval(() => {
    if (isPaused.value) return;

    if (segmentRemainingTime.value > 0) {
      setSegmentRemainingTime(segmentRemainingTime.value - 1);
    } else {
      completeSegment();
    }
  }, 1000);

  logger?.debug(`[TextualSegmentView] Timer started for segment ${activeTextualSegment.value?.id}`);
}

function completeSegment() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }

  emit('segment-complete');
  logger?.info(`[TextualSegmentView] Segment ${activeTextualSegment.value?.id} completed`);
}

function togglePause() {
  setIsPaused(!isPaused.value);
  logger?.debug(
    `[TextualSegmentView] ${!isPaused.value ? 'Paused' : 'Resumed'} segment ${activeTextualSegment.value?.id}`,
  );
}

onMounted(() => {
  setSegmentRemainingTime(activeTextualSegment.value?.duration ?? 0);
  startTimer();
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
  setSegmentRemainingTime(0);
  setIsPaused(false);
});

watch(activeTextualSegment, (newSeg) => {
  setSegmentRemainingTime(newSeg?.duration ?? 0);
  if (timer) clearInterval(timer);
  startTimer();
});
</script>
