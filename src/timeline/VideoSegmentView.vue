<template>
  <div
    v-if="timeline?.getActiveVideoSegment()"
    class="flex flex-col items-center bg-zinc-800 rounded-xl p-6 h-full w-full max-w-7xl mx-auto"
  >
    <div
      class="flex flex-row items-start w-full h-full gap-6"
      :class="{ 'gap-0': timeline?.getActiveConcurrentTextSegment() }"
    >
      <div
        ref="youtubePlayer"
        class="flex-1 aspect-video rounded-lg bg-black relative overflow-hidden mb-4"
        :class="{ 'flex-[2_1_0]': timeline?.getActiveConcurrentTextSegment() }"
      ></div>
      <div class="flex flex-col gap-4 flex-1 ml-6 mt-0">

        <ConcurrentTextualSegmentView
          v-if="timeline?.getActiveConcurrentTextSegment()"
        />

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick, inject } from 'vue';
import { useTimelineStore } from '@/timeline/stores/timelineStore';
import { storeToRefs } from 'pinia';
import type { Logger } from '../types/logger';
import ConcurrentTextualSegmentView from './ConcurrentTextualSegmentView.vue';

const timelineStore = useTimelineStore();
const { isPaused, timeline } = storeToRefs(timelineStore);
const logger = inject<Logger>('logger');
const youtubePlayer = ref<HTMLElement | null>(null);
let player: YT.Player | null = null;
const emit = defineEmits(['segment-complete']);

function completeSegment() {
  emit('segment-complete');
  logger?.info(`[VideoSegmentView] Segment ${activeVideoSegment.value?.id} completed`);
}

function createPlayer() {
  if (!youtubePlayer.value) return;
  const activeVideoSegment = timeline.value?.getActiveVideoSegment();
  if (!activeVideoSegment) return;
  const { videoId, startAt, endAt, id } = activeVideoSegment;
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
      onReady: (event) => {
        event.target.playVideo();
        logger?.debug(`[VideoSegmentView] Player ready for segment ${id}`);
      },
      onStateChange: (event: YT.OnStateChangeEvent) => {
        if (!YT) return;
        debugger;

        if (event.data === YT.PlayerState.PLAYING) {
          logger?.info(`[VideoSegmentView] Video started for segment ${id}`);
          timelineStore.resume();
        } else if (event.data === YT.PlayerState.PAUSED) {
          logger?.info(`[VideoSegmentView] Video paused for segment ${id}`);
          timelineStore.pause();
        } else if (event.data === YT.PlayerState.BUFFERING) {
          logger?.info(`[VideoSegmentView] Video buffering for segment ${id}`);
        } else if (event.data === YT.PlayerState.CUED) {
          logger?.info(`[VideoSegmentView] Video cued for segment ${id}`);
        } else if (event.data === YT.PlayerState.ENDED) {
          logger?.info(`[VideoSegmentView] Video ended for segment ${id}`);
          completeSegment();
        } else {
          logger?.info(`[VideoSegmentView] Player state changed for segment ${id}`, event);
        }
      },
      onError: (event) => {
        logger?.error(`[VideoSegmentView] Error occurred for segment ${id}`, event);
      },
      onPlaybackQualityChange: (event) => {
        logger?.info(`[VideoSegmentView] Playback quality changed for segment ${id}`, event);
      },
      onPlaybackRateChange: (event) => {
        logger?.info(`[VideoSegmentView] Playback rate changed for segment ${id}`, event);
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
  if (!player) return;
  if (typeof player.getCurrentTime !== 'function') return;
    const activeVideoSegment = timeline.value?.getActiveVideoSegment();
  if (!activeVideoSegment) return;

  const currentTime = player.getCurrentTime();
  activeVideoSegment.setCurrentlyAtTime(currentTime);

  // sync timeline store with player state
  syncPlayerStateWithStoreIfNeeded();
}

let interval: number | null = null;

async function setupPlayer() {
  const activeVideoSegment = timeline.value?.getActiveVideoSegment();
  if (!activeVideoSegment) return;

  logger?.debug(`[VideoSegmentView] Setting up player for segment ${activeVideoSegment.id}`);

  destroyPlayer();
  await nextTick();
  createPlayer();
  if (interval) clearInterval(interval);
  interval = window.setInterval(updateCurrentTime, 500);
}

onMounted(setupPlayer);

watch(
  () => isPaused.value,
  (paused) => {
    if (!timeline.value?.getActiveVideoSegment()) return;
    if (paused) {
      pauseVideo();
    } else {
      playVideo();
    }
  },
);

onUnmounted(() => {
  if (interval) clearInterval(interval);
  destroyPlayer();
});

function playVideo() {
  if (player && typeof player.playVideo === 'function') {
    player.playVideo();
  }
}

function pauseVideo() {
  if (player && typeof player.pauseVideo === 'function') {
    player.pauseVideo();
  }
}

function syncPlayerStateWithStoreIfNeeded() {
  const pausedAtStore = isPaused.value;
  const playingAtStore = !isPaused.value;

  const pausedAtPlayer =
    player &&
    (player.getPlayerState() === YT.PlayerState.PAUSED ||
      player.getPlayerState() === YT.PlayerState.UNSTARTED);
  const playingAtPlayer = player && player.getPlayerState() === YT.PlayerState.PLAYING;

  if (pausedAtStore && !pausedAtPlayer) {
    logger?.debug(`[VideoSegmentView] Syncing player state: pausing video`);
    pauseVideo();
  } else if (playingAtStore && !playingAtPlayer) {
    logger?.debug(`[VideoSegmentView] Syncing player state: playing video`);
    playVideo();
  }
}


</script>
