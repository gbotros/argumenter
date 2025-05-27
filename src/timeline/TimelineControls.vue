<template>
  <div class="flex gap-6 w-full justify-center items-center mt-2">
    <button
      class="px-4 py-2 rounded bg-zinc-800 text-zinc-100 border border-zinc-700 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      @click="goBack"
      :disabled="!timeline || !timeline.allowBack"
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
      :disabled="!timeline || !timeline.allowNext"
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
  if (timeline.value && timeline.value.allowBack) {
    timeline.value.activatePreviousSegment();
  }
}

function goNext() {
  if (timeline.value && timeline.value.allowNext) {
    timeline.value.activateNextSegment();
  }
}

function togglePause() {
  if (!timeline.value) return;
  if (isPaused.value) {
    timelineStore.resume();
  } else {
    timelineStore.pause();
  }
}
</script>
