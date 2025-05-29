<template>
  <div class="mb-8">
    <ul class="space-y-4">
      <EditorSegmentItem
        v-for="(segment, idx) in segments"
        :key="segment.id"
        :segment="segment"
        :idx="idx"
        :dragOver="dragOverIndex === idx"
        @save="onSave"
        @delete="handleDelete"
        @dragstart="onDragStart"
        @dragover="onDragOver"
        @dragleave="onDragLeave"
        @drop="onDrop"
        @dragend="onDragEnd"
      />
    </ul>
    <div class="flex justify-center mt-6">
      <button
        @click="addSegment"
        class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-700 hover:bg-blue-600 text-white text-2xl font-bold shadow transition"
        title="Add new segment"
        aria-label="Add new segment"
      >
        +
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useEditorStore } from '../stores/editorStore';
import EditorSegmentItem from './EditorSegmentItem.vue';
import type { EditorSegment } from '../stores/editorStore';

const editorStore = useEditorStore();
const { segments } = storeToRefs(editorStore);

function handleDelete(idx: number) {
  editorStore.deleteSegment(idx);
}

const dragIndex = ref<number | null>(null);
const dragOverIndex = ref<number | null>(null);

function onDragStart(idx: number) {
  dragIndex.value = idx;
}

function onDragOver(idx: number) {
  if (dragOverIndex.value !== idx) {
    dragOverIndex.value = idx;
  }
}

function onDragLeave() {
  dragOverIndex.value = null;
}

function onDrop(idx: number) {
  if (dragIndex.value !== null && dragIndex.value !== idx) {
    editorStore.reorderSegments(dragIndex.value, idx);
  }
  dragIndex.value = null;
  dragOverIndex.value = null;
}

function onDragEnd() {
  dragIndex.value = null;
  dragOverIndex.value = null;
}

function onSave(segment: EditorSegment, idx: number) {
  editorStore.updateSegment(idx, { ...segment });
}

function addSegment() {
  const newSegment: EditorSegment = {
    id: Date.now(),
    type: 'text',
    stance: 'main',
    description: '',
    content: '',
    endAt: 5,
  };
  editorStore.addSegment(newSegment);
}
</script>

<style scoped lang="scss">
</style>
