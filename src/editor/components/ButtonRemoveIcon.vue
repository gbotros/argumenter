<template>
  <button
    class="text-red-400 hover:text-red-200"
    @click="onClick"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    title="remove">
    <svg
      class="h-5 w-5"
      fill="currentColor"
      width="64px"
      height="64px"
      viewBox="0 0 52 52"
      data-name="Layer 1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M50,8H38V2a2,2,0,0,0-2-2H16a2,2,0,0,0-2,2V8H2a2,2,0,0,0,0,4H9V50a2,2,0,0,0,2,2H41a2,2,0,0,0,2-2V12h7a2,2,0,0,0,0-4ZM18,4H34V8H18ZM39,48H13V12H39Z"></path>
        <path
          d="M26,14.45a2,2,0,0,0-2,2V44.89a2,2,0,0,0,4,0V16.45A2,2,0,0,0,26,14.45Z"></path>
        <path
          d="M33.56,14.45a2,2,0,0,0-2,2V44.89a2,2,0,1,0,4,0V16.45A2,2,0,0,0,33.56,14.45Z"></path>
        <path
          d="M18.44,14.45a2,2,0,0,0-2,2V44.89a2,2,0,0,0,4,0V16.45A2,2,0,0,0,18.44,14.45Z"></path>
      </g>
    </svg>
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits(['click', 'mouseenter', 'mouseleave']);

function onClick(event: MouseEvent) {
  emit('click', event);
}

function onMouseEnter(event: MouseEvent) {
  emit('mouseenter', event);
}

function onMouseLeave(event: MouseEvent) {
  emit('mouseleave', event);
}
</script>

<style scoped lang="scss"></style>
