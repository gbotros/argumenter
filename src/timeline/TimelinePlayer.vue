<template>
  <div class="w-full max-w-7xl mx-auto p-6 bg-zinc-900 text-zinc-100 rounded-2xl flex flex-col gap-6">
    <StanceTheme>
      <SegmentInfo :segment="hoveredSegment || activeSegment" />

      <TextualSegmentView
        v-if="activeSegment && activeSegment.type === 'text'"
        @segment-complete="onSegmentComplete"
      />
      <VideoSegmentView
        v-else-if="activeSegment && activeSegment.type === 'video'"
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

const timelineStore = useTimelineStore();
const { segments, activeIndex, activeSegment, hoveredSegment } = storeToRefs(timelineStore);

onMounted(() => {
  if (!segments.value.length) {
    timelineStore.setSegments(demoSegments);
  }
});

function onSegmentComplete() {
  if (activeIndex.value < segments.value.length - 1) {
    timelineStore.setActiveIndex(activeIndex.value + 1);
  }
}
</script>
