// Demo timeline data for TimelinePlayer
import { TextualSegment, VideoSegment, VideoComment } from '.';
import type { StanceType } from '.';

export const demoSegmentsRaw = [
  {
    id: 1,
    type: 'text',
    stance: 'main' as StanceType,
    content: 'Welcome to the argument!',
    title: 'Introduction',
    endAt: 5, // used as endAt for TextualSegment
    sources: [],
  },
  {
    id: 2,
    type: 'video',
    stance: 'main' as StanceType,
    videoId: 'QRxR98QLXyA',
    title: 'Opening argument video',
    startAt: 2,
    endAt: 187,
    videoComments: [
      {
        id: 1.1,
        stance: 'main' as StanceType,
        content: 'I agree with you father Luka that this is not the evolution theory.',
        title: 'We agree',
        startAt: 40,
        endAt: 50,
      },
      {
        id: 1.2,
        stance: 'main' as StanceType,
        content: 'Again we agree',
        title: 'Again We agree',
        startAt: 5,
        endAt: 30,
      },
    ],
  },
  {
    id: 4,
    type: 'video',
    stance: 'main' as StanceType,
    videoId: 'LEx3K50DQ4M',
    title: 'Evolution hypothesis',
    startAt: 1,
    endAt: 56,
    videoComments: [],
  },
  {
    id: 5,
    type: 'video',
    stance: 'against' as StanceType,
    videoId: 'lqk3TKuGNBA',
    title: 'Evolution is a theory',
    startAt: 175,
    endAt: 236,
    videoComments: [],
  },
  {
    id: 6,
    type: 'video',
    stance: 'main' as StanceType,
    videoId: 'LEx3K50DQ4M',
    title: 'Origin of life and the big bang theory',
    startAt: 56,
    endAt: 247,
    videoComments: [
      {
        id: 1.1,
        stance: 'main' as StanceType,
        content: 'We agree again that is not the theory of evolution.',
        title: 'We agree',
        startAt: 56,
        endAt: 93,
      },
    ],
  },
  {
    id: 10,
    type: 'text',
    stance: 'main' as StanceType,
    content: 'The End',
    title: 'The End',
    endAt: 10,
    sources: [],
  },
];

export const demoSegments = demoSegmentsRaw.map((seg) => {
  if (!seg) {
    throw new Error('Segment is undefined');
  }
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
      seg.stance,
      seg.videoId ?? '',
      seg.title ?? '',
      seg.startAt ?? 0,
      seg.endAt ?? 0,
      (seg.videoComments ?? []).map(
        (ct: {
          id: number;
          content: string;
          startAt: number;
          endAt: number;
          stance: StanceType;
          title: string;
        }) => new VideoComment(ct.id, ct.stance, ct.content, ct.startAt, ct.endAt, ct.title),
      ),
    );
  }
  throw new Error('Unknown segment type');
});
