<template>
  <div
    v-if="activeTextualSegment"
    class="border border-zinc-600 p-6 bg-zinc-800 rounded-lg relative flex-1 flex flex-col items-center w-full">
    <div class="flex flex-col items-center max-w-2xl">
      <div class="text-4xl font-bold mb-4">
        {{ activeTextualSegment.title }}
      </div>
      <hr class="border-zinc-700 mb-4 w-full max-w-2xl" />

      <div class="flex-1 flex-col items-center justify-center w-full mb-16">
        <div class="text-3xl">
          {{ activeTextualSegment.content }}
        </div>
      </div>

      <div class="w-full mt-4">
        <div class="text-lg text-zinc-300 mb-2">Sources:</div>
        <template v-if="sourcesList.length">
          <ul class="list-disc list-inside space-y-1">
            <li v-for="(src, idx) in sourcesList" :key="idx">
              <a
                :href="src"
                target="_blank"
                rel="noopener"
                class="text-blue-400 underline hover:text-blue-200"
                >{{ src }}</a
              >
            </li>
          </ul>
        </template>
        <template v-else>
          <div class="text-zinc-400 italic">No sources provided</div>
        </template>
      </div>

    </div>

    <div
      class="absolute bottom-4 right-6 text-2xl bg-zinc-900 bg-opacity-80 px-4 py-2 rounded shadow text-blue-200 select-none">
      {{ activeTextualSegment.getRemainingTime() }}s
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue';
import { useTimelineStore } from '@/player/stores/timelineStore';
import { storeToRefs } from 'pinia';

const timelineStore = useTimelineStore();
const { timeline, isPaused } = storeToRefs(timelineStore);
const emit = defineEmits(['segment-complete']);

const activeTextualSegment = computed(() => timeline.value?.getActiveTextSegment() ?? null);
const sourcesList = computed(() => activeTextualSegment.value?.sources ?? []);

let timer: number | null = null;

function startTimer() {
  timer = window.setInterval(() => {
    if (isPaused.value) return;
    if (!activeTextualSegment.value) return;

    const remainingTime = activeTextualSegment.value.getRemainingTime() ?? 0;
    if (remainingTime > 0) {
      const newAtTime = activeTextualSegment.value.getCurrentlyAtTime() + 1;
      activeTextualSegment.value.setCurrentlyAtTime(newAtTime);
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
