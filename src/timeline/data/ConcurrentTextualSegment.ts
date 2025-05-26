import { Segment } from './Segment';
import type { StanceType } from '../types/index';

export class ConcurrentTextualSegment extends Segment {
    content: string;
    startAt: number;
    endAt: number;

    constructor(
        id: number,
        stance: StanceType,
        content: string,
        startAt: number,
        endAt: number,
        description: string
    ) {
        super(id, 'text', stance, description);
        if (!content || content.trim().length === 0) {
            throw new Error('ConcurrentTextualSegment requires non-empty content.');
        }
        if (startAt < 0 || endAt <= startAt) {
            throw new Error('Invalid startAt/endAt values for ConcurrentTextualSegment.');
        }
        this.content = content;
        this.startAt = startAt;
        this.endAt = endAt;
    }
}
