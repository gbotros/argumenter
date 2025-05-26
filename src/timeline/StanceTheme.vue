<template>
  <div
    class="stance-theme"
    :class="`stance-theme--${activeSegment?.stance ?? ''}`"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useTimelineStore } from '@/timeline/stores/timelineStore';
import { storeToRefs } from 'pinia';

const timelineStore = useTimelineStore();
const { activeSegment } = storeToRefs(timelineStore);
</script>

<style lang="scss" scoped>

.stance-theme {
  border: 3px solid $color-border;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  transition: border-color 0.3s;
  height: 100%;
  aspect-ratio: 16/9;
  background: transparent;

  &--main {
    border-color: $color-main;
  }
  &--supporting {
    border-color: $color-supporting;
  }
  &--against {
    border-color: $color-against;
  }
}
</style>
