<template>
  <div class="flex flex-col min-h-screen bg-zinc-900 text-zinc-100 p-8">
    <h1 class="text-3xl font-bold mb-6">Argument Timeline Editor</h1>
    <EditorToolbar />
    <EditorSegmentList />
  </div>
</template>

<script setup lang="ts">
import EditorToolbar from './components/EditorToolbar.vue';
import EditorSegmentList from './components/EditorSegmentList.vue';
</script>

<style scoped lang="scss">
</style>
