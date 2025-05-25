<template>
  <div class="video-segment-view">
    <div ref="youtubePlayer" class="yt-frame"></div>
    <button class="complete-btn" @click="completeSegment">Complete Segment</button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue';
import type { VideoSegment } from './types';

const props = defineProps<{ segment: VideoSegment }>();
const emit = defineEmits(['segment-complete']);

const youtubePlayer = ref<HTMLElement | null>(null);
let player: YT.Player | null = null;

function getYT(): typeof YT | undefined {
  return window.YT;
}

function loadYouTubeApi() {
  return new Promise<void>((resolve) => {
    const yt = getYT();
    if (yt && yt.Player) {
      resolve();
      return;
    }
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
    window.onYouTubeIframeAPIReady = () => {
      resolve();
    };
  });
}

function createPlayer() {
  if (!youtubePlayer.value) return;
  const { videoId, startAt, endAt } = props.segment;
  const yt = getYT();
  if (!yt) return;
  player = new yt.Player(youtubePlayer.value, {
    height: '270',
    width: '480',
    videoId,
    playerVars: {
      autoplay: 1,
      controls: 1,
      start: startAt,
      end: endAt,
      modestbranding: 1,
    },
    events: {
      onReady: (event) => {
        event.target.playVideo();
        if (import.meta.env.DEV) {
          console.log(`[VideoSegmentView] Player ready for segment ${props.segment.id}`);
        }
      },
      onStateChange: (event) => {
        const yt = getYT();
        if (!yt) return;
        if (import.meta.env.DEV) {
          if (event.data === yt.PlayerState.ENDED) {
            console.log(`[VideoSegmentView] Video ended for segment ${props.segment.id}`);
          } else if (event.data === yt.PlayerState.PLAYING) {
            console.log(`[VideoSegmentView] Video started playing for segment ${props.segment.id}`);
          } else if (event.data === yt.PlayerState.PAUSED) {
            console.log(`[VideoSegmentView] Video paused for segment ${props.segment.id}`);
          }
        }
        if (event.data === yt.PlayerState.ENDED) {
          completeSegment();
        }
      },
    },
  });
}

function destroyPlayer() {
  if (player && player.destroy) {
    player.destroy();
    player = null;
  }
}

function completeSegment() {
  destroyPlayer();
  emit('segment-complete');
  if (import.meta.env.DEV) {
    console.log(`[VideoSegmentView] Segment ${props.segment.id} completed`);
  }
}

async function setupPlayer() {
  destroyPlayer();
  await loadYouTubeApi();
  await nextTick();
  createPlayer();
}

onMounted(setupPlayer);

watch(() => props.segment, setupPlayer);

onUnmounted(() => {
  destroyPlayer();
});
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
