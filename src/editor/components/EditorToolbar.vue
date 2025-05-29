<template>
  <div class="flex gap-4 mb-8">
    <button @click="exportTimeline" class="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded transition">Export Timeline</button>
    <label class="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded transition cursor-pointer">
      Import Timeline
      <input type="file" accept="application/json" class="hidden" @change="importTimeline" />
    </label>
    <button @click="testTimeline" class="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded transition">Test Timeline</button>
    <button @click="clearSegments" class="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded transition">Clear</button>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from '../stores/editorStore';
import { storeToRefs } from 'pinia';

const editorStore = useEditorStore();
const { segments } = storeToRefs(editorStore);

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
  window.open(url, '_blank');
}

function clearSegments() {
  editorStore.clearSegments();
}
</script>

<style scoped lang="scss">
</style>
