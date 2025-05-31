<template>
  <div
    class="flex flex-col md:flex-row gap-4 mb-2 p-3 rounded bg-zinc-800 border border-zinc-700">
    <div
      class="flex-1 flex flex-col gap-2">
      <div>
        <label class="block text-xs text-zinc-400 mb-1" :for="`stance-${comment.id}`">Stance</label>
        <div
          class="flex gap-4">
          <label
            class="inline-flex items-center gap-1 cursor-pointer"
            :for="`stance-main-${comment.id}`">
            <input
              type="radio"
              v-model="comment.stance"
              value="main"
              @change="save"
              class="accent-blue-500" />
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
              @change="save"
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
            <input
              type="radio"
              v-model="comment.stance"
              value="against"
              @change="save"
              class="accent-red-500" />
            <span
              :class="['text-red-400', comment.stance === 'against' ? 'font-bold' : 'font-normal']"
              >Against</span
            >
          </label>
        </div>
      </div>

      <div>
        <label class="block text-xs text-zinc-400 mb-1" :for="`content-${comment.id}`"
          >Content</label
        >
        <input
          v-model="comment.content"
          @change="save"
          type="text"
          maxlength="200"
          placeholder="Comment content"
          class="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-100"/>
      </div>

      <div
        :id="`video-comment-description-row-${comment.id}`"
        :data-testid="`video-comment-description-row-${comment.id}`">
        <label class="block text-xs text-zinc-400 mb-1" :for="`description-${comment.id}`"
          >Description</label
        >
        <input
          v-model="comment.description"
          @change="save"
          type="text"
          maxlength="100"
          placeholder="Description"
          class="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-100"
          :id="`description-${comment.id}`"
          :data-testid="`description-${comment.id}`" />
      </div>

    <div
      class="flex flex-col gap-2 w-full md:w-48 justify-between">
      <div>
        <label class="block text-xs text-zinc-400 mb-1" :for="`startAt-${comment.id}`"
          >Start At (s)</label
        >
        <input
          v-model.number="comment.startAt"
          @change="save"
          type="number"
          min="0"
          max="36000"
          placeholder="Start (s)"
          class="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-100"/>
      </div>
      <div>
        <label class="block text-xs text-zinc-400 mb-1" :for="`endAt-${comment.id}`"
          >End At (s)</label
        >
        <input
          v-model.number="comment.endAt"
          @change="save"
          type="number"
          min="1"
          max="36000"
          placeholder="End (s)"
          class="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-100" />
      </div>
    </div>

    </div>


    <div>

      <button
        class="text-red-400 hover:text-red-200 transition mt-2 w-full"
        @click="remove">
        Remove
      </button>

    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import type { VideoCommentForm } from '../stores/editorStore';

const props = defineProps<{
  comment: VideoCommentForm;
}>();
const emit = defineEmits(['save', 'remove']);

const { comment } = toRefs(props);

function save() {
  emit('save');
}
function remove() {
  emit('remove');
}
</script>

<style scoped lang="scss"></style>
