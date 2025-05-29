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
  <RouterView />
</template>

<style scoped></style>
