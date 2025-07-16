// Demo timeline data for TimelinePlayer
import { TextualSegment } from '.';
import type { StanceType } from '.';

export const demoSegmentsRaw = [
  {
    id: '1',
    type: 'text',
    stance: 'main' as StanceType,
    title: 'Argument Placeholder 1',
    content: 'This is a placeholder for the first argument segment. Content will be added soon.',
    endAt: 5,
    sources: [],
  },
  {
    id: '2',
    type: 'text',
    stance: 'main' as StanceType,
    title: 'Argument Placeholder 2',
    content: 'This is a placeholder for the second argument segment. Content will be added soon.',
    endAt: 5,
    sources: [],
  },
];

export const demoSegments = demoSegmentsRaw.map((seg) => {
  if (!seg) {
    throw new Error('Segment is undefined');
  }

  return new TextualSegment(
    seg.id,
    seg.stance as StanceType,
    seg.content ?? '',
    seg.title ?? '',
    seg.endAt ?? 0,
    seg.sources ?? [],
  );
});
