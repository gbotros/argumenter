<template>
  <li
    :class="['flex flex-col gap-2 bg-zinc-700 rounded p-4 group', { 'ring-2 ring-blue-400': dragOver }]"
    draggable="true"
    @dragstart="onDragStart"
    @dragover.prevent="onDragOverHandler"
    @dragleave="onDragLeave"
    @drop="onDrop"
    @dragend="onDragEnd"
  >
    <div class="flex items-center gap-4">
      <span class="font-bold text-blue-300 cursor-move">☰</span>
      <span class="font-bold text-blue-300">{{ localSegment.type === 'text' ? '📝 Text' : '🎬 Video' }}</span>
      <select v-model="localSegment.type" @change="onTypeChange" class="bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-100 ml-2">
        <option value="text">Text</option>
        <option value="video">Video</option>
      </select>
      <button class="text-red-400 hover:text-red-200 transition ml-auto" @click="handleDelete">Delete</button>
    </div>
    <div class="flex flex-col md:flex-row gap-2">
      <div class="flex-1">
        <label class="block text-xs text-zinc-400 mb-1">Description</label>
        <input v-model="localSegment.description" @change="save" type="text" maxlength="100" class="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-100" />
      </div>
      <div class="flex-1">
        <label class="block text-xs text-zinc-400 mb-1">Stance</label>
        <select v-model="localSegment.stance" @change="save" class="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-100">
          <option value="main">Main</option>
          <option value="supporting">Supporting</option>
          <option value="against">Against</option>
        </select>
      </div>
    </div>
    <div v-if="localSegment.type === 'text'" class="flex flex-col md:flex-row gap-2">
      <div class="flex-1">
        <label class="block text-xs text-zinc-400 mb-1">Content</label>
        <textarea v-model="localSegment.content" @change="save" rows="2" maxlength="500" class="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-100"></textarea>
      </div>
      <div class="flex-1">
        <label class="block text-xs text-zinc-400 mb-1">Duration (s)</label>
        <input v-model.number="localSegment.endAt" @change="save" type="number" min="1" max="600" class="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-100" />
      </div>
    </div>
    <div v-else class="flex flex-col md:flex-row gap-2">
      <div class="flex-1">
        <label class="block text-xs text-zinc-400 mb-1">YouTube Video ID</label>
        <input v-model="localSegment.videoId" @change="save" type="text" maxlength="20" class="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-100" />
      </div>
      <div class="flex-1">
        <label class="block text-xs text-zinc-400 mb-1">Start At (s)</label>
        <input v-model.number="localSegment.startAt" @change="save" type="number" min="0" max="36000" class="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-100" />
      </div>
      <div class="flex-1">
        <label class="block text-xs text-zinc-400 mb-1">End At (s)</label>
        <input v-model.number="localSegment.endAt" @change="save" type="number" min="1" max="36000" class="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-100" />
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { EditorSegment } from '../stores/editorStore';

const props = defineProps<{
  segment: EditorSegment;
  idx: number;
  dragOver: boolean;
}>();
const emit = defineEmits([
  'save',
  'delete',
  'dragstart',
  'dragover',
  'dragleave',
  'drop',
  'dragend',
]);

const localSegment = ref({ ...props.segment });

watch(
  () => props.segment,
  (newVal) => {
    localSegment.value = { ...newVal };
  },
  { deep: true }
);

function save() {
  emit('save', { ...localSegment.value }, props.idx);
}

function handleDelete() {
  emit('delete', props.idx);
}

function onTypeChange() {
  if (localSegment.value.type === 'text') {
    localSegment.value.content = '';
    localSegment.value.endAt = 5;
    delete localSegment.value.videoId;
    delete localSegment.value.startAt;
    delete localSegment.value.concurrentTextSegments;
  } else {
    localSegment.value.videoId = '';
    localSegment.value.startAt = 0;
    localSegment.value.endAt = 5;
    localSegment.value.concurrentTextSegments = [];
    delete localSegment.value.content;
  }
  save();
}

function onDragStart(e: DragEvent) {
  emit('dragstart', props.idx, e);
}
function onDragOverHandler(e: DragEvent) {
  emit('dragover', props.idx, e);
}
function onDragLeave(e: DragEvent) {
  emit('dragleave', props.idx, e);
}
function onDrop(e: DragEvent) {
  emit('drop', props.idx, e);
}
function onDragEnd(e: DragEvent) {
  emit('dragend', props.idx, e);
}
</script>

<style scoped lang="scss">
</style>
