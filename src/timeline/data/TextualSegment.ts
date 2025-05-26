import { Segment } from './Segment';
import type { StanceType } from '../types/index';

export class TextualSegment extends Segment {
  content: string;

  constructor(
    id: number,
    stance: StanceType,
    content: string,
    description: string,
    endAt: number = 0
  ) {
    super(id, 'text', stance, description, 0, endAt);
    if (!content || content.trim().length === 0) {
      throw new Error('TextualSegment requires non-empty content.');
    }

    this.content = content;
  }
}
