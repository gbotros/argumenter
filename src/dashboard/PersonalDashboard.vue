<template>
  <section
    class="max-w-xl mx-auto p-8 bg-zinc-900 rounded-lg shadow-lg text-white flex flex-col items-center gap-6">
    <h1 class="text-3xl font-bold text-blue-400 mb-4">Dashboard</h1>
    <button
      class="bg-green-700 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition mb-2 w-full"
      @click="loadArgument('luke')">
      Load Evolution Fr Luke Argument
    </button>
    <button
      class="bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition w-full"
      @click="loadArgument('george')">
      Load Evolution GeorgeB Argument
    </button>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { demoSegments as georgeDemoSegments } from '@/player/data/evolutionGeorgeBTimelineData';
import { demoSegments as lukeDemoSegments } from '@/player/data/evolutionFrLukeTimelineData';
import { useTimelineStore } from '@/player/stores/timelineStore';
import { storeToRefs } from 'pinia';
import { Timeline } from '@/player/data';

const timelineStore = useTimelineStore();
const { timeline } = storeToRefs(timelineStore);
const router = useRouter();

function loadArgument(argument: 'luke' | 'george') {
  let argumentSegments;

  if (argument === 'luke') {
    argumentSegments = lukeDemoSegments;
  } else if (argument === 'george') {
    argumentSegments = georgeDemoSegments;
  } else {
    console.error('Unknown argument type:', argument);
    return;
  }

  // Load argument segments into the timeline store
  timeline.value = new Timeline(argumentSegments);
  router.push({ name: 'player' });
}
</script>

<style scoped lang="scss"></style>
