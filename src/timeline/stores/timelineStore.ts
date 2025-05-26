import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Segment, ConcurrentTextualSegment, VideoSegment } from '@/timeline/types';

// Pinia store for timeline state management
export const useTimelineStore = defineStore('timeline', () => {
  // State
  const segments = ref<Segment[]>([]);
  const activeIndex = ref<number>(0);
  const hoveredSegment = ref<Segment | null>(null);
  const currentTime = ref(0);

  // Timer state for textual segments
  const segmentRemainingTime = ref(0);
  const isPaused = ref(false);

  // Actions
  function activateSegmentByIndex(index: number) {
    debugger;
    activeIndex.value = index;
    const segment = segments.value[index];
    if (segment && !segment.isVisited) {
      segment.isVisited = true;
    }
  }

  function markVisited(segment: Segment) {
    if (!segment.isVisited) {
      segment.isVisited = true;
    }
  }

  function setHoveredSegment(segment: Segment | null) {
    hoveredSegment.value = segment;
  }

  function setSegmentRemainingTime(time: number) {
    segmentRemainingTime.value = time;
  }

  function pause() {
    if (isPaused.value) return;
    isPaused.value = true;
  }

  function resume() {
    if (!isPaused.value) return;
    isPaused.value = false;
  }

  function setSegments(newSegments: Segment[]) {
    segments.value = newSegments;
  }

  // Getters
  const activeSegment = computed(() => segments.value[activeIndex.value] || null);
  const activeConcurrentTextualSegment = computed(() => {

    if (!isActiveVideoSegment()) {
      return null;
    }

    const activeVideoSegment = activeSegment.value as VideoSegment;

    return activeVideoSegment.concurrentTextSegments.find(
      (ct: ConcurrentTextualSegment) =>
        currentTime.value >= ct.startAt &&
        currentTime.value < ct.endAt
    ) ?? null;

  });



  //helpers
  function isActiveVideoSegment(): boolean {
    return isVideoSegment(activeSegment.value);
  }

  function isVideoSegment(segment: Segment): boolean {
    if (!segment) return false;
    if (segment.type !== 'video') return false;
    if (!(segment instanceof VideoSegment)) return false;

    return true;
  }

  return {
    segments,
    activeIndex,
    activeSegment,
    hoveredSegment,
    currentTime,
    activeConcurrentTextualSegment,
    segmentRemainingTime,
    isPaused,
    setSegments,
    activateSegmentByIndex,
    markVisited,
    setHoveredSegment,
    setSegmentRemainingTime,
    pause,
    resume,
  };
});
