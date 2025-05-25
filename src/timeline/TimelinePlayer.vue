<template>
  <div class="timeline-player">
    <div class="timeline-player__player-border" :class="`timeline-player__player-border--${activeSegment?.stance ?? ''}`">
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
      <div class="timeline-player__bar-dots">
        <button
          v-for="(segment, idx) in timeline.getSegments()"
          :key="segment.id"
          :class="[
            'timeline-player__bar-dot',
            idx === activeIndex ? 'timeline-player__bar-dot--active' : '',
            timeline.visitedSegments.includes(segment) ? 'timeline-player__bar-dot--visited' : 'timeline-player__bar-dot--unvisited',
            `timeline-player__bar-dot--${segment.stance}`
          ]"
          @click="activateSegment(idx)"
          @mouseenter="handleDotMouseEnter(segment)"
          @mouseleave="handleDotMouseLeave"
        ></button>
      </div>


        <SegmentInfo :segment="hoveredSegmentInfo || activeSegment" />


      <div class="timeline-player__bar-controls">
        <button class="timeline-player__bar-controls-button" @click="goBack" :disabled="activeIndex === 0">Back</button>
        <button class="timeline-player__bar-controls-button" @click="goNext" :disabled="activeIndex === timeline.getSegments().length - 1">Next</button>
      </div>
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
import type { Logger } from '../types/logger';

const timeline = ref(new Timeline([]));
const activeIndex = ref(0);
const hoveredDescription = ref('');
const hoveredSegment = ref<Segment | null>(null);
const logger = inject<Logger>('logger');

onMounted(() => {
  demoSegments.forEach(segment => timeline.value.addSegment(segment));
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
  max-width: 700px;
  margin: 2rem auto;
  box-shadow: 0 2px 16px $color-shadow;

  &__player-border {
    border: 3px solid $color-border;
    border-radius: 1rem;
    padding: 1.5rem;
    margin-bottom: 2rem;
    transition: border-color 0.3s;

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

    &-dots {
      display: flex;
      gap: 1.2rem;
      margin-bottom: 0.5rem;
      width: 100%;
      justify-content: space-around;
      position: relative;
      align-items: center;

      // Line connecting the dots (start at first dot, end at last dot)
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 2px;
        background: $color-border-light;
        border-radius: 2px;
        z-index: 0;
        transform: translateY(-50%);
        width: calc(100% - 1.4rem); // 1rem = dot diameter
        left: 0.7rem;
        right: 0.7rem;
        margin: 0;
      }
    }

    &-dot {
      position: relative;
      z-index: 1;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      border: none;
      background: $color-border-light;
      transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
      cursor: pointer;
      outline: none;

      // --- UNVISITED DOTS ---
      &--unvisited {
        &.timeline-player__bar-dot--main,
        &.timeline-player__bar-dot--supporting {
          background: lighten($color-supporting, 30%);
        }
        &.timeline-player__bar-dot--against {
          background: lighten($color-against, 30%);
        }
      }

      // --- VISITED DOTS ---
      &--visited {
        &.timeline-player__bar-dot--main,
        &.timeline-player__bar-dot--supporting {
          background: darken($color-supporting, 30%);
        }
        &.timeline-player__bar-dot--against {
          background: darken($color-against, 30%);
        }
      }

      // --- ACTIVE DOT ---
      &--active {
        background: $color-active;
        transform: scale(2);
        box-shadow: 0 0 0 6px $color-active-shadow;
        z-index: 2;
      }

      // --- DOT SHADOWS BY STANCE ---
      &--main {
        box-shadow: 0 0 0 2px $color-main-shadow;
      }
      &--supporting {
        box-shadow: 0 0 0 2px $color-supporting-shadow;
      }
      &--against {
        box-shadow: 0 0 0 2px $color-against-shadow;
      }
    }

    &-controls {
      display: flex;
      gap: 1.5rem;
      margin-top: 0.5rem;

      &-button {
        background: $color-bg-alt;
        color: $color-fg;
        border: 1px solid $color-border-light;
        border-radius: 0.4rem;
        padding: 0.4rem 1.2rem;
        font-size: 1rem;
        cursor: pointer;
        transition: background 0.2s, border-color 0.2s;

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }
    }
  }
}
</style>
