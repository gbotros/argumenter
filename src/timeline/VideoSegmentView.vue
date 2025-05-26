<template>
  <div class="video-segment-view" v-if="activeVideoSegment">


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
    <!-- <button class="video-segment-view__complete-btn" @click="completeSegment">Skip</button> -->
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick, inject, computed, defineEmits } from 'vue';
import { useTimelineStore } from '@/timeline/stores/timelineStore';
import { storeToRefs } from 'pinia';
import type { VideoSegment, ConcurrentTextualSegment } from './types/index';
import type { Logger } from '../types/logger';
import ConcurrentTextualSegmentView from './ConcurrentTextualSegmentView.vue';

const timelineStore = useTimelineStore();
const { activeSegment, currentTime } = storeToRefs(timelineStore);
const logger = inject<Logger>('logger');
const youtubePlayer = ref<HTMLElement | null>(null);
let player: YT.Player | null = null;
const emit = defineEmits(['segment-complete']);

const activeVideoSegment = computed(() => {
  return activeSegment.value && activeSegment.value.type === 'video'
    ? (activeSegment.value as VideoSegment)
    : null;
});

const visibleConcurrentTextSegments = computed(() => {
  if (!activeVideoSegment.value) return [];
  return activeVideoSegment.value.concurrentTextSegments.filter(
    (ct: ConcurrentTextualSegment) =>
      currentTime.value >= ct.startAt && currentTime.value < ct.endAt,
  );
});

function completeSegment() {
  emit('segment-complete');
  logger?.info(`[VideoSegmentView] Segment ${activeVideoSegment.value?.id} completed`);
}

function createPlayer() {
  if (!youtubePlayer.value) return;
  if (!activeVideoSegment.value) return;
  const { videoId, startAt, endAt, id } = activeVideoSegment.value;
  const YT = window.YT;
  if (!YT) return;

  logger?.debug(`[VideoSegmentView] Creating player for segment ${id}`);

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
      onReady: (event ) => {
        event.target.playVideo();
        logger?.debug(`[VideoSegmentView] Player ready for segment ${id}`);
      },
      onStateChange: (event: YT.OnStateChangeEvent) => {
        if (!YT) return;
debugger;
        logger?.info(`[VideoSegmentView] Player state changed for segment ${id}`, event);

        if (event.data === YT.PlayerState.ENDED) {
          completeSegment();
        }
      },
      onError: (event) => {
        logger?.error(`[VideoSegmentView] Error occurred for segment ${id}`, event);
      },
      onPlaybackQualityChange: (event) => {
        logger?.info(
          `[VideoSegmentView] Playback quality changed for segment ${id}`,
          event,
        );
      },
      onPlaybackRateChange: (event) => {
        logger?.info(
          `[VideoSegmentView] Playback rate changed for segment ${id}`,
          event,
        );
      },
      onApiChange: (event) => {
        logger?.info(`[VideoSegmentView] API changed for segment ${id}`, event);
      },
      onAutoplayBlocked: (event) => {
        logger?.warn(`[VideoSegmentView] Autoplay blocked for segment ${id}`, event);
      },
    },
  });

  logger?.debug(`[VideoSegmentView] Created player for segment ${id}`);
}

function destroyPlayer() {
  if (player && player.destroy) {
    player.destroy();
    player = null;
  }
}

function updateCurrentTime() {
  if (player && typeof player.getCurrentTime === 'function') {
    currentTime.value = player.getCurrentTime();
  }
}

let interval: number | null = null;

async function setupPlayer() {
  if (!activeVideoSegment.value) return;
  logger?.debug(`[VideoSegmentView] Setting up player for segment ${activeVideoSegment.value.id}`);
  destroyPlayer();
  await nextTick();
  createPlayer();
  if (interval) clearInterval(interval);
  interval = window.setInterval(updateCurrentTime, 500);
}

onMounted(setupPlayer);

watch(activeVideoSegment, setupPlayer);

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

  &__timer {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: $color-fg;
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
