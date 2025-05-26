<template>
  <div class="timeline-player__bar-segment-info-card" v-if="activeSegment">
    <div class="segment-info__header segment-info__header--inline">
      <span class="segment-info__emoji">
        {{ activeSegment.type === 'text' ? '📝' : '🎬' }}
      </span>
      <span class="segment-info__type-label">
        {{ activeSegment.type === 'text' ? 'Text Segment' : 'Video Segment' }}
      </span>
      <span class="segment-info__description">🗒️ {{ activeSegment.description }}</span>
      <span v-if="activeSegment.type === 'video'" class="segment-info__timer">
        ⏳ {{ Math.max(0, Math.ceil((activeSegment as any).endAt - currentTime)) }}s
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTimelineStore } from '@/timeline/stores/timelineStore';
import { storeToRefs } from 'pinia';

const timelineStore = useTimelineStore();
const { activeSegment, currentTime } = storeToRefs(timelineStore);
</script>

<style lang="scss" scoped>
.timeline-player__bar-segment-info-card {
  width: 100%;
  margin: 0;
  background: none;
  color: $color-fg;
  border: none;
  border-radius: 0;
  box-shadow: none;
  padding: 0;
  font-size: 1.05rem;
  min-width: 180px;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0;
  align-items: stretch;
}

.segment-info__header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.2rem;
  background: $color-bg;
  border-bottom: 1.5px solid $color-border-light;
  border-radius: 0;
  padding: 0.7rem 1.5rem;
  box-shadow: none;
  margin-bottom: 1.2rem;
  position: relative;
}

.segment-info__header--inline {
  flex-direction: row;
  gap: 1.2rem;
}

.segment-info__emoji {
  font-size: 2.1rem;
  margin-right: 0.5rem;
  color: $color-supporting;
}

.segment-info__type-label {
  font-weight: bold;
  color: $color-fg;
  font-size: 1.1rem;
  letter-spacing: 0.02em;
}

.segment-info__description {
  font-size: 1rem;
  color: $color-supporting;
  margin: 0;
  padding: 0;
  background: none;
  border-radius: 0;
  box-shadow: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  border: none;
}

.segment-info__timer {
  margin-left: auto;
  font-size: 1.1rem;
  color: $color-timer;
  font-weight: 600;
  display: flex;
  align-items: center;
}
</style>
