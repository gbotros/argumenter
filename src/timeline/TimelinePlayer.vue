<template>
  <div class="timeline-player">
    <StanceTheme>
      <TextualSegmentView
        v-if="activeSegment && activeSegment.type === 'text'"
        @segment-complete="onSegmentComplete"
      />
      <VideoSegmentView
        v-else-if="activeSegment && activeSegment.type === 'video'"
        @segment-complete="onSegmentComplete"
      />
    </StanceTheme>

    <div class="timeline-player__bar">
      <TimelineBarDots />
      <TimelineControls />
      <SegmentInfo :segment="hoveredSegment || activeSegment" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useTimelineStore } from '@/stores/timeline/timelineStore';
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

<style lang="scss" scoped>
.timeline-player {
  background: $color-bg;
  color: $color-fg;
  padding: 2rem;
  border-radius: 1rem;
  margin: 2rem auto;
  box-shadow: 0 2px 16px $color-shadow;

  &__bar {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
