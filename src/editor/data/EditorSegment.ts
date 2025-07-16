import type { SegmentType, StanceType } from '@/player/data';
import type { EditorVideoComment } from './EditorVideoComment';

export interface EditorSegment {
  id: string;
  type: SegmentType;
  stance: StanceType;
  title: string;
  // For text
  content?: string;
  endAt?: number;
  sources?: string[];
  // For video
  videoId?: string;
  startAt?: number;
  videoComments?: EditorVideoComment[];
}
