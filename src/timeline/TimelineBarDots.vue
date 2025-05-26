<template>
  <div class="flex gap-3 w-full justify-around items-center mb-2">
    <button
      v-for="(segment, idx) in segments"
      :key="segment.id"
      :class="[
        'w-5 h-5 rounded-full border-2 transition-all duration-200 outline-none',
        idx === activeIndex ? 'scale-125 border-blue-400' : '',
        getDotStatusClass(idx, segment)
      ]"
      @click="activateSegment(idx)"
      @mouseenter="handleDotMouseEnter(segment)"
      @mouseleave="handleDotMouseLeave"
      :aria-label="segment.description"
    ></button>
  </div>
</template>

<script setup lang="ts">
import { useTimelineStore } from '@/timeline/stores/timelineStore';
import { storeToRefs } from 'pinia';

const timelineStore = useTimelineStore();
const { segments, activeIndex } = storeToRefs(timelineStore);

function activateSegment(idx: number) {
  timelineStore.activateSegmentByIndex(idx);
}

function handleDotMouseEnter(segment: import('./types').Segment) {
  timelineStore.setHoveredSegment(segment);
}

function handleDotMouseLeave() {
  timelineStore.setHoveredSegment(null);
}

function getDotStatusClass(idx: number, segment: import('./types').Segment): string {
  if (idx === activeIndex.value) {
    return 'bg-blue-500 border-blue-400';
  }
  if (timelineStore.isVisited(segment)) {
    if (segment.stance === 'main') return 'bg-green-700 border-green-500';
    if (segment.stance === 'supporting') return 'bg-green-500 border-green-300';
    if (segment.stance === 'against') return 'bg-red-700 border-red-500';
  }
  // unvisited
  if (segment.stance === 'main') return 'bg-zinc-800 border-green-700';
  if (segment.stance === 'supporting') return 'bg-zinc-800 border-green-400';
  if (segment.stance === 'against') return 'bg-zinc-800 border-red-700';
  return 'bg-zinc-800 border-zinc-700';
}
</script>
