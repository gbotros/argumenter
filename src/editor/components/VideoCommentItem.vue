<template>
  <div class="flex flex-col md:flex-row gap-4 mb-2 p-3 rounded bg-zinc-800 border border-zinc-700">
    <div class="flex-1 flex flex-col gap-2">
      <div>
        <label class="block text-xs text-zinc-400 mb-1" :for="`stance-${comment.id}`">Stance</label>
        <div class="flex gap-4">
          <label
            class="inline-flex items-center gap-1 cursor-pointer"
            :for="`stance-main-${comment.id}`">
            <input type="radio" v-model="comment.stance" value="main" class="accent-blue-500" />
            <span
              :class="['text-blue-400', comment.stance === 'main' ? 'font-bold' : 'font-normal']"
              >Main</span
            >
          </label>
          <label
            class="inline-flex items-center gap-1 cursor-pointer"
            :for="`stance-supporting-${comment.id}`">
            <input
              type="radio"
              v-model="comment.stance"
              value="supporting"
              class="accent-green-500" />
            <span
              :class="[
                'text-green-400',
                comment.stance === 'supporting' ? 'font-bold' : 'font-normal',
              ]"
              >Supporting</span
            >
          </label>
          <label
            class="inline-flex items-center gap-1 cursor-pointer"
            :for="`stance-against-${comment.id}`">
            <input type="radio" v-model="comment.stance" value="against" class="accent-red-500" />
            <span
              :class="['text-red-400', comment.stance === 'against' ? 'font-bold' : 'font-normal']"
              >Against</span
            >
          </label>
        </div>
      </div>

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

    <div>
      <button class="text-red-400 hover:text-red-200 transition mt-2 w-full" @click="remove">
        Remove
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
