<script setup lang="ts">
import AppHeader from './layout/AppHeader.vue';

// No imports needed unless used in template or logic
</script>

<template>
  <AppHeader />
  <main class="flex-1 flex flex-col items-stretch w-full">
    <router-view />
  </main>
</template>

<style scoped lang="scss"></style>
