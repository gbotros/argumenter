<template>
  <div class="flex flex-col md:flex-row gap-4 mb-2 p-3 rounded bg-zinc-800 border border-zinc-700">
    <div class="flex-1 flex flex-col gap-2">

      <div class="flex flex-col md:flex-row gap-2">
        <div
          class="flex-1"
          :id="`video-comment-title-row-${comment.id}`"
          :data-testid="`video-comment-title-row-${comment.id}`">
          <label class="block text-xs text-zinc-400 mb-1" :for="`title-${comment.id}`">Title</label>
          <input
            v-model="comment.title"
            type="text"
            maxlength="100"
            placeholder="Title"
            class="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-100"
            :id="`title-${comment.id}`"
            :data-testid="`title-${comment.id}`" />
        </div>
        <div class="flex-1">
          <label class="block text-xs text-zinc-400 mb-1" :for="`content-${comment.id}`"
            >Content</label
          >
          <input
            v-model="comment.content"
            type="text"
            maxlength="200"
            placeholder="Comment content"
            class="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-100" />
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-2 w-full md:w-48 justify-between">
        <div class="flex-1">
          <label class="block text-xs text-zinc-400 mb-1" :for="`startAt-${comment.id}`"
            >Start At (s)</label
          >
          <input
            v-model.number="comment.startAt"
            type="number"
            :min="minStart"
            :max="maxStart"
            placeholder="Start (s)"
            class="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-100" />
        </div>
        <div class="flex-1">
          <label class="block text-xs text-zinc-400 mb-1" :for="`endAt-${comment.id}`"
            >End At (s)</label
          >
          <input
            v-model.number="comment.endAt"
            type="number"
            :min="minEnd"
            :max="maxEnd"
            placeholder="End (s)"
            class="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-100" />
        </div>
      </div>
    </div>

    <div class="flex flex-col justify-end">
      <button class="text-red-400 hover:text-red-200 py-2 px-3" @click="remove">
        <svg class="h-5 w-5" fill="currentColor" width="64px" height="64px" viewBox="0 0 52 52" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M50,8H38V2a2,2,0,0,0-2-2H16a2,2,0,0,0-2,2V8H2a2,2,0,0,0,0,4H9V50a2,2,0,0,0,2,2H41a2,2,0,0,0,2-2V12h7a2,2,0,0,0,0-4ZM18,4H34V8H18ZM39,48H13V12H39Z"></path><path d="M26,14.45a2,2,0,0,0-2,2V44.89a2,2,0,0,0,4,0V16.45A2,2,0,0,0,26,14.45Z"></path><path d="M33.56,14.45a2,2,0,0,0-2,2V44.89a2,2,0,1,0,4,0V16.45A2,2,0,0,0,33.56,14.45Z"></path><path d="M18.44,14.45a2,2,0,0,0-2,2V44.89a2,2,0,0,0,4,0V16.45A2,2,0,0,0,18.44,14.45Z"></path></g></svg>
      </button>



    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs, computed } from 'vue';
import type { EditorVideoComment } from '../data/EditorVideoComment';
import { useEditorStore } from '../stores/editorStore';

const editorStore = useEditorStore();
const props = defineProps<{
  segmentId: string;
  comment: EditorVideoComment;
  minStartAt: number;
  maxEndAt: number;
}>();

const { comment } = toRefs(props);

// Computed limits for startAt and endAt
const minStart = computed(() => props.minStartAt);
const maxStart = computed(() => Math.min(props.maxEndAt, comment.value.endAt - 1));
const minEnd = computed(() => Math.max(props.minStartAt, comment.value.startAt + 1));
const maxEnd = computed(() => props.maxEndAt);

function remove() {
  editorStore.removeVideoComment(props.segmentId, props.comment.id);
}
</script>

<style scoped lang="scss"></style>
