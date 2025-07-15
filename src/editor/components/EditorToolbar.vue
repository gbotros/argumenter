<template>
  <div class="flex flex-row justify-between mb-8 gap-6">
    <!-- Section: Play & Clear -->
    <div>
      <div class="flex gap-4">
        <button
          @click="playTimeline"
          class="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded transition text-left"
          title="Play the argument timeline">
          ▶️ Play
        </button>

        <button
          @click="reloadDemoData"
          class="bg-indigo-700 hover:bg-indigo-600 text-white px-4 py-2 rounded transition text-left"
          title="Reload demo timeline data">
          🔄 Reload Demo Timeline
        </button>

        <button
          @click="clearSegments"
          class="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded transition text-left"
          title="Remove all segments from the timeline">
          🗑️ Clear All
        </button>
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <!-- Section: Import/Export/Shareable Link -->
      <button
        @click="testTimeline"
        class="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded transition text-left"
        title="Preview the timeline in a new tab">
        🔗 Copy and Test Sharable Link
      </button>

      <button
        @click="exportTimeline"
        class="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded transition text-left">
        📤 Export Timeline as a JSON file
      </button>
      <label
        class="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded transition cursor-pointer text-left">
        📥 Import Timeline from a JSON file
        <input type="file" accept="application/json" class="hidden" @change="importTimeline" />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from '../stores/editorStore';
import { useTimelineStore } from '@/player/stores/timelineStore';
import { TimelineFactory } from '@/player/services/TimelineFactory';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const editorStore = useEditorStore();
const timelineStore = useTimelineStore();
const { segments } = storeToRefs(editorStore);
const { timeline } = storeToRefs(timelineStore);
const router = useRouter();

function exportTimeline() {
  const dataStr = JSON.stringify(segments.value, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'timeline.json';
  a.click();
  URL.revokeObjectURL(url);
}

function importTimeline(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target?.result as string);
      if (Array.isArray(imported)) {
        editorStore.setSegments(imported);
      }
    } catch {
      alert('Invalid timeline file.');
    }
  };
  reader.readAsText(file);
}

function testTimeline() {
  const json = JSON.stringify(segments.value);
  const encoded = btoa(encodeURIComponent(json));
  const url = `${window.location.origin}/?timeline=${encoded}`;
  navigator.clipboard.writeText(url).then(() => {
    //  alert('Sharable link copied to clipboard!');
  });
  window.open(url, '_blank');
}

function clearSegments() {
  editorStore.clearSegments();
}

function playTimeline() {
  // If no segments, load demo data first
  if (!segments.value || segments.value.length === 0) {
    reloadDemoData();
  }

  try {
    timeline.value = TimelineFactory.fromEditorSegments(segments.value);
  } catch (err) {
    console.error('Failed to create timeline from editor segments:', segments.value, err);
    timeline.value = null;
  }
  router.push('/');
}

function reloadDemoData() {
  import('@/player/data/demoTimelineData').then((module) => {
    segments.value = module.demoSegments;
  });
}
</script>

<style scoped lang="scss"></style>
