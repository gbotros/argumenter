<template>
  <div
    v-if="timeline?.getActiveTextSegment()"
    class="flex flex-col items-center justify-center p-6 w-full h-full mx-auto bg-zinc-700 gap-6">
    <div class="text-4xl">
      {{ timeline?.getActiveTextSegment()?.content }}
    </div>
    <div class="text-2xl">{{ timeline?.getActiveTextSegment()?.getRemainingTime() }}s</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useTimelineStore } from '@/timeline/stores/timelineStore';
import { storeToRefs } from 'pinia';

const timelineStore = useTimelineStore();
const { timeline, isPaused } = storeToRefs(timelineStore);
const emit = defineEmits(['segment-complete']);

let timer: number | null = null;

function startTimer() {
  timer = window.setInterval(() => {
    if (isPaused.value) return;
    const activeTextualSegment = timeline.value?.getActiveTextSegment();
    if (!activeTextualSegment) return;

    const remainingTime = activeTextualSegment.getRemainingTime() ?? 0;
    if (remainingTime > 0) {
      const newAtTime = activeTextualSegment.getCurrentlyAtTime() + 1;
      activeTextualSegment.setCurrentlyAtTime(newAtTime);
    } else {
      completeSegment();
    }
  }, 1000);
}

function completeSegment() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }

  emit('segment-complete');
}

onMounted(() => {
  startTimer();
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
  timelineStore.resume();
});
</script>
