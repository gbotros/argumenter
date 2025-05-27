<template>
  <div class="flex gap-6 w-full justify-center items-center mt-2">
    <button
      class="px-4 py-2 rounded bg-zinc-800 text-zinc-100 border border-zinc-700 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      @click="goBack"
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
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
import { useTimelineStore } from '@/timeline/stores/timelineStore';
import { storeToRefs } from 'pinia';

const timelineStore = useTimelineStore();
const { timeline, isPaused } = storeToRefs(timelineStore);

function goBack() {
  timeline.value?.activatePreviousSegment();
}

function goNext() {
   timeline.value?.activateNextSegment();
}

function togglePause() {
  if (isPaused.value) {
    timelineStore.resume();
  } else {
    timelineStore.pause();
  }
}
</script>
