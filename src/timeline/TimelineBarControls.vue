<template>
  <div class="timeline-player__bar-controls">
    <button
      class="timeline-player__bar-controls-button"
      @click="$emit('back')"
      :disabled="activeIndex === 0"
    >
      Back
    </button>
    <button
      class="timeline-player__bar-controls-button"
      @click="$emit('next')"
      :disabled="activeIndex === segmentsCount - 1"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  activeIndex: number;
  segmentsCount: number;
}>();
const emit = defineEmits<{
  (e: 'back'): void;
  (e: 'next'): void;
}>();
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
