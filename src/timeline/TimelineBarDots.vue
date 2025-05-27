<template>
  <div>
    <div class="flex justify-between text-center bg-zinc-700 p-4">
      <button
        id="button-wrapper"
        v-for="(segment, idx) in timeline ? timeline.getSegments() : []"
        :key="segment.id"
        @click="activateSegment(segment.id)"
        @mouseenter="handleDotMouseEnter(segment)"
        @mouseleave="handleDotMouseLeave"
        :class="[
          'flex flex-col items-center cursor-pointer gap-2 transition-all duration-200',
          getButtonFlexClass(segment),
        ]"
      >
        <div class="flex-1 truncate whitespace-normal break-words line-clamp-2">
          {{ segment.description }}
        </div>

        <div
          :class="[
            'w-5 h-5 rounded-full border-2 transition-all duration-200 outline-none shrink-0',
            getDotStatusClass(idx, segment),
          ]"></div>
      </button>
    </div>

    <div class="border border-b-1 border-zinc-400"></div>
  </div>
</template>

<script setup lang="ts">
import { useTimelineStore } from '@/timeline/stores/timelineStore';
import { storeToRefs } from 'pinia';
import type { Segment } from './data/Segment';
import { logger } from '@/services/loggerService';

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
  logger.debug('handleDotMouseEnter', segment.id, segment.description);
  debugger;
  timeline.value?.hoverSegment(segment.id);
}

function handleDotMouseLeave() {
  timeline.value?.clearHover();
}

function getButtonFlexClass(segment: Segment): string {
  // If any segment is hovered, only the hovered one gets flex-4, others flex-1
  const anyHovered = !!timeline.value?.getHoveredSegment();
  if (anyHovered) {
    return segment.isHovered ? 'flex-4' : 'flex-1';
  }

  // If no hover, active gets flex-4, others flex-1
  return segment.isActive ? 'flex-4' : 'flex-1';
}
</script>
