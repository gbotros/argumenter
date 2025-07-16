import { Segment } from './Segment';
import type { StanceType } from './index';

export class TextualSegment extends Segment {
  content: string;
  sources: string[];

  constructor(
    id: string,
    stance: StanceType,
    content: string,
    title: string,
    endAt: number = 0,
    sources: string[] = [],
  ) {
    super(id, 'text', stance, title, 0, endAt);
    if (!content || content.trim().length === 0) {
      throw new Error('TextualSegment requires non-empty content.');
    }
    this.content = content;
    this.sources = sources;
  }
}
