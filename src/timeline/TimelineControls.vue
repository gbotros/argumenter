<template>
  <div class="flex gap-6 w-full justify-center items-center mt-2">
    <button
      class="px-4 py-2 rounded bg-zinc-800 text-zinc-100 border border-zinc-700 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      @click="goBack"
      :disabled="activeIndex === 0"
    >
      Back
    </button>
    <button
      class="px-4 py-2 rounded bg-zinc-800 text-zinc-100 border border-zinc-700 hover:bg-zinc-700 transition"
      @click="togglePause"
    >
      {{ isPaused ? 'Resume' : 'Pause' }}
    </button>
    <button
      class="px-4 py-2 rounded bg-zinc-800 text-zinc-100 border border-zinc-700 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      @click="goNext"
      :disabled="activeIndex === segments.length - 1"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
import { useTimelineStore } from '@/timeline/stores/timelineStore';
import { storeToRefs } from 'pinia';

const timelineStore = useTimelineStore();
const { activeIndex, segments, isPaused } = storeToRefs(timelineStore);
const { pause, resume } = timelineStore;

function goBack() {
  if (activeIndex.value > 0) {
    timelineStore.activateSegmentByIndex(activeIndex.value - 1);
  }
}

function goNext() {
  if (activeIndex.value < segments.value.length - 1) {
    timelineStore.activateSegmentByIndex(activeIndex.value + 1);
  }
}

function togglePause() {
  if (isPaused.value) {
    resume();
  } else {
    pause();
  }
}
</script>
