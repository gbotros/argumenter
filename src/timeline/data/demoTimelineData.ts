// Demo timeline data for TimelinePlayer
import { TextualSegment, VideoSegment } from '../timeLine.data';
import type { StanceType } from '../types';

export const demoSegmentsRaw = [
  {
    id: 1,
    type: 'text',
    stance: 'main' as StanceType,
    content: 'Welcome to the argument!',
    duration: 8,
    description: 'Introduction',
  },
  {
    id: 2,
    type: 'video',
    stance: 'supporting' as StanceType,
    videoId: 'dQw4w9WgXcQ',
    startAt: 0,
    endAt: 30,
    description: 'Opening argument video',
  },
  {
    id: 3,
    type: 'text',
    stance: 'against' as StanceType,
    content: 'Counterpoint: Consider the other side.',
    duration: 6,
    description: 'Counterpoint',
  },
];

export const demoSegments = demoSegmentsRaw.map(seg => {
  if (seg.type === 'text') {
    return new TextualSegment(
      seg.id,
      seg.stance,
      seg.content ?? '',
      seg.duration ?? 0,
      seg.description ?? ''
    );
  } else if (seg.type === 'video') {
    return new VideoSegment(
      seg.id,
      seg.startAt ?? 0,
      seg.endAt ?? 0,
      seg.stance,
      seg.videoId ?? '',
      seg.description ?? ''
    );
  }
  throw new Error('Unknown segment type');
});
