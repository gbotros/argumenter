<template>
  <div class="concurrent-textual-segment-view">
    <div class="concurrent-textual-segment-view__text-content">{{ segment.content }}</div>
    <div class="concurrent-textual-segment-view__timer">
      {{ segment.startAt }}s - {{ segment.endAt }}s
    </div>
    <div class="concurrent-textual-segment-view__desc">🗒️ {{ segment.description }}</div>
  </div>
</template>

<script setup lang="ts">
import type { ConcurrentTextualSegment } from './types';

const props = defineProps<{ segment: ConcurrentTextualSegment }>();
</script>

<style lang="scss" scoped>
.concurrent-textual-segment-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: $color-bg-alt;
  border-radius: 0.7rem;
  padding: 1.2rem 1.5rem;
  box-shadow: 0 1px 8px $color-shadow-light;
  min-width: 220px;
  max-width: 400px;

  &__text-content {
    font-size: 1.1rem;
    margin-bottom: 0.7rem;
    color: $color-fg;
    text-align: center;
  }

  &__timer {
    font-size: 1rem;
    color: $color-timer;
    margin-bottom: 0.7rem;
  }

  &__desc {
    font-size: 0.98rem;
    color: $color-supporting;
    text-align: center;
  }
}
</style>
