<template>
  <div class="mb-8">
    <ul class="space-y-4">
      <EditorSegmentItem
        v-for="segment in segments"
        :key="segment.id"
        :segment="segment"
        @dragstart="onDragStart"
        @drop="onDrop" />
    </ul>
    <div class="flex justify-center mt-6">
      <button
        @click="addNewSegment"
        class="rounded bg-blue-700 hover:bg-blue-600 text-white text-2xl font-bold px-4 py-2"
        title="Add a new segment to the timeline"
        aria-label="Add new segment">
        + Add New Segment
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useEditorStore } from '../stores/editorStore';
import EditorSegmentItem from './EditorSegmentItem.vue';

const editorStore = useEditorStore();
const { segments } = storeToRefs(editorStore);

const dragId = ref<string | null>(null);

function onDragStart(id: string) {
  dragId.value = id;
}

function onDrop(id: string) {
  if (dragId.value !== null && dragId.value !== id) {
    editorStore.reorderSegments(dragId.value, id);
  }
  dragId.value = null;
}

function addNewSegment() {
  editorStore.addNewSegment();
}
</script>

<style scoped lang="scss"></style>
