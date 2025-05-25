<template>
  <div class="video-segment-view">
    <iframe
      class="yt-frame"
      :src="youtubeUrl"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen
      @load="onFrameLoad"
    ></iframe>
    <button class="complete-btn" @click="completeSegment">Complete Segment</button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import type { VideoSegment } from './types';

const props = defineProps<{ segment: VideoSegment }>();
const emit = defineEmits(['segment-complete']);

const youtubeUrl = ref('');

function buildYoutubeUrl() {
  const { videoId, startAt, endAt } = props.segment;
  youtubeUrl.value = `https://www.youtube.com/embed/${videoId}?start=${startAt}&end=${endAt}&autoplay=1&controls=1&modestbranding=1`;
  if (import.meta.env.DEV) {
    console.log(`[VideoSegmentView] Built YouTube URL: ${youtubeUrl.value}`);
  }
}

function completeSegment() {
  emit('segment-complete');
  if (import.meta.env.DEV) {
    console.log(`[VideoSegmentView] Segment ${props.segment.id} completed`);
  }
}

function onFrameLoad() {
  if (import.meta.env.DEV) {
    console.log(`[VideoSegmentView] YouTube iframe loaded for segment ${props.segment.id}`);
  }
}

onMounted(buildYoutubeUrl);

watch(() => props.segment, buildYoutubeUrl);
</script>

<style lang="scss">
.video-segment-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: $color-bg-alt;
  border-radius: 0.7rem;
  padding: 1.2rem 1.5rem;
  box-shadow: 0 1px 8px $color-shadow-light;
}
.yt-frame {
  width: 480px;
  height: 270px;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  background: #000;
}
.complete-btn {
  background: $color-bg;
  color: $color-fg;
  border: 1px solid $color-border-light;
  border-radius: 0.4rem;
  padding: 0.4rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
}
.complete-btn:hover {
  background: $color-btn-hover;
  border-color: $color-btn-hover-border;
}
</style>
