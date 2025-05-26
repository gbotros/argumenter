import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Segment, ConcurrentTextualSegment, VideoSegment } from '@/timeline/types';

// Pinia store for timeline state management
export const useTimelineStore = defineStore('timeline', () => {
  // State
  const segments = ref<Segment[]>([]);
  const activeIndex = ref<number>(0);
  const visitedSegments = ref<Segment[]>([]);
  const hoveredSegment = ref<Segment | null>(null);
  const currentTime = ref(0);

  // Timer state for textual segments
  const segmentRemainingTime = ref(0);
  const isPaused = ref(false);

  // Actions
  function setSegments(newSegments: Segment[]) {
    segments.value = newSegments;
  }

  function setActiveIndex(index: number) {
    debugger;
    activeIndex.value = index;
    const segment = segments.value[index];
    if (segment && !visitedSegments.value.includes(segment)) {
      visitedSegments.value.push(segment);
    }
  }

  function markVisited(segment: Segment) {
    if (!visitedSegments.value.includes(segment)) {
      visitedSegments.value.push(segment);
    }
  }

  function resetVisited() {
    visitedSegments.value = [];
  }

  function setHoveredSegment(segment: Segment | null) {
    hoveredSegment.value = segment;
  }

  function setSegmentRemainingTime(time: number) {
    segmentRemainingTime.value = time;
  }

  function setIsPaused(paused: boolean) {
    isPaused.value = paused;
  }

  // Getters
  const activeSegment = computed(() => segments.value[activeIndex.value] || null);
  const isVisited = (segment: Segment) => visitedSegments.value.includes(segment);
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
    visitedSegments,
    hoveredSegment,
    currentTime,
    setSegments,
    setActiveIndex,
    markVisited,
    resetVisited,
    setHoveredSegment,
    activeSegment,
    isVisited,
    activeConcurrentTextualSegment,
    segmentRemainingTime,
    isPaused,
    setSegmentRemainingTime,
    setIsPaused,
  };
});
