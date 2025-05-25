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
      <div class="timeline-player__bar-description" v-if="hoveredSegment">
        <pre>{{ hoveredInfo }}</pre>
      </div>
      <div class="timeline-player__bar-description timeline-player__bar-description--active-info" v-if="activeSegment && !hoveredSegment">
        <pre>{{ activeSegmentInfo }}</pre>
      </div>
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

const hoveredInfo = computed(() => {
  if (!hoveredSegment.value) return '';
  let info = hoveredSegment.value.description;
  if (hoveredSegment.value.type === 'text') {
    const seg = hoveredSegment.value as TextualSegment;
    info += `\nType: Text`;
    info += `\nDuration: ${seg.duration}s`;
    info += `\nContent: ${seg.content}`;
  } else if (hoveredSegment.value.type === 'video') {
    const seg = hoveredSegment.value as VideoSegment;
    const duration = seg.endAt - seg.startAt;
    info += `\nType: Video`;
    info += `\nVideo ID: ${seg.videoId}`;
    info += `\nStart: ${seg.startAt}s`;
    info += `\nEnd: ${seg.endAt}s`;
    info += `\nDuration: ${duration}s`;
  }
  return info;
});

const activeSegmentInfo = computed(() => {
  if (!activeSegment.value) return '';
  let info = activeSegment.value.description;
  if (activeSegment.value.type === 'text') {
    const seg = activeSegment.value as TextualSegment;
    info += `\nType: Text`;
    info += `\nDuration: ${seg.duration}s`;
    info += `\nContent: ${seg.content}`;
  } else if (activeSegment.value.type === 'video') {
    const seg = activeSegment.value as VideoSegment;
    const duration = seg.endAt - seg.startAt;
    info += `\nType: Video`;
    info += `\nVideo ID: ${seg.videoId}`;
    info += `\nStart: ${seg.startAt}s`;
    info += `\nEnd: ${seg.endAt}s`;
    info += `\nDuration: ${duration}s`;
  }
  return info;
});
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
    }

    &-dot {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      border: none;
      background: $color-border-light;
      transition: background 0.2s, transform 0.2s;
      cursor: pointer;
      outline: none;

      &--visited {
        background: $color-supporting;
      }
      &--unvisited {
        background: $color-border-light;
      }
      &--active {
        background: $color-active;
        transform: scale(1.5);
        box-shadow: 0 0 0 3px $color-active-shadow;
      }
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

    &-description {
      background: $color-bg-alt;
      color: $color-fg;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      margin-bottom: 0.5rem;
      font-size: 0.95rem;
      min-width: 180px;
      text-align: center;

      &--active-info {
        margin-top: 0.5rem;
        background: $color-bg-alt;
        color: $color-fg;
        border: 1px solid $color-border-light;
        font-weight: bold;
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
