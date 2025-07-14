<template>
  <div class="flex flex-col min-h-screen bg-zinc-900 text-zinc-100 p-8">
    <h1 class="text-3xl font-bold mb-6">Create a New Argument Timeline</h1>
    <EditorToolbar @play="onPlay" />
    <EditorSegmentList />
  </div>
</template>

<script setup lang="ts">
import EditorToolbar from './components/EditorToolbar.vue';
import EditorSegmentList from './components/EditorSegmentList.vue';
import { useRouter } from 'vue-router';
import { useEditorStore } from './stores/editorStore';
import { useTimelineStore } from '@/player/stores/timelineStore';
import { TimelineFactory } from '@/player/services/TimelineFactory';
import { storeToRefs } from 'pinia';

const router = useRouter();
const editorStore = useEditorStore();
const timelineStore = useTimelineStore();
const { segments: editorSegments } = storeToRefs(editorStore);
const { timeline } = storeToRefs(timelineStore);

function onPlay() {
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

<style scoped lang="scss"></style>
