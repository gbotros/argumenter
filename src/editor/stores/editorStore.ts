import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { StanceType, SegmentType } from '@/timeline/data';

export interface VideoCommentForm {
  id: number | string;
  stance: StanceType;
  content: string;
  description: string;
  startAt: number;
  endAt: number;
}

export interface EditorSegment {
  id: number | string;
  type: SegmentType;
  stance: StanceType;
  description: string;
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

  // Load from localStorage on init
  const saved = localStorage.getItem('argumenter_editor_segments');
  if (saved) {
    try {
      segments.value = JSON.parse(saved);
    } catch { }
  }

  // Persist to localStorage automatically
  watch(
    segments,
    (val) => {
      localStorage.setItem('argumenter_editor_segments', JSON.stringify(val));
    },
    { deep: true },
  );

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
