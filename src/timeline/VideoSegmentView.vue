<template>
  <div class="video-segment-view">
    <div
      class="video-segment-view__main-row"
      :class="{
        'video-segment-view__main-row--single': visibleConcurrentTextSegments.length === 0,
      }"
    >

        <div
          ref="youtubePlayer"
          class="video-segment-view__yt-frame"
          :class="{
            'video-segment-view__yt-frame--full': visibleConcurrentTextSegments.length === 0,
          }"
        ></div>

      <div
        v-if="visibleConcurrentTextSegments.length > 0"
        class="video-segment-view__concurrent-texts"
      >
        <ConcurrentTextualSegmentView
          v-for="textSeg in visibleConcurrentTextSegments"
          :key="textSeg.id"
          :segment="textSeg"
        />
      </div>
    </div>
    <button class="video-segment-view__complete-btn" @click="completeSegment">Skip</button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick, inject, computed } from 'vue';
import type { VideoSegment, ConcurrentTextualSegment } from './types';
import type { Logger } from '../types/logger';
import ConcurrentTextualSegmentView from './ConcurrentTextualSegmentView.vue';

const props = defineProps<{ segment: VideoSegment }>();
const emit = defineEmits(['segment-complete']);
const youtubePlayer = ref<HTMLElement | null>(null);
let player: YT.Player | null = null;
const logger = inject<Logger>('logger');
const currentTime = ref(0);

const visibleConcurrentTextSegments = computed(() => {
  return props.segment.concurrentTextSegments.filter(
    (ct: ConcurrentTextualSegment) =>
      currentTime.value >= ct.startAt && currentTime.value < ct.endAt,
  );
});

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

function updateCurrentTime() {
  if (player && typeof player.getCurrentTime === 'function') {
    currentTime.value = player.getCurrentTime();
  }
}

let interval: number | null = null;

async function setupPlayer() {
  logger?.debug(`[VideoSegmentView] Setting up player for segment ${props.segment.id}`);
  destroyPlayer();
  await nextTick();
  createPlayer();
  if (interval) clearInterval(interval);
  interval = window.setInterval(updateCurrentTime, 500);
}

onMounted(setupPlayer);

watch(() => props.segment, setupPlayer);

onUnmounted(() => {
  if (interval) clearInterval(interval);
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
  height: 100%;

  &__main-row {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
    height: 100%;

    &--single {
      // Only video, no concurrent text
      flex-direction: row;
      gap: 0;
    }
  }

  &__yt-frame {
    flex: 2 1 0;
    width: 0;
    min-width: 0;
    width: 100%;
    max-width: 100%;
    aspect-ratio: 16 / 9;
    max-height: 80vh;
    min-height: 0;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    background: #000;
    display: block;
    position: relative;
    overflow: hidden;

    &--full {
      flex: 1 1 0 !important;
      max-width: 100%;
    }

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

  &__concurrent-texts {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    flex: 1 1 0;
    margin-left: 1.5rem;
    margin-top: 0;

  }


  &__complete-btn {
    margin-top: 1rem;
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
