// Types for timeline feature

export type SegmentType = 'text' | 'video';

export type StanceType = 'main' | 'supporting' | 'against';

export abstract class Segment {
  id: number;
  type: SegmentType;
  stance: StanceType;
  description: string;

  protected constructor(
    id: number,
    type: SegmentType,
    stance: StanceType,
    description: string
  ) {
    this.id = id;
    this.type = type;
    this.stance = stance;
    this.description = description;
  }
}

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

export { Timeline } from '../timeLine.data';
