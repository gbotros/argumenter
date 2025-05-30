<template>
  <div v-if="timeline?.getActiveSegment()">
    <div
      class="flex items-center gap-3 text-lg bg-zinc-700 border-b border-zinc-700 rounded-t px-2 py-2">
      <span class="text-lg">
        {{ timeline?.getActiveSegment()?.type === 'text' ? '📝' : '🎬' }}
      </span>
      <span class="font-bold text-lg">
        {{ timeline?.getActiveSegment()?.description }}
      </span>
      <span class="ml-auto font-semibold flex items-center text-base">
        ⏳
        {{ Number(timeline?.getActiveSegment()?.getCurrentlyAtTime()).toFixed(0) }}s -
        {{ Number(timeline?.getActiveSegment()?.endAt).toFixed(0) }}s
      </span>
      <button
        v-if="route.path === '/'"
        @click="goToEditorWithPlayerSegments"
        class="ml-4 px-3 py-1 rounded bg-blue-700 text-white hover:bg-blue-600 transition text-sm font-semibold">
        Edit
      </button>
    </div>
    <StanceTheme></StanceTheme>
  </div>
</template>

<script setup lang="ts">
import { useTimelineStore } from '@/timeline/stores/timelineStore';
import { useEditorStore } from '@/editor/stores/editorStore';
import { storeToRefs } from 'pinia';
import { useRouter, useRoute } from 'vue-router';
import StanceTheme from './StanceTheme.vue';

const timelineStore = useTimelineStore();
const editorStore = useEditorStore();
const { timeline } = storeToRefs(timelineStore);
const router = useRouter();
const route = useRoute();

function goToEditorWithPlayerSegments() {
  if (timeline.value && Array.isArray(timeline.value.segments)) {
    const plainSegments = timeline.value.segments.map((seg) => JSON.parse(JSON.stringify(seg)));
    editorStore.setSegments(plainSegments);
    localStorage.setItem('argumenter_editor_segments', JSON.stringify(plainSegments));
  }
  router.push('/editor');
}
</script>
