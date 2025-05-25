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
        content: 'Pay attention to the speaker’s main argument in this section.',
        startAt: 10,
        endAt: 20,
        stance: 'main' as StanceType,
        description: 'Highlighting main argument'
      }
    ]
  },
  {
    id: 3,
    type: 'text',
    stance: 'against' as StanceType,
    content: 'since we agree that this is not the evolution theory, I\'m not going to comment on some innaccurate points made in the video.',
    duration: 5,
    description: 'this is not the evolution theory',
  },
  {
    id: 4,
    type: 'video',
    stance: 'main' as StanceType,
    videoId: 'LEx3K50DQ4M',
    startAt: 0,
    endAt: 56,
    description: 'Evolution hypothesis',
    concurrentTextSegments: [
      {
        id: 4.1,
        content: 'Notice the evidence presented here.',
        startAt: 5,
        endAt: 13,
        stance: 'supporting' as StanceType,
        description: 'Supporting evidence highlight'
      }
    ]
  },
  {
    id: 5,
    type: 'video',
    stance: 'against' as StanceType,
    videoId: 'lqk3TKuGNBA',
    startAt: 175,
    endAt: 236,
    description: 'Evolution is a theory',
    concurrentTextSegments: [
      {
        id: 5.1,
        content: 'This part of the video is often debated.',
        startAt: 20,
        endAt: 27,
        stance: 'against' as StanceType,
        description: 'Controversial section'
      }
    ]
  },
  {
    id: 6,
    type: 'video',
    stance: 'main' as StanceType,
    videoId: 'LEx3K50DQ4M',
    startAt: 56,
    endAt: 247,
    description: 'Origin of life and the big bang theory',
    concurrentTextSegments: []
  },
  {
    id: 10,
    type: 'text',
    stance: 'against' as StanceType,
    content: 'Evolution theory does not answer, Origin of life and the big bang theory',
    duration: 10,
    description: 'Evolution theory does not answer, Origin of life and the big bang theory',
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
