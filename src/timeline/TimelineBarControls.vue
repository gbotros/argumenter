<template>
  <div class="timeline-player__bar-controls">
    <button
      class="timeline-player__bar-controls-button"
      @click="goBack"
      :disabled="activeIndex === 0"
    >
      Back
    </button>
    <button
      class="timeline-player__bar-controls-button"
      @click="goNext"
      :disabled="activeIndex === segments.length - 1"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
import { useTimelineStore } from '@/stores/timeline/timelineStore';
import { storeToRefs } from 'pinia';

const timelineStore = useTimelineStore();
const { activeIndex, segments } = storeToRefs(timelineStore);

function goBack() {
  if (activeIndex.value > 0) {
    timelineStore.setActiveIndex(activeIndex.value - 1);
  }
}

function goNext() {
  if (activeIndex.value < segments.value.length - 1) {
    timelineStore.setActiveIndex(activeIndex.value + 1);
  }
}
</script>

<style lang="scss" scoped>
@use "@/assets/variables.scss" as *;

.timeline-player__bar-controls {
  display: flex;
  gap: 1.5rem;
  margin-top: 0.5rem;
}

.timeline-player__bar-controls-button {
  background: $color-bg-alt;
  color: $color-fg;
  border: 1px solid $color-border-light;
  border-radius: 0.4rem;
  padding: 0.4rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
