import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { StanceType, SegmentType } from '@/timeline/data';

export interface VideoCommentForm {
  id: number | string;
  stance: StanceType;
  content: string;
  title: string;
  startAt: number;
  endAt: number;
}

export interface EditorSegment {
  id: number | string;
  type: SegmentType;
  stance: StanceType;
  title: string;
  // For text
  content?: string;
  endAt?: number;
  // For video
  videoId?: string;
  startAt?: number;
  videoComments?: VideoCommentForm[];
}

export const useEditorStore = defineStore('editor', () => {
  const segments = ref<EditorSegment[]>([]);

  function setSegments(newSegments: EditorSegment[]) {
    segments.value = newSegments;
  }

  function addSegment(segment: EditorSegment) {
    segments.value.push(segment);
  }

  function updateSegment(idx: number, segment: EditorSegment) {
    segments.value[idx] = segment;
  }

  function deleteSegment(idx: number) {
    segments.value.splice(idx, 1);
  }

  function reorderSegments(from: number, to: number) {
    const moved = segments.value.splice(from, 1)[0];
    segments.value.splice(to, 0, moved);
  }

  function clearSegments() {
    segments.value = [];
  }

  return {
    segments,
    setSegments,
    addSegment,
    updateSegment,
    deleteSegment,
    reorderSegments,
    clearSegments,
  };
});
