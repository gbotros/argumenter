// Demo timeline data for TimelinePlayer
import { TextualSegment, VideoSegment } from '../timeLine.data';
import type { StanceType } from '../types';

export const demoSegmentsRaw = [
  {
    id: 1,
    type: 'text',
    stance: 'main' as StanceType,
    content: 'Welcome to the argument!',
    duration: 5,
    description: 'Introduction',
  },
  {
    id: 2,
    type: 'video',
    stance: 'main' as StanceType,
    videoId: 'QRxR98QLXyA',
    startAt: 0,
    endAt: 30,
    description: 'Opening argument video',
  },
  {
    id: 3,
    type: 'text',
    stance: 'against' as StanceType,
    content: 'Counterpoint: Consider the other side.',
    duration: 2,
    description: 'Counterpoint',
  },
  {
    id: 4,
    type: 'video',
    stance: 'main' as StanceType,
    videoId: 'QRxR98QLXyA',
    startAt: 120,
    endAt: 130,
    description: 'Main argument introduction',
  }, ,
  {
    id: 5,
    type: 'video',
    stance: 'supporting' as StanceType,
    videoId: 'u8ntFIwmZjg',
    startAt: 370,
    endAt: 380,
    description: 'Main argument introduction',
  },
  {
    id: 6,
    type: 'text',
    stance: 'supporting' as StanceType,
    content: 'Supporting point: Consider the evidence from recent studies.',
    duration: 3,
    description: 'Supporting textual argument',
  },
  {
    id: 7,
    type: 'video',
    stance: 'against' as StanceType,
    videoId: 'cxX3CdR9D0M',
    startAt: 100,
    endAt: 105,
    description: 'Against argument video',
  },
  {
    id: 8,
    type: 'text',
    stance: 'against' as StanceType,
    content: 'Counterpoint: There are significant drawbacks to this approach.',
    duration: 2,
    description: 'Counterpoint textual argument',
  },
  {
    id: 9,
    type: 'video',
    stance: 'main' as StanceType,
    videoId: 'QRxR98QLXyA',
    startAt: 130,
    endAt: 140,
    description: 'Main argument continued',
  },
  {
    id: 10,
    type: 'text',
    stance: 'supporting' as StanceType,
    content: 'Another supporting argument: This method is cost-effective.',
    duration: 2,
    description: 'Supporting textual argument 2',
  },
  {
    id: 11,
    type: 'video',
    stance: 'against' as StanceType,
    videoId: 'uQcQSqH13xU',
    startAt: 20,
    endAt: 25,
    description: 'Main argument closing',
  },
  {
    id: 10,
    type: 'text',
    stance: 'supporting' as StanceType,
    content: 'Done',
    duration: 2,
    description: 'Last supporting argument',
  }
];

export const demoSegments = demoSegmentsRaw.map((seg) => {
  if (!seg) {
    throw new Error('Segment is undefined');
  }
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
