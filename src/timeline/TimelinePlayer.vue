<template>
  <div class="timeline-player">
    <div
      class="timeline-player__player-border"
      :class="`timeline-player__player-border--${activeSegment?.stance ?? ''}`"
    >
      <TextualSegmentView
        v-if="activeSegment && activeSegment.type === 'text'"
        :segment="activeSegment as TextualSegment"
        @segment-complete="onSegmentComplete"
      />
      <VideoSegmentView
        v-else-if="activeSegment && activeSegment.type === 'video'"
        :segment="activeSegment as VideoSegment"
        @segment-complete="onSegmentComplete"
      />
    </div>

    <div class="timeline-player__bar">
      <TimelineBarDots
        :segments="timeline.getSegments()"
        :activeIndex="activeIndex"
        :visitedSegments="timeline.visitedSegments"
        @activate-segment="activateSegment"
        @dot-mouse-enter="handleDotMouseEnter"
        @dot-mouse-leave="handleDotMouseLeave"
      />
      <TimelineControls
        :activeIndex="activeIndex"
        :segmentsCount="timeline.getSegments().length"
        @back="goBack"
        @next="goNext"
      />
      <SegmentInfo :segment="hoveredSegmentInfo || activeSegment" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, inject } from 'vue';
import { Timeline, Segment, TextualSegment, VideoSegment } from './timeLine.data';
import { demoSegments } from './data/demoTimelineData';
import TextualSegmentView from './TextualSegmentView.vue';
import VideoSegmentView from './VideoSegmentView.vue';
import SegmentInfo from './SegmentInfo.vue';
import TimelineBarDots from './TimelineBarDots.vue';
import TimelineControls from './TimelineControls.vue';
import type { Logger } from '../types/logger';

const timeline = ref(new Timeline([]));
const activeIndex = ref(0);
const hoveredDescription = ref('');
const hoveredSegment = ref<Segment | null>(null);
const logger = inject<Logger>('logger');

onMounted(() => {
  demoSegments.forEach((segment) => timeline.value.addSegment(segment));
  timeline.value.activateSegmentByIndex(0);
  activeIndex.value = 0;
  logger?.debug('[TimelinePlayer] Timeline initialized:', timeline.value.getSegments());
});

const activeSegment = computed(() => {
  const seg = timeline.value.activeSegment;
  if (!seg) return null;
  if (seg.type === 'text') {
    return seg as TextualSegment;
  } else if (seg.type === 'video') {
    return seg as VideoSegment;
  }
  return null;
});

const hoveredSegmentInfo = computed(() => {
  if (!hoveredSegment.value) return null;
  if (hoveredSegment.value.type === 'text') {
    return hoveredSegment.value as TextualSegment;
  } else if (hoveredSegment.value.type === 'video') {
    return hoveredSegment.value as VideoSegment;
  }
  return null;
});

function activateSegment(idx: number) {
  timeline.value.activateSegmentByIndex(idx);
  activeIndex.value = idx;
  logger?.info(`[TimelinePlayer] Activated segment at index ${idx}`);
}

function goNext() {
  if (activeIndex.value < timeline.value.getSegments().length - 1) {
    activateSegment(activeIndex.value + 1);
  }
}

function goBack() {
  if (activeIndex.value > 0) {
    activateSegment(activeIndex.value - 1);
  }
}

function onSegmentComplete() {
  goNext();
}

function handleDotMouseEnter(segment: Segment) {
  hoveredSegment.value = segment;
  hoveredDescription.value = segment.description;
  logger?.debug(`[TimelinePlayer] Hovered segment:`, segment);
}

function handleDotMouseLeave() {
  hoveredSegment.value = null;
  hoveredDescription.value = '';
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

  &__player-border {
    border: 3px solid $color-border;
    border-radius: 1rem;
    padding: 1.5rem;
    margin-bottom: 2rem;
    transition: border-color 0.3s;
    height: 100%;
    aspect-ratio: 16/9;

    &--main {
      border-color: $color-main;
    }
    &--supporting {
      border-color: $color-supporting;
    }
    &--against {
      border-color: $color-against;
    }
  }

  &__bar {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
