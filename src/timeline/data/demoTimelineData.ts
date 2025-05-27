// Demo timeline data for TimelinePlayer
import { TextualSegment, VideoSegment, ConcurrentTextualSegment } from '.';
import type { StanceType } from '.';

export const demoSegmentsRaw = [
  {
    id: 1,
    type: 'text',
    stance: 'main' as StanceType,
    content: 'Welcome to the argument!',
    description: 'Introduction',
    endAt: 5, // used as endAt for TextualSegment
  },
  {
    id: 2,
    type: 'video',
    stance: 'main' as StanceType,
    videoId: 'QRxR98QLXyA',
    description: 'Opening argument video',
    startAt: 1,
    endAt: 187,
    concurrentTextSegments: [
      {
        id: 1.1,
        stance: 'main' as StanceType,
        content: 'I agree with you father Luka that this is not the evolution theory.',
        description: 'We agree',
        startAt: 40,
        endAt: 50,
      },
      {
        id: 1.2,
        stance: 'main' as StanceType,
        content: 'Again we agree',
        description: 'Again We agree',
        startAt: 5,
        endAt: 30,
      }
    ]
  },
  {
    id: 4,
    type: 'video',
    stance: 'main' as StanceType,
    videoId: 'LEx3K50DQ4M',
    description: 'Evolution hypothesis',
    startAt: 1,
    endAt: 56,
    concurrentTextSegments: []
  },
  {
    id: 5,
    type: 'video',
    stance: 'against' as StanceType,
    videoId: 'lqk3TKuGNBA',
    description: 'Evolution is a theory',
    startAt: 175,
    endAt: 236,
    concurrentTextSegments: []
  },
  {
    id: 6,
    type: 'video',
    stance: 'main' as StanceType,
    videoId: 'LEx3K50DQ4M',
    description: 'Origin of life and the big bang theory',
    startAt: 56,
    endAt: 247,
    concurrentTextSegments: [
      {
        id: 1.1,
        stance: 'main' as StanceType,
        content: 'We agree again that is not the theory of evolution.',
        description: 'We agree',
        startAt: 56,
        endAt: 93,
      }
    ]
  },
  {
    id: 10,
    type: 'text',
    stance: 'main' as StanceType,
    content: 'The End',
    description: 'The End',
    endAt: 10
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
      seg.description ?? '',
      seg.endAt ?? 0
    );
  } else if (seg.type === 'video') {
    return new VideoSegment(
      seg.id,
      seg.stance,
      seg.videoId ?? '',
      seg.description ?? '',
      seg.startAt ?? 0,
      seg.endAt ?? 0,
      (seg.concurrentTextSegments ?? []).map((ct: {
        id: number;
        content: string;
        startAt: number;
        endAt: number;
        stance: StanceType;
        description: string;
      }) =>
        new ConcurrentTextualSegment(
          ct.id,
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
