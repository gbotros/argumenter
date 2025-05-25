<template>
  <div class="video-segment-view">
    <div ref="youtubePlayer" class="video-segment-view__yt-frame"></div>
    <button class="video-segment-view__complete-btn" @click="completeSegment">
      Complete Segment
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick, inject } from 'vue';
import type { VideoSegment } from './types';
import type { Logger } from '../types/logger';

const props = defineProps<{ segment: VideoSegment }>();
const emit = defineEmits(['segment-complete']);

const youtubePlayer = ref<HTMLElement | null>(null);
let player: YT.Player | null = null;

const logger = inject<Logger>('logger');

function createPlayer() {
  if (!youtubePlayer.value) return;
  const { videoId, startAt, endAt } = props.segment;
  const YT = window.YT;
  if (!YT) return;

  logger?.debug(`[VideoSegmentView] Creating player for segment ${props.segment.id}`);

  player = new YT.Player(youtubePlayer.value, {
    height: '100%',
    width: '100%',
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
        logger?.debug(`[VideoSegmentView] Player ready for segment ${props.segment.id}`);
      },
      onStateChange: (event) => {
        if (!YT) return;
        if (event.data === YT.PlayerState.ENDED) {
          logger?.info(`[VideoSegmentView] Video ended for segment ${props.segment.id}`);
        } else if (event.data === YT.PlayerState.PLAYING) {
          logger?.info(`[VideoSegmentView] Video started playing for segment ${props.segment.id}`);
        } else if (event.data === YT.PlayerState.PAUSED) {
          logger?.info(`[VideoSegmentView] Video paused for segment ${props.segment.id}`);
        }
        if (event.data === YT.PlayerState.ENDED) {
          completeSegment();
        }
      },
      onError: (event) => {
        logger?.error(`[VideoSegmentView] Error occurred for segment ${props.segment.id}`, event);
      },
      onPlaybackQualityChange: (event) => {
        logger?.info(
          `[VideoSegmentView] Playback quality changed for segment ${props.segment.id}`,
          event,
        );
      },
      onPlaybackRateChange: (event) => {
        logger?.info(
          `[VideoSegmentView] Playback rate changed for segment ${props.segment.id}`,
          event,
        );
      },
      onApiChange: (event) => {
        logger?.info(`[VideoSegmentView] API changed for segment ${props.segment.id}`, event);
      },
      onAutoplayBlocked: (event) => {
        logger?.warn(`[VideoSegmentView] Autoplay blocked for segment ${props.segment.id}`, event);
      },
    },
  });

  logger?.debug(`[VideoSegmentView] Created player for segment ${props.segment.id}`);
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
  logger?.info(`[VideoSegmentView] Segment ${props.segment.id} completed`);
}

async function setupPlayer() {
  logger?.debug(`[VideoSegmentView] Setting up player for segment ${props.segment.id}`);
  destroyPlayer();
  await nextTick();
  createPlayer();
}

onMounted(setupPlayer);

watch(() => props.segment, setupPlayer);

onUnmounted(() => {
  destroyPlayer();
});
</script>

<style lang="scss" scoped>
.video-segment-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: $color-bg-alt;
  border-radius: 0.7rem;
  padding: 1.2rem 1.5rem;
  box-shadow: 0 1px 8px $color-shadow-light;

  &__yt-frame {
    width: 100%;
    max-width: 640px;
    aspect-ratio: 16 / 9;
    height: auto !important;
    max-height: 80vh;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    background: #000;
    display: block;
    position: relative;
    overflow: hidden;

    // Ensure iframe fills the container and maintains aspect ratio
    & > iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100% !important;
      height: 100% !important;
      min-width: 0;
      min-height: 0;
      aspect-ratio: 16 / 9;
      display: block;
      border: none;
      background: #000;
      max-height: 80vh;
    }
  }

  @media (max-width: 900px) {
    &__yt-frame {
      max-width: 100vw;
      width: 100vw;
      border-radius: 0;
    }
    padding: 0.7rem 0.2rem;
  }

  @media (max-width: 600px) {
    &__yt-frame {
      max-width: 100vw;
      width: 100vw;
      min-width: 0;
      border-radius: 0;
    }
    padding: 0.3rem 0;
  }

  // Ensure parent container doesn't restrict width
  width: 100%;
  box-sizing: border-box;
  aspect-ratio: 16 / 9;
  min-height: 0;

  &__complete-btn {
    background: $color-bg;
    color: $color-fg;
    border: 1px solid $color-border-light;
    border-radius: 0.4rem;
    padding: 0.4rem 1.2rem;
    font-size: 1rem;
    cursor: pointer;
    transition:
      background 0.2s,
      border-color 0.2s;

    &:hover {
      background: $color-btn-hover;
      border-color: $color-btn-hover-border;
    }
  }
}
</style>
