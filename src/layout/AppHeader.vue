<template>
  <header class="flex items-center justify-between px-6 py-4 bg-zinc-900 border-b border-zinc-800">
    <div class="flex items-center gap-2">
      <img src="@/assets/logo.svg" alt="Argumenter Logo" class="h-8 w-8" />
      <span class="text-xl font-bold text-white">Argumenter</span>
    </div>
    <nav class="flex items-center gap-6">
      <a
        href="#"
        v-if="!route.path.startsWith('/editor')"
        @click="goToEditorWithPlayerSegments"
        class="text-white hover:text-blue-400 font-medium transition"
        >📝 Open the editor</a
      >

      <a
        href="#"
        v-if="route.path.startsWith('/editor')"
        @click="playTimeline"
        class="text-white hover:text-blue-400 font-medium transition"
        >🎬 Open the player</a
      >

      <a
        href="https://argumenter-docs.example.com"
        target="_blank"
        rel="noopener"
        class="text-white hover:text-blue-400 font-medium transition"
        >❓ Help</a
      >
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useTimelineStore } from '@/player/stores/timelineStore';
import { useEditorStore } from '@/editor/stores/editorStore';
import { storeToRefs } from 'pinia';
import { useRouter, useRoute } from 'vue-router';
import { TimelineFactory } from '@/player/services/TimelineFactory';
import { demoSegments } from '@/player/data/demoTimelineData';

const timelineStore = useTimelineStore();
const editorStore = useEditorStore();
const { timeline } = storeToRefs(timelineStore);
const { segments } = storeToRefs(editorStore);
const router = useRouter();
const route = useRoute();

function goToEditorWithPlayerSegments() {
  if (timeline.value && Array.isArray(timeline.value.segments)) {
    const plainSegments = timeline.value.segments.map((seg) => JSON.parse(JSON.stringify(seg)));
    editorStore.setSegments(plainSegments);
  }
  router.push('/editor');
}

function playTimeline() {
  // If no segments, load demo data first
  if (!segments.value || segments.value.length === 0) {
    reloadDemoData();
  }

  try {
    timeline.value = TimelineFactory.fromEditorSegments(segments.value);
  } catch (err) {
    console.error('Failed to create timeline from editor segments:', segments.value, err);
    timeline.value = null;
  }
  router.push('/');
}

function reloadDemoData() {
    segments.value = demoSegments;
}


</script>

<style scoped lang="scss"></style>
