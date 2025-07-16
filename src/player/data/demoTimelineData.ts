// Demo timeline data for TimelinePlayer
import { TextualSegment, VideoSegment, VideoComment } from '.';
import type { StanceType } from '.';

export const demoSegmentsRaw = [
  {
    id: '1',
    type: 'text',
    stance: 'main' as StanceType,
    title: `What is Argumenter`,
    content: `It\'s a tool to discuss to topics and arguments in a structured way.`,
    endAt: 5,
    sources: [],
  },
  {
    id: '2',
    type: 'video',
    stance: 'main' as StanceType,
    videoId: '1A_CAkYt3GY',
    title: 'Main Argument',
    startAt: 9,
    endAt: 33,
    videoComments: [
      {
        id: '2.1',
        title: 'Video Comment',
        content: 'Here you can express your opinion about the video content.',
        startAt: 14,
        endAt: 19,
      },
      {
        id: '2.2',
        title: '2nd Video Comment',
        content: 'You can have many of these comments. on different time stamps.',
        startAt: 24,
        endAt: 29,
      },
    ],
  },
  {
    id: '3',
    type: 'text',
    stance: 'against' as StanceType,
    title: `Opposing Textual segment`,
    content: `This is a textual segment that can be used to explain something or add context to the discussion.
              here you can add sources and references to support your argument.`,
    endAt: 5,
    sources: ['https://www.wikipedia.org/', 'https://www.britannica.com/'],
  },
  {
    id: '4',
    type: 'video',
    stance: 'main' as StanceType,
    videoId: '1A_CAkYt3GY',
    title: 'Main Argument Continued',
    startAt: 60,
    endAt: 60 + 28,
    videoComments: [
      {
        id: '4.1',
        title: 'Did you notice the colored bars?',
        content:
          'They represent the stance of the segment. You can use them to quickly identify if the segment supports or opposes the main argument.',
        startAt: 65,
        endAt: 75,
      },
    ],
  },
  {
    id: '5',
    type: 'text',
    stance: 'against' as StanceType,
    title: `Finally`,
    content: `you can Edit and share your timeline with others. by clicking on the Edit button above 👆,
              No account is required to use this tool.
    `,
    endAt: 5,
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
        (ct: { id: string; title: string; content: string; startAt: number; endAt: number }) =>
          new VideoComment(ct.id, ct.content, ct.startAt, ct.endAt, ct.title),
      ),
    );
  }
  throw new Error('Unknown segment type');
});
