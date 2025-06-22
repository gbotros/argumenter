<template>
  <div
    v-if="timeline?.getActiveVideoComment()"
    class="flex-1 flex flex-col border border-zinc-600 p-6 bg-zinc-800 rounded-lg relative">
    <div class="text-4xl font-bold text-center mb-4">
      {{ timeline?.getActiveVideoComment()?.title }}
    </div>
    <hr class="border-zinc-700 mb-4" />
    <div class="flex flex-col items-center justify-center w-full text-3xl whitespace-pre-line">
       {{ timeline?.getActiveVideoComment()?.content }}
    </div>
    <div
      class="absolute bottom-4 right-6 text-2xl bg-zinc-900 bg-opacity-80 px-4 py-2 rounded shadow text-blue-200 select-none">
      {{ remainingTime }}s
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useTimelineStore } from '@/timeline/stores/timelineStore';
import { storeToRefs } from 'pinia';

const timelineStore = useTimelineStore();
const { timeline, isPaused } = storeToRefs(timelineStore);

const remainingTime = ref(0);
let timer: number | null = null;

function updateRemainingTime() {
  const comment = timeline.value?.getActiveVideoComment();
  if (!comment) {
    remainingTime.value = 0;
    return;
  }
  // Calculate remaining time based on comment's endAt and currentlyAt
  const segment = timeline.value?.getActiveVideoSegment();
  const current = segment?.getCurrentlyAtTime?.() ?? comment.startAt;
  remainingTime.value = Math.max(0, Math.round(comment.endAt - current));
}

function startTimer() {
  updateRemainingTime();
  timer = window.setInterval(() => {
    if (!isPaused.value) {
      updateRemainingTime();
    }
  }, 1000);
}

onMounted(() => {
  startTimer();
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

watch(
  () => timeline.value?.getActiveVideoComment(),
  () => {
    updateRemainingTime();
  },
);
watch(isPaused, (paused) => {
  if (!paused) updateRemainingTime();
});
</script>
