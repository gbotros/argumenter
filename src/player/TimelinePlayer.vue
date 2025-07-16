<template>
  <div id="timeline-player" class="flex-1 p-6 rounded-2xl flex flex-col items-stretch w-full">
    <div>
      <SegmentInfo />
      <TimelineBarDots />
    </div>

    <div class="flex-1 flex flex-col items-stretch w-full">
      <Transition
        enter-active-class="transition-all duration-500 ease-in-out"
        enter-from-class="opacity-0 translate-x-full"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition-all duration-500 ease-in-out"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 translate-x-full"
        mode="out-in">
        <TextualSegmentView
          v-if="timeline?.getActiveSegment()?.type === 'text'"
          @segment-complete="onSegmentComplete" />

        <VideoSegmentView
          v-else-if="timeline?.getActiveSegment()?.type === 'video'"
          @segment-complete="onSegmentComplete" />
      </Transition>
    </div>

    <div>
      <TimelineControls />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useTimelineStore } from '@/player/stores/timelineStore';
import { storeToRefs } from 'pinia';
import { demoSegments } from './data/demoTimelineData';
import TextualSegmentView from './TextualSegmentView.vue';
import VideoSegmentView from './VideoSegmentView.vue';
import SegmentInfo from './SegmentInfo.vue';
import TimelineBarDots from './TimelineBarDots.vue';
import TimelineControls from './TimelineControls.vue';
import { TimelineShareService } from './services/TimelineShareService';
import { Timeline } from './data';
import { logger } from '@/services/loggerService';

const timelineStore = useTimelineStore();
const { timeline } = storeToRefs(timelineStore);

onMounted(() => {
  // 1. Try to load from sharable URL
  const sharedTimeline = TimelineShareService.getTimelineFromUrl();
  if (sharedTimeline) {
    logger.debug('[TimelinePlayer] Loaded shared timeline from URL:', sharedTimeline);
    timeline.value = sharedTimeline;
    return;
  }

  // 2. If timeline already exists in store populated by the editor or loaded by the dashboard, use it
  if (
    timeline.value &&
    Array.isArray(timeline.value.segments) &&
    timeline.value.segments.length > 0
  ) {
    logger.debug('[TimelinePlayer] Loaded timeline from store:', timeline.value);
    return;
  }

  // 3. Fallback to demo sample
  logger.debug('[TimelinePlayer] No shared timeline or store timeline found. Loading demo.');
  timeline.value = new Timeline(demoSegments);
});

function onSegmentComplete() {
  logger.debug('[TimelinePlayer] Segment completed, activating next segment');
  timeline.value?.activateNextSegment();
}
</script>
