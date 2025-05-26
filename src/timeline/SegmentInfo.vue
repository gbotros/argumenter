<template>
  <div class="timeline-player__bar-segment-info-card" v-if="activeSegment">
    <div class="segment-info__header">
      <span class="segment-info__emoji">
        {{ activeSegment.type === 'text' ? '📝' : '🎬' }}
      </span>
      <span class="segment-info__type-label">
        {{ activeSegment.type === 'text' ? 'Text Segment' : 'Video Segment' }}
      </span>
    </div>
    <div class="segment-info__description">🗒️ {{ activeSegment.description }}</div>
    <template v-if="activeSegment.type === 'text'">
      <div class="segment-info__duration">⏳ Duration: <span>{{ (activeSegment as TextualSegment).duration }}s</span></div>
      <div class="segment-info__content">💬 Content: <span>{{ (activeSegment as TextualSegment).content }}</span></div>
    </template>
    <template v-else-if="activeSegment.type === 'video'">
      <div class="segment-info__video-id">🔗 Video ID: <span>{{ (activeSegment as VideoSegment).videoId }}</span></div>
      <div class="segment-info__start">▶️ Start: <span>{{ (activeSegment as VideoSegment).startAt }}s</span></div>
      <div class="segment-info__end">⏹️ End: <span>{{ (activeSegment as VideoSegment).endAt }}s</span></div>
      <div class="segment-info__duration">⏳ Duration: <span>{{ (activeSegment as VideoSegment).endAt - (activeSegment as VideoSegment).startAt }}s</span></div>
      <div v-if="hasConcurrentTextSegments" class="segment-info__concurrent">
        <div v-for="(textSeg, idx) in (activeSegment as VideoSegment).concurrentTextSegments" :key="idx">
          <span>📝 Concurrent Text: <span>{{ textSeg.content }}</span></span>
          <span>⏱️ Time: <span>{{ textSeg.startAt }}s - {{ textSeg.endAt }}s</span></span>
          <span>🗒️ Desc: <span>{{ textSeg.description }}</span></span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useTimelineStore } from '@/stores/timeline/timelineStore';
import { storeToRefs } from 'pinia';
import { TextualSegment, VideoSegment } from './timeLine.data';

const timelineStore = useTimelineStore();
const { activeSegment } = storeToRefs(timelineStore);

const hasConcurrentTextSegments =
  activeSegment.value &&
  activeSegment.value.type === 'video' &&
  Array.isArray((activeSegment.value as VideoSegment).concurrentTextSegments) &&
  (activeSegment.value as VideoSegment).concurrentTextSegments.length > 0;

</script>

<style lang="scss" scoped>
.timeline-player__bar-segment-info-card {
  width: 80%;
  // padding: 0.5rem;
  margin: 2rem;
  background: $color-bg-alt;
  color: $color-fg;
  border: 1.5px solid $color-border-light;
  border-radius: 1rem;
  box-shadow: 0 4px 24px $color-shadow-light;
  padding: 1.2rem 1.5rem;
  font-size: 1.05rem;
  min-width: 180px;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
}

.segment-info__header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  margin-bottom: 0.2rem;
}

.segment-info__emoji {
  font-size: 1.6rem;
  margin-right: 0.2rem;
}

.segment-info__type-label {
  font-weight: bold;
  color: $color-supporting;
  font-size: 1.1rem;
}

.segment-info__description {
  font-weight: 500;
  margin-bottom: 0.2rem;
  color: $color-fg;
}

.segment-info__duration,
.segment-info__content,
.segment-info__video-id,
.segment-info__start,
.segment-info__end {
  font-weight: normal;
  span {
    font-weight: bold;
    color: $color-supporting;
  }
}

.segment-info__concurrent {
  margin-top: 0.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.98rem;
  color: $color-supporting;
  span {
    color: $color-supporting;
    font-weight: 500;
  }
}
</style>
