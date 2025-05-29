<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { useEditorStore } from './editor/stores/editorStore';
import { useTimelineStore } from './timeline/stores/timelineStore';
import { storeToRefs } from 'pinia';
import { TimelineFactory } from './timeline/services/TimelineFactory';

const router = useRouter();
const route = useRoute();
const editorStore = useEditorStore();
const timelineStore = useTimelineStore();
const { segments: editorSegments } = storeToRefs(editorStore);
const { timeline } = storeToRefs(timelineStore);

function goToEditorWithPlayerSegments() {
  // If on player and timeline exists, copy segments to editor
  if (timeline.value && Array.isArray(timeline.value.segments)) {
    // Use plain objects, not class instances
    const plainSegments = timeline.value.segments.map((seg) => JSON.parse(JSON.stringify(seg)));
    editorStore.setSegments(plainSegments);
    localStorage.setItem('argumenter_editor_segments', JSON.stringify(plainSegments));
  }
  router.push('/editor');
}

async function goToPlayerWithEditorSegments() {
  if (editorSegments.value && Array.isArray(editorSegments.value)) {
    try {
      timeline.value = TimelineFactory.fromEditorSegments(editorSegments.value);
    } catch (err) {
      console.error('Failed to create timeline from editor segments:', editorSegments.value, err);
      timeline.value = null;
    }
  }
   router.push('/');
}
</script>

<template>
  <div>
    <nav class="flex gap-4 mb-6 p-6">
      <button
        v-if="route.path === '/editor'"
        @click="goToPlayerWithEditorSegments"
        class="px-4 py-2 rounded bg-zinc-800 text-zinc-100 hover:bg-zinc-700 transition">
        Play
      </button>
      <button
        v-if="route.path === '/'"
        @click="goToEditorWithPlayerSegments"
        class="px-4 py-2 rounded bg-zinc-800 text-zinc-100 hover:bg-zinc-700 transition">
        Edit
      </button>
    </nav>
    <RouterView />
  </div>
</template>

<style scoped></style>
