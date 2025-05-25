<template>
  <div class="timeline-bar-dots">
    <button
      v-for="(segment, idx) in segments"
      :key="segment.id"
      :class="[
        'timeline-player__bar-dot',
        idx === activeIndex ? 'timeline-player__bar-dot--active' : '',
        visitedSegments.includes(segment) ? 'timeline-player__bar-dot--visited' : 'timeline-player__bar-dot--unvisited',
        `timeline-player__bar-dot--${segment.stance}`
      ]"
      @click="activateSegment(idx)"
      @mouseenter="handleDotMouseEnter(segment)"
      @mouseleave="handleDotMouseLeave"
    ></button>
  </div>
</template>

<script setup lang="ts">
import type { Segment } from './timeLine.data';

const props = defineProps<{
  segments: Segment[];
  activeIndex: number;
  visitedSegments: Segment[];
}>();

const emit = defineEmits<{
  (e: 'activate-segment', idx: number): void;
  (e: 'dot-mouse-enter', segment: Segment): void;
  (e: 'dot-mouse-leave'): void;
}>();

function activateSegment(idx: number) {
  emit('activate-segment', idx);
}

function handleDotMouseEnter(segment: Segment) {
  emit('dot-mouse-enter', segment);
}

function handleDotMouseLeave() {
  emit('dot-mouse-leave');
}
</script>

<style lang="scss" scoped>
@use "@/assets/variables.scss" as *;

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
  border: 2px solid var(--color-border, #444);
  background: var(--color-neutral, #222);
  box-shadow: 0 0 0 2px transparent;
  transition: box-shadow 0.2s, border-color 0.2s, background 0.2s;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
  display: inline-block;
}

.timeline-player__bar-dot--active {
  box-shadow: 0 0 0 3px var(--color-accent, #fff);
  border-color: var(--color-accent, #fff);
}

.timeline-player__bar-dot--visited {
  opacity: 1;
  border-style: solid;
}

.timeline-player__bar-dot--unvisited {
  opacity: 0.5;
  border-style: dashed;
}

.timeline-player__bar-dot--main {
  background-color: $color-main !important;
}

.timeline-player__bar-dot--supporting {
  background-color: $color-supporting !important;
}

.timeline-player__bar-dot--against {
  background-color: $color-against !important;
}
</style>
