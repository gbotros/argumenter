<template>
  <div class="textual-segment-view" v-if="activeTextualSegment">
    <div class="textual-segment-view__text-content">{{ activeTextualSegment.content }}</div>
    <div class="textual-segment-view__timer">{{ countdown }}s</div>
    <div class="textual-segment-view__controls">
      <button class="textual-segment-view__pause-btn" @click="togglePause">
        {{ isPaused ? 'Resume' : 'Pause' }}
      </button>
      <!-- <button class="textual-segment-view__skip-btn" @click="completeSegment">Skip</button> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, inject, computed } from 'vue';
import { useTimelineStore } from '@/stores/timeline/timelineStore';
import { storeToRefs } from 'pinia';
import type { Logger } from '../types/logger';
import type { TextualSegment } from './types';

const timelineStore = useTimelineStore();
const { activeSegment } = storeToRefs(timelineStore);
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
}

onMounted(() => {
  countdown.value = activeTextualSegment.value?.duration ?? 0;
  startTimer();
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

watch(activeTextualSegment, (newSeg) => {
  countdown.value = newSeg?.duration ?? 0;
  if (timer) clearInterval(timer);
  startTimer();
});

</script>

<style lang="scss" scoped>
.textual-segment-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: $color-bg-alt;
  border-radius: 0.7rem;
  padding: 1.2rem 1.5rem;
  box-shadow: 0 1px 8px $color-shadow-light;

  &__text-content {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: $color-fg;
    text-align: center;
  }

  &__timer {
    font-size: 1.1rem;
    color: $color-timer;
    margin-bottom: 1rem;
  }

  &__controls {
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
  }

  &__pause-btn {
    background: $color-bg;
    color: $color-fg;
    border: 1px solid $color-border-light;
    border-radius: 0.4rem;
    padding: 0.4rem 1.2rem;
    font-size: 1rem;
    cursor: pointer;
    transition:
      background 0.2s,
      border-color 0.2s;

    &:hover {
      background: $color-btn-hover;
      border-color: $color-btn-hover-border;
    }
  }

  &__skip-btn {
    background: $color-bg;
    color: $color-fg;
    border: 1px solid $color-border-light;
    border-radius: 0.4rem;
    padding: 0.4rem 1.2rem;
    font-size: 1rem;
    cursor: pointer;
    transition:
      background 0.2s,
      border-color 0.2s;

    &:hover {
      background: $color-btn-hover;
      border-color: $color-btn-hover-border;
    }
  }
}
</style>
