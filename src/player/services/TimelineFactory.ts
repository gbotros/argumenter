import { Timeline } from '../data/Timeline';
import { TextualSegment } from '../data/TextualSegment';
import { VideoSegment } from '../data/VideoSegment';
import { VideoComment } from '../data/VideoComment';
import type { EditorSegment } from '@/editor/data/EditorSegment';
import type { Segment } from '../data/Segment';
import type { StanceType } from '../data';
import type { EditorVideoComment } from '@/editor/data/EditorVideoComment';

export class TimelineFactory {
  /**
   * Create a Timeline instance from an array of EditorSegment objects
   */
  static fromEditorSegments(editorSegments: EditorSegment[]): Timeline {
    const segments: Segment[] = editorSegments.map((seg) => {
      if (seg.type === 'text') {
        return new TextualSegment(
          seg.id,
          seg.stance as StanceType,
          seg.content ?? '',
          seg.title ?? '',
          seg.endAt ?? 0,
          seg.sources ?? [],
        );
      } else if (seg.type === 'video') {
        return new VideoSegment(
          seg.id,
          seg.stance as StanceType,
          seg.videoId ?? '',
          seg.title ?? '',
          seg.startAt ?? 0,
          seg.endAt ?? 0,
          (seg.videoComments ?? []).map(
            (ct: EditorVideoComment) =>
              new VideoComment(
                ct.id,
                ct.content ?? '',
                ct.startAt ?? 0,
                ct.endAt ?? 0,
                ct.title ?? '',
              ),
          ),
        );
      } else {
        throw new Error('Unknown segment type');
      }
    });
    return new Timeline(segments);
  }
}
