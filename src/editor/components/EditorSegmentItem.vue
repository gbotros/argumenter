<template>
  <li
    :class="[
      'flex flex-col gap-2 bg-zinc-700 rounded p-4 group',
      { 'ring-2 ring-blue-400': dragOver },
    ]"
    draggable="true"
    @dragstart="onDragStart"
    @dragover.prevent="onDragOverHandler"
    @dragleave="onDragLeave"
    @drop="onDrop"
    @dragend="onDragEnd">
    <div class="flex items-center gap-4">
      <span class="font-bold text-blue-300 cursor-move">☰</span>
      <span class="font-bold text-blue-300">{{
        localSegment.type === 'text' ? '📝 Text' : '🎬 Video'
      }}</span>
      <div class="flex gap-4 items-center" id="segment-type-radio-group" >
        <label class="inline-flex items-center gap-1 cursor-pointer">
          <input
            type="radio"
            v-model="localSegment.type"
            value="text"
            @change="onTypeChange"
            class="accent-blue-500"
          />
          <span :class="['text-blue-400', localSegment.type === 'text' ? 'font-bold' : 'font-normal']">Text</span>
        </label>
        <label class="inline-flex items-center gap-1 cursor-pointer">
          <input
            type="radio"
            v-model="localSegment.type"
            value="video"
            @change="onTypeChange"
            class="accent-green-500"
          />
          <span :class="['text-green-400', localSegment.type === 'video' ? 'font-bold' : 'font-normal']">Video</span>
        </label>
      </div>
      <button class="text-red-400 hover:text-red-200 transition ml-auto" @click="handleDelete">
        Delete
      </button>
    </div>
    <div class="flex flex-col md:flex-row gap-2">
      <div class="flex-1">
        <label class="block text-xs text-zinc-400 mb-1">Title</label>
        <input
          v-model="localSegment.title"
          @change="save"
          type="text"
          maxlength="100"
          class="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-100" />
      </div>
      <div class="flex-1">
        <label class="block text-xs text-zinc-400 mb-1">Stance</label>
        <div class="flex gap-4 items-center">
          <label class="inline-flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              v-model="localSegment.stance"
              value="main"
              @change="save"
              class="accent-blue-500" />
            <span
              :class="[
                'text-blue-400',
                localSegment.stance === 'main' ? 'font-bold' : 'font-normal',
              ]"
              >Main</span
            >
          </label>
          <label class="inline-flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              v-model="localSegment.stance"
              value="supporting"
              @change="save"
              class="accent-green-500" />
            <span
              :class="[
                'text-green-400',
                localSegment.stance === 'supporting' ? 'font-bold' : 'font-normal',
              ]"
              >Supporting</span
            >
          </label>
          <label class="inline-flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              v-model="localSegment.stance"
              value="against"
              @change="save"
              class="accent-red-500" />
            <span
              :class="[
                'text-red-400',
                localSegment.stance === 'against' ? 'font-bold' : 'font-normal',
              ]"
              >Against</span
            >
          </label>
        </div>
      </div>
    </div>
    <div v-if="localSegment.type === 'text'" class="flex flex-col md:flex-row gap-2">
      <div class="flex-1">
        <label class="block text-xs text-zinc-400 mb-1">Content</label>
        <textarea
          v-model="localSegment.content"
          @change="save"
          rows="2"
          maxlength="500"
          class="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-100"></textarea>
      </div>
      <div class="flex-1">
        <label class="block text-xs text-zinc-400 mb-1">Duration (s)</label>
        <input
          v-model.number="localSegment.endAt"
          @change="save"
          type="number"
          min="1"
          max="600"
          class="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-100" />
      </div>
    </div>
    <div v-else class="flex flex-col md:flex-row gap-2">
      <div class="flex-1">
        <label class="block text-xs text-zinc-400 mb-1">YouTube Video ID</label>
        <input
          v-model="localSegment.videoId"
          @change="save"
          type="text"
          maxlength="20"
          class="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-100" />
      </div>
      <div class="flex-1">
        <label class="block text-xs text-zinc-400 mb-1">Start At (s)</label>
        <input
          v-model.number="localSegment.startAt"
          @change="save"
          type="number"
          min="0"
          max="36000"
          class="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-100" />
      </div>
      <div class="flex-1">
        <label class="block text-xs text-zinc-400 mb-1">End At (s)</label>
        <input
          v-model.number="localSegment.endAt"
          @change="save"
          type="number"
          min="1"
          max="36000"
          class="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-100" />
      </div>
    </div>
    <div v-if="localSegment.type === 'video'" class="mt-4">
      <label class="block text-xs text-zinc-400 mb-2">Video Comments</label>
      <VideoCommentItem
        v-for="(comment, cIdx) in localSegment.videoComments"
        :key="comment.id"
        :comment="comment"
        @save="save"
        @remove="removeVideoComment(cIdx)"
      />
      <button
        class="mt-2 px-3 py-1 rounded bg-blue-700 text-white hover:bg-blue-600 transition"
        @click="addVideoComment">
        Add Comment
      </button>
    </div>
  </li>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { EditorSegment } from '../stores/editorStore';
import VideoCommentItem from './VideoCommentItem.vue';

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
  { deep: true },
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
    delete localSegment.value.videoComments;
    localSegment.value.title = '';
  } else {
    localSegment.value.videoId = '';
    localSegment.value.startAt = 0;
    localSegment.value.endAt = 5;
    localSegment.value.videoComments = [];
    delete localSegment.value.content;
    localSegment.value.title = '';
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

function addVideoComment() {
  if (!localSegment.value.videoComments) localSegment.value.videoComments = [];
  localSegment.value.videoComments.push({
    id: Date.now() + Math.random(),
    stance: 'main',
    content: '',
    title: '',
    startAt: 0,
    endAt: 5,
  });
  save();
}

function removeVideoComment(idx: number) {
  if (!localSegment.value.videoComments) return;
  localSegment.value.videoComments.splice(idx, 1);
  save();
}
</script>

<style scoped lang="scss"></style>
