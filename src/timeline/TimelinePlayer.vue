<template>
  <div class="timeline-player">
    <div class="player-border" :class="stanceClass">
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
    <div class="timeline-bar">
      <div class="timeline-dots">
        <button
          v-for="(segment, idx) in timeline.getSegments()"
          :key="segment.id"
          :class="dotClass(segment, idx)"
          @click="activateSegment(idx)"
          @mouseenter="handleDotMouseEnter(segment)"
          @mouseleave="handleDotMouseLeave"
        ></button>
      </div>
      <div class="timeline-description" v-if="hoveredSegment">
        <pre>{{ hoveredInfo }}</pre>
      </div>
      <div class="timeline-controls">
        <button @click="goBack" :disabled="activeIndex === 0">Back</button>
        <button @click="goNext" :disabled="activeIndex === timeline.getSegments().length - 1">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Timeline, Segment, TextualSegment, VideoSegment } from './timeLine.data';
import TextualSegmentView from './TextualSegmentView.vue';
import VideoSegmentView from './VideoSegmentView.vue';

const timeline = ref(new Timeline([]));
const activeIndex = ref(0);
const hoveredDescription = ref('');
const hoveredSegment = ref<Segment | null>(null);

onMounted(() => {
  timeline.value.addSegment(new TextualSegment(1, 'main', 'Welcome to the argument!', 8, 'Introduction'));
  timeline.value.addSegment(new VideoSegment(2, 0, 30, 'supporting', 'dQw4w9WgXcQ', 'Opening argument video'));
  timeline.value.addSegment(new TextualSegment(3, 'against', 'Counterpoint: Consider the other side.', 6, 'Counterpoint'));
  timeline.value.activateSegmentByIndex(0);
  activeIndex.value = 0;
  if (import.meta.env.DEV) {
    console.log('[TimelinePlayer] Timeline initialized:', timeline.value.getSegments());
  }
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

const stanceClass = computed(() => {
  switch (activeSegment.value?.stance) {
    case 'main':
      return 'stance-main';
    case 'supporting':
      return 'stance-supporting';
    case 'against':
      return 'stance-against';
    default:
      return '';
  }
});

function activateSegment(idx: number) {
  timeline.value.activateSegmentByIndex(idx);
  activeIndex.value = idx;
  if (import.meta.env.DEV) {
    console.log(`[TimelinePlayer] Activated segment at index ${idx}`);
  }
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

function dotClass(segment: Segment, idx: number) {
  return [
    'timeline-dot',
    idx === activeIndex.value ? 'active' : '',
    timeline.value.visitedSegments.includes(segment) ? 'visited' : 'unvisited',
    `stance-${segment.stance}`
  ];
}

function onSegmentComplete() {
  goNext();
}

function handleDotMouseEnter(segment: Segment) {
  hoveredSegment.value = segment;
  hoveredDescription.value = segment.description;
  if (import.meta.env.DEV) {
    console.log(`[TimelinePlayer] Hovered segment:`, segment);
  }
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
</script>

<style lang="scss">
@import '../assets/main.css';

.timeline-player {
  background: #181a1b;
  color: #f1f1f1;
  padding: 2rem;
  border-radius: 1rem;
  max-width: 700px;
  margin: 2rem auto;
  box-shadow: 0 2px 16px #000a;
}

.player-border {
  border: 3px solid #333;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  transition: border-color 0.3s;
}
.stance-main {
  border-color: #14532d;
}
.stance-supporting {
  border-color: #22c55e;
}
.stance-against {
  border-color: #dc2626;
}

.timeline-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.timeline-dots {
  display: flex;
  gap: 1.2rem;
  margin-bottom: 0.5rem;
}
.timeline-dot {
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 50%;
  border: none;
  background: #444;
  transition: background 0.2s, transform 0.2s;
  cursor: pointer;
  outline: none;
}
.timeline-dot.visited {
  background: #22c55e;
}
.timeline-dot.unvisited {
  background: #444;
}
.timeline-dot.active {
  background: #2563eb;
  transform: scale(1.3);
  box-shadow: 0 0 0 3px #2563eb44;
}
.timeline-dot.stance-main {
  box-shadow: 0 0 0 2px #14532d99;
}
.timeline-dot.stance-supporting {
  box-shadow: 0 0 0 2px #22c55e99;
}
.timeline-dot.stance-against {
  box-shadow: 0 0 0 2px #dc262699;
}
.timeline-description {
  background: #23272a;
  color: #f1f1f1;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  min-width: 180px;
  text-align: center;
}
.timeline-controls {
  display: flex;
  gap: 1.5rem;
  margin-top: 0.5rem;
}
.timeline-controls button {
  background: #23272a;
  color: #f1f1f1;
  border: 1px solid #444;
  border-radius: 0.4rem;
  padding: 0.4rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
}
.timeline-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
