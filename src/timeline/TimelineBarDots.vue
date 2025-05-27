<template>
  <div class="flex gap-3 w-full justify-around items-center mb-2">
    <button
      v-for="(segment, idx) in timeline ? timeline.getSegments() : []"
      :key="segment.id"
      :class="[
        'w-5 h-5 rounded-full border-2 transition-all duration-200 outline-none',
        getDotStatusClass(idx, segment),
      ]"
      @click="activateSegment(segment.id)"
      @mouseenter="handleDotMouseEnter(segment)"
      @mouseleave="handleDotMouseLeave"
      :aria-label="segment.description"
    ></button>
  </div>
</template>

<script setup lang="ts">
import { useTimelineStore } from '@/timeline/stores/timelineStore';
import { storeToRefs } from 'pinia';
import type { Segment } from './data/Segment';

const timelineStore = useTimelineStore();
const { timeline } = storeToRefs(timelineStore);

function activateSegment(id: number) {
  timeline.value?.activateSegment(id);
}

function getDotStatusClass(idx: number, segment: Segment): string {
  if (segment.isActive) {
    return 'border-3 bg-blue-800 border-blue-400';
  }
  if (segment.isVisited) {
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

function handleDotMouseEnter(segment: Segment) {
  timeline.value?.hoverSegment(segment.id);
}

function handleDotMouseLeave() {
  timeline.value?.clearHover();
}
</script>
