import { defineStore } from 'pinia';
import { nextTick, ref } from 'vue';
import type { EditorSegment } from '../data/EditorSegment';

export const useEditorStore = defineStore('editor', () => {
  const segments = ref<EditorSegment[]>([]);

  async function setSegments(newSegments: EditorSegment[]) {
    clearSegments();
    await nextTick();
    segments.value = newSegments;
  }

  function addNewSegment() {
    const newSegment: EditorSegment = {
      id: Date.now().toString(),
      type: 'text',
      stance: 'main',
      title: '',
      content: '',
      endAt: 5,
      sources: [],
    };
    segments.value.push(newSegment);
  }

  function deleteSegment(segmentId: string) {
    const idx = segments.value.findIndex((s) => s.id === segmentId);
    if (idx !== -1) segments.value.splice(idx, 1);
  }

  function reorderSegments(fromId: string, toId: string) {
    const fromIdx = segments.value.findIndex((s) => s.id === fromId);
    const toIdx = segments.value.findIndex((s) => s.id === toId);
    if (fromIdx === -1 || toIdx === -1) return;
    const moved = segments.value.splice(fromIdx, 1)[0];
    segments.value.splice(toIdx, 0, moved);
  }

  function clearSegments() {
    segments.value = [];
  }

  function addVideoComment(segmentId: string) {
    const segment = segments.value.find((s) => s.id === segmentId);
    if (!segment || segment.type !== 'video') return;
    if (!segment.videoComments) segment.videoComments = [];
    segment.videoComments.push({
      id: (Date.now() + Math.random()).toString(),
      content: '',
      title: '',
      startAt: segment.startAt ?? 0,
      endAt: segment.endAt ?? 99,
    });
  }

  function removeVideoComment(segmentId: string, commentId: string) {
    const segment = segments.value.find((s) => s.id === segmentId);
    if (!segment || segment.type !== 'video' || !segment.videoComments) return;
    const idx = segment.videoComments.findIndex((c) => c.id === commentId);
    if (idx !== -1) segment.videoComments.splice(idx, 1);
  }

  function addSource(segmentId: string) {
    const segment = segments.value.find((s) => s.id === segmentId);
    if (!segment || segment.type !== 'text') return;
    if (!segment.sources) segment.sources = [];
    segment.sources.push('');
  }

  function removeSource(segmentId: string, sourceIdx: number) {
    const segment = segments.value.find((s) => s.id === segmentId);
    if (!segment || segment.type !== 'text' || !segment.sources) return;
    segment.sources.splice(sourceIdx, 1);
  }

  return {
    segments,
    setSegments,
    deleteSegment,
    reorderSegments,
    clearSegments,
    addVideoComment,
    removeVideoComment,
    addSource,
    removeSource,
    addNewSegment,
  };
});
