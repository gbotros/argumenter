import { Timeline } from '../data/Timeline';
import { TextualSegment } from '../data/TextualSegment';
import { VideoSegment } from '../data/VideoSegment';
import { ConcurrentTextualSegment } from '../data/ConcurrentTextualSegment';
import type { EditorSegment } from '../../editor/stores/editorStore';
import type { Segment } from '../data/Segment';
import type { StanceType } from '../data';

export class TimelineFactory {
  /**
   * Create a Timeline instance from an array of EditorSegment objects
   */
  static fromEditorSegments(editorSegments: EditorSegment[]): Timeline {
    const segments: Segment[] = editorSegments.map((seg) => {
      if (seg.type === 'text') {
        return new TextualSegment(
          Number(seg.id),
          seg.stance as StanceType,
          seg.content ?? '',
          seg.description ?? '',
          seg.endAt ?? 0
        );
      } else if (seg.type === 'video') {
        return new VideoSegment(
          Number(seg.id),
          seg.stance as StanceType,
          seg.videoId ?? '',
          seg.description ?? '',
          seg.startAt ?? 0,
          seg.endAt ?? 0,
          (seg.concurrentTextSegments ?? []).map((ct) =>
            new ConcurrentTextualSegment(
              Number(ct.id),
              ct.stance as StanceType,
              ct.content ?? '',
              ct.startAt ?? 0,
              ct.endAt ?? 0,
              ct.description ?? ''
            )
          )
        );
      } else {
        throw new Error('Unknown segment type');
      }
    });
    return new Timeline(segments);
  }
}
