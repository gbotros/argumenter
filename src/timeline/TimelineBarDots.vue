<template>
  <div class="timeline-bar-dots">
    <button
      v-for="(segment, idx) in segments"
      :key="segment.id"
      :class="[
        'timeline-player__bar-dot',
        getDotStatusClass(idx, segment),
        `timeline-player__bar-dot--${segment.stance}`,
      ]"
      @click="activateSegment(idx)"
      @mouseenter="handleDotMouseEnter(segment)"
      @mouseleave="handleDotMouseLeave"
    ></button>
  </div>
</template>

<script setup lang="ts">
import { useTimelineStore } from '@/stores/timeline/timelineStore';
import { storeToRefs } from 'pinia';

const timelineStore = useTimelineStore();
const { segments, activeIndex, visitedSegments, activeSegment } = storeToRefs(timelineStore);

function activateSegment(idx: number) {
  timelineStore.setActiveIndex(idx);
}

function handleDotMouseEnter(segment: import('./types').Segment) {
  timelineStore.setHoveredSegment(segment);
}

function handleDotMouseLeave() {
  timelineStore.setHoveredSegment(null);
}

function getDotStatusClass(idx: number, segment: import('./types').Segment): string {
  if (idx === activeIndex.value) {
    return 'timeline-player__bar-dot--active';
  }
  if (timelineStore.isVisited(segment)) {
    return 'timeline-player__bar-dot--visited';
  }
  return 'timeline-player__bar-dot--unvisited';
}
</script>

<style lang="scss" scoped>
@use '@/assets/variables.scss' as *;

.timeline-bar-dots {
  display: flex;
  gap: 1.2rem;
  margin-bottom: 0.5rem;
  width: 100%;
  justify-content: space-around;
  position: relative;
  align-items: center;
}

.timeline-player__bar-dot {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;

  // background: var(--color-neutral, #222);
  box-shadow: 0 0 0 2px transparent;
  transition:
    box-shadow 0.2s,
    border-color 0.2s,
    background 0.2s;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
  display: inline-block;
  border-width: 3px;
  border-style: solid;

  &--active {
    box-shadow: 0 0 0 3px $color-fg;
    border-color: $color-fg;
  }

  &--unvisited {
    background-color: $color-bg;

    // BEM: Unvisited + Stance modifiers
    &.timeline-player__bar-dot--main {
      border-color: $color-main-shadow;
    }

    &.timeline-player__bar-dot--supporting {
      border-color: $color-supporting-shadow;
    }

    &.timeline-player__bar-dot--against {
      border-color: $color-against-shadow;
    }
  }

  &--visited {
    // BEM: Visited + Stance modifiers
    &.timeline-player__bar-dot--main {
      background-color: $color-main;
      border-color: $color-main-shadow;
    }

    &.timeline-player__bar-dot--supporting {
      background-color: $color-supporting;
      border-color: $color-supporting-shadow;
    }

    &.timeline-player__bar-dot--against {
      background-color: $color-against;
      border-color: $color-against-shadow;
    }
  }
}
</style>
