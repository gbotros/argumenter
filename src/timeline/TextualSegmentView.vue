<template>
  <div v-if="activeTextualSegment" class="flex flex-col items-center bg-zinc-800 rounded-xl p-6 w-full max-w-lg mx-auto mt-4">
    <div class="text-lg text-zinc-100 mb-4 text-center">{{ activeTextualSegment.content }}</div>
    <div class="text-base text-green-400 mb-4">{{ countdown }}s</div>
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
import { ref, watch, onMounted, onUnmounted, inject, computed } from 'vue';
import { useTimelineStore } from '@/timeline/stores/timelineStore';
import { storeToRefs } from 'pinia';
import type { Logger } from '../types/logger';
import type { TextualSegment } from './types/index';

const timelineStore = useTimelineStore();
const { activeSegment } = storeToRefs(timelineStore);
const setTextualTimer = timelineStore.setTextualTimer;
const logger = inject<Logger>('logger');
const emit = defineEmits(['segment-complete']);

const activeTextualSegment = computed(() => {
  return activeSegment.value && activeSegment.value.type === 'text'
    ? (activeSegment.value as TextualSegment)
    : null;
});

const countdown = ref(activeTextualSegment.value?.duration ?? 0);
const isPaused = ref(false);
let timer: number | null = null;

watch([countdown, isPaused, activeTextualSegment], () => {
  setTextualTimer(
    countdown.value,
    isPaused.value,
    activeTextualSegment.value?.id ?? null
  );
});

function startTimer() {
  timer = window.setInterval(() => {
    if (isPaused.value) return;

    if (countdown.value > 0) {
      countdown.value--;
    } else {
      completeSegment();
    }
  }, 1000);
  logger?.debug(`[TextualSegmentView] Timer started for segment ${activeTextualSegment.value?.id}`);
  setTextualTimer(
    countdown.value,
    isPaused.value,
    activeTextualSegment.value?.id ?? null
  );
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
  isPaused.value = !isPaused.value;
  logger?.debug(
    `[TextualSegmentView] ${isPaused.value ? 'Paused' : 'Resumed'} segment ${activeTextualSegment.value?.id}`,
  );
  setTextualTimer(
    countdown.value,
    isPaused.value,
    activeTextualSegment.value?.id ?? null
  );
}

onMounted(() => {
  countdown.value = activeTextualSegment.value?.duration ?? 0;
  startTimer();
  setTextualTimer(
    countdown.value,
    isPaused.value,
    activeTextualSegment.value?.id ?? null
  );
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
  setTextualTimer(0, false, null);
});

watch(activeTextualSegment, (newSeg) => {
  countdown.value = newSeg?.duration ?? 0;
  if (timer) clearInterval(timer);
  startTimer();
  setTextualTimer(
    countdown.value,
    isPaused.value,
    newSeg?.id ?? null
  );
});
</script>
