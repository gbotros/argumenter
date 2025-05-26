import { Segment } from './Segment';
import { ConcurrentTextualSegment } from './ConcurrentTextualSegment';
import type { StanceType } from '../types/index';

export class VideoSegment extends Segment {
    videoId: string;
    startAt: number;
    endAt: number;
    concurrentTextSegments: ConcurrentTextualSegment[];

    constructor(
        id: number,
        startAt: number,
        endAt: number,
        stance: StanceType,
        videoId: string,
        description: string,
        concurrentTextSegments: ConcurrentTextualSegment[] = []
    ) {
        super(id, 'video', stance, description);
        if (startAt < 0 || endAt <= startAt) {
            throw new Error('Invalid video segment time range.');
        }
        if (!videoId || videoId.trim().length === 0) {
            throw new Error('VideoSegment requires a valid videoId.');
        }
        this.startAt = startAt;
        this.endAt = endAt;
        this.videoId = videoId;
        this.concurrentTextSegments = concurrentTextSegments;
    }
}
