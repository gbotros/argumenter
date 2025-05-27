<template>
  <div class="w-full max-w-7xl mx-auto p-6 bg-zinc-900 text-zinc-100 rounded-2xl flex flex-col gap-6">
    <StanceTheme>
      <SegmentInfo :segment=" timeline?.getActiveSegment()" />

      <TextualSegmentView
        v-if="timeline?.getActiveSegment()?.type === 'text'"
        @segment-complete="onSegmentComplete"
      />
      <VideoSegmentView
        v-else-if="timeline?.getActiveSegment()?.type === 'video'"
        @segment-complete="onSegmentComplete"
      />

      <div class="flex flex-col items-center gap-2 w-full mt-4">
        <TimelineControls />
        <TimelineBarDots />
      </div>
    </StanceTheme>
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
import StanceTheme from './StanceTheme.vue';
import { Timeline } from './data';

const timelineStore = useTimelineStore();
const { timeline} = storeToRefs(timelineStore);

onMounted(() => {
    timeline.value = new Timeline(demoSegments);
});

function onSegmentComplete() {
  timeline.value?.activateNextSegment();
}
</script>
