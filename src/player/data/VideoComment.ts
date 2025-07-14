import { Segment } from './Segment';
import type { StanceType } from './index';

export class VideoComment extends Segment {
  content: string;

  constructor(
    id: number,
    stance: StanceType,
    content: string,
    startAt: number,
    endAt: number,
    title: string,
  ) {
    super(id, 'text', stance, title, startAt, endAt);
    if (!content || content.trim().length === 0) {
      throw new Error('VideoComment requires non-empty content.');
    }
    this.content = content;
  }
}
