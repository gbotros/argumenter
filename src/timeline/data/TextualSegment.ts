import { Segment } from './Segment';
import type { StanceType } from '../types/index';

export class TextualSegment extends Segment {
    content: string;
    duration: number;

    constructor(
        id: number,
        stance: StanceType,
        content: string,
        duration: number,
        description: string
    ) {
        super(id, 'text', stance, description);
        if (!content || content.trim().length === 0) {
            throw new Error('TextualSegment requires non-empty content.');
        }
        if (duration <= 0) {
            throw new Error('TextualSegment requires a positive duration.');
        }
        this.content = content;
        this.duration = duration;
    }
}
