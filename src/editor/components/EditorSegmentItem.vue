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
    @drop="onDrop">
    <div class="flex items-center gap-4">
      <span class="font-bold text-blue-300 cursor-move">☰</span>
      <span class="font-bold text-blue-300">{{
        localSegment.type === 'text' ? '📝 Text' : '🎬 Video'
      }}</span>
      <div class="flex gap-4 items-center" id="segment-type-radio-group">
        <label class="inline-flex items-center gap-1 cursor-pointer">
          <input
            type="radio"
            v-model="localSegment.type"
            value="text"
            @change="onTypeChange"
            class="accent-blue-500" />
          <span
            :class="['text-blue-400', localSegment.type === 'text' ? 'font-bold' : 'font-normal']"
            >Text</span
          >
        </label>
        <label class="inline-flex items-center gap-1 cursor-pointer">
          <input
            type="radio"
            v-model="localSegment.type"
            value="video"
            @change="onTypeChange"
            class="accent-green-500" />
          <span
            :class="['text-green-400', localSegment.type === 'video' ? 'font-bold' : 'font-normal']"
            >Video</span
          >
        </label>
      </div>

      <button class="text-red-400 hover:text-red-200 transition ml-auto flex items-center justify-center" @click="deleteSegment" title="Delete">
         <svg  class="h-5 w-5" fill="currentColor" width="64px" height="64px" viewBox="0 0 52 52" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M50,8H38V2a2,2,0,0,0-2-2H16a2,2,0,0,0-2,2V8H2a2,2,0,0,0,0,4H9V50a2,2,0,0,0,2,2H41a2,2,0,0,0,2-2V12h7a2,2,0,0,0,0-4ZM18,4H34V8H18ZM39,48H13V12H39Z"></path><path d="M26,14.45a2,2,0,0,0-2,2V44.89a2,2,0,0,0,4,0V16.45A2,2,0,0,0,26,14.45Z"></path><path d="M33.56,14.45a2,2,0,0,0-2,2V44.89a2,2,0,1,0,4,0V16.45A2,2,0,0,0,33.56,14.45Z"></path><path d="M18.44,14.45a2,2,0,0,0-2,2V44.89a2,2,0,0,0,4,0V16.45A2,2,0,0,0,18.44,14.45Z"></path></g></svg>
      </button>

    </div>
    <div class="flex flex-col md:flex-row gap-2">
      <div class="flex-1">
        <label class="block text-xs text-zinc-400 mb-1">Title</label>
        <input
          v-model="localSegment.title"
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
          rows="2"
          maxlength="500"
          class="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-100"></textarea>
      </div>
      <div class="flex-1">
        <label class="block text-xs text-zinc-400 mb-1">Duration (s)</label>
        <input
          v-model.number="localSegment.endAt"
          type="number"
          min="1"
          max="600"
          class="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-100" />
      </div>
    </div>
    <div v-if="localSegment.type === 'text'" class="flex flex-col gap-2 mt-2">
      <label class="block text-xs text-zinc-400 mb-1">Sources (URLs)</label>
      <div
        v-for="(source, sIdx) in localSegment.sources"
        :key="sIdx"
        class="flex gap-2 items-center">
        <input
          v-model="localSegment.sources![sIdx]"
          type="url"
          placeholder="https://example.com/source"
          class="flex-1 bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-100" />
        <button class="text-red-400 hover:text-red-200 transition" @click="removeSource(sIdx)">
          Remove
        </button>
      </div>
      <button
        class="mt-1 px-2 py-1 rounded bg-blue-700 text-white hover:bg-blue-600 transition w-fit"
        @click="addSource">
        Add Source
      </button>
    </div>
    <div v-else class="flex flex-col md:flex-row gap-2">
      <div class="flex-1">
        <label class="block text-xs text-zinc-400 mb-1">YouTube Video ID</label>
        <input
          v-model="localSegment.videoId"
          type="text"
          maxlength="20"
          class="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-100" />
      </div>
      <div class="flex-1">
        <label class="block text-xs text-zinc-400 mb-1">Start At (s)</label>
        <input
          v-model.number="localSegment.startAt"
          type="number"
          min="0"
          max="36000"
          class="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-100" />
      </div>
      <div class="flex-1">
        <label class="block text-xs text-zinc-400 mb-1">End At (s)</label>
        <input
          v-model.number="localSegment.endAt"
          type="number"
          min="1"
          max="36000"
          class="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-100" />
      </div>
    </div>
    <div v-if="localSegment.type === 'video'" class="mt-4">
      <label class="block text-xs text-zinc-400 mb-2">Video Comments</label>
      <VideoCommentItem
        v-for="comment in localSegment.videoComments"
        :key="comment.id"
        :comment="comment"
        :segmentId="localSegment.id"
        :minStartAt="localSegment.startAt ?? 0"
        :maxEndAt="localSegment.endAt ?? 99" />
      <button
        class="mt-2 px-3 py-1 rounded bg-blue-700 text-white hover:bg-blue-600 transition"
        @click="addVideoComment">
        Add Comment
      </button>
    </div>
  </li>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useEditorStore } from '../stores/editorStore';
import type { EditorSegment } from '../data/EditorSegment';
import VideoCommentItem from './VideoCommentItem.vue';

const props = defineProps<{
  segment: EditorSegment;
}>();
const emit = defineEmits(['dragstart', 'drop']);

const localSegment = ref(props.segment);
const dragOver = ref(false);
const editorStore = useEditorStore();

function deleteSegment() {
  editorStore.deleteSegment(props.segment.id);
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
}

function onDragStart(e: DragEvent) {
  emit('dragstart', localSegment.value.id, e);
}

function onDragOverHandler() {
  dragOver.value = true;
}

function onDragLeave() {
  dragOver.value = false;
}

function onDrop(e: DragEvent) {
  emit('drop', localSegment.value.id, e);
}

function addVideoComment() {
  editorStore.addVideoComment(localSegment.value.id);
}

function addSource() {
  editorStore.addSource(localSegment.value.id);
}

function removeSource(sourceIdx: number) {
  editorStore.removeSource(localSegment.value.id, sourceIdx);
}
</script>

<style scoped lang="scss"></style>
