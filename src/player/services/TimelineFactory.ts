import { Timeline } from '../data/Timeline';
import { TextualSegment } from '../data/TextualSegment';
import { VideoSegment } from '../data/VideoSegment';
import { VideoComment } from '../data/VideoComment';
import type { EditorSegment } from '@/editor/data/EditorSegment';
import type { Segment } from '../data/Segment';
import type { StanceType } from '../data';
import type { VideoCommentForm } from '../../editor/stores/editorStore';

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
          seg.title ?? '',
          seg.endAt ?? 0,
          seg.sources ?? [],
        );
      } else if (seg.type === 'video') {
        return new VideoSegment(
          Number(seg.id),
          seg.stance as StanceType,
          seg.videoId ?? '',
          seg.title ?? '',
          seg.startAt ?? 0,
          seg.endAt ?? 0,
          (seg.videoComments ?? []).map(
            (ct: VideoCommentForm) =>
              new VideoComment(
                Number(ct.id),
                ct.stance as StanceType,
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
