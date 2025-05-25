// Demo timeline data for TimelinePlayer
import { TextualSegment, VideoSegment, ConcurrentTextualSegment } from '../timeLine.data';
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
    startAt: 1,
    endAt: 187,
    description: 'Opening argument video',
    concurrentTextSegments: [
      {
        id: 1.1,
        content: 'I agree with you father Luka that this is not the evolution theory.',
        startAt: 40,
        endAt: 50,
        stance: 'main' as StanceType,
        description: 'We agree'
      }
    ]
  },
  {
    id: 4,
    type: 'video',
    stance: 'main' as StanceType,
    videoId: 'LEx3K50DQ4M',
    startAt: 1,
    endAt: 56,
    description: 'Evolution hypothesis',
    concurrentTextSegments: []
  },
  {
    id: 5,
    type: 'video',
    stance: 'against' as StanceType,
    videoId: 'lqk3TKuGNBA',
    startAt: 175,
    endAt: 236,
    description: 'Evolution is a theory',
    concurrentTextSegments: []
  },
  {
    id: 6,
    type: 'video',
    stance: 'main' as StanceType,
    videoId: 'LEx3K50DQ4M',
    startAt: 56,
    endAt: 247,
    description: 'Origin of life and the big bang theory',
    concurrentTextSegments: [
      {
        id: 1.1,
        content: 'We agree again that is not the theory of evolution.',
        startAt: 56,
        endAt: 93,
        stance: 'main' as StanceType,
        description: 'We agree'
      }
    ]
  },
  {
    id: 10,
    type: 'text',
    stance: 'main' as StanceType,
    content: 'The End',
    duration: 10,
    description: 'The End',
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
      seg.description ?? '',
      (seg.concurrentTextSegments ?? []).map((ct: {
        id: number;
        content: string;
        startAt: number;
        endAt: number;
        stance: StanceType;
        description: string;
      }) =>
        new ConcurrentTextualSegment(
          ct.id, // assign a unique id per concurrent segment (or use a better id if available)
          ct.stance,
          ct.content,
          ct.startAt,
          ct.endAt,
          ct.description
        )
      )
    );
  }
  throw new Error('Unknown segment type');
});
