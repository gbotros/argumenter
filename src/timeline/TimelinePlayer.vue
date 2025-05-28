<template>
  <div class="w-full h-full">
    <div class="w-full h-full max-w-7xl mx-auto p-6 rounded-2xl flex flex-col">
      <div>
        <SegmentInfo />
        <TimelineBarDots />
      </div>

      <div class="w-full h-full">
        <TextualSegmentView
          v-if="timeline?.getActiveSegment()?.type === 'text'"
          @segment-complete="onSegmentComplete" />

        <VideoSegmentView
          v-else-if="timeline?.getActiveSegment()?.type === 'video'"
          @segment-complete="onSegmentComplete" />
      </div>

      <div>
        <TimelineControls />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useTimelineStore } from '@/timeline/stores/timelineStore';
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
  const demoDataAsAUrl = TimelineShareService.createShareUrl(demoSegments);
  logger.debug('[TimelinePlayer] Demo data as shareable URL:', demoDataAsAUrl);

  const sharedTimeline = TimelineShareService.getTimelineFromUrl();

  if (sharedTimeline) {
    logger.debug('[TimelinePlayer] Loaded shared timeline from URL:', sharedTimeline);
    timeline.value = sharedTimeline;
  } else {
    logger.debug(
      '[TimelinePlayer] No shared timeline found in URL. Falling back to demo segments.',
    );
    logger.debug('[TimelinePlayer] Initializing timeline with demo segments:', demoSegments);
    timeline.value = new Timeline(demoSegments);
  }
});

function onSegmentComplete() {
  timeline.value?.activateNextSegment();
}
</script>
