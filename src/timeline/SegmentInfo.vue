<template>
  <div class="timeline-player__bar-segment-info-card" v-if="props.segment">
    <div class="segment-info__header">
      <span class="segment-info__emoji">
        {{ props.segment.type === 'text' ? '📝' : '🎬' }}
      </span>
      <span class="segment-info__type-label">
        {{ props.segment.type === 'text' ? 'Text Segment' : 'Video Segment' }}
      </span>
    </div>
    <div class="segment-info__description">🗒️ {{ props.segment.description }}</div>
    <template v-if="props.segment.type === 'text'">
      <div class="segment-info__duration">⏳ Duration: <span>{{ (props.segment as TextualSegment).duration }}s</span></div>
      <div class="segment-info__content">💬 Content: <span>{{ (props.segment as TextualSegment).content }}</span></div>
    </template>
    <template v-else-if="props.segment.type === 'video'">
      <div class="segment-info__video-id">🔗 Video ID: <span>{{ (props.segment as VideoSegment).videoId }}</span></div>
      <div class="segment-info__start">▶️ Start: <span>{{ (props.segment as VideoSegment).startAt }}s</span></div>
      <div class="segment-info__end">⏹️ End: <span>{{ (props.segment as VideoSegment).endAt }}s</span></div>
      <div class="segment-info__duration">⏳ Duration: <span>{{ (props.segment as VideoSegment).endAt - (props.segment as VideoSegment).startAt }}s</span></div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { TextualSegment, VideoSegment } from './timeLine.data';

const props = defineProps<{
  segment: TextualSegment | VideoSegment | null;
}>();
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
</style>
