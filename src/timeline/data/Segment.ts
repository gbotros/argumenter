import type { SegmentType, StanceType } from '../types/index';

export abstract class Segment {
  id: number;
  type: SegmentType;
  stance: StanceType;
  description: string;
  startAt: number;
  currentlyAt: number;
  endAt: number;
  isVisited: boolean;
  isActive: boolean;
  isHovered?: boolean;

  protected constructor(
    id: number,
    type: SegmentType,
    stance: StanceType,
    description: string,
    startAt: number,
    endAt: number
  ) {

    if (startAt < 0 || endAt <= startAt) {
      throw new Error('Invalid startAt/endAt values for ConcurrentTextualSegment.');
    }
    if (!description || description.trim().length === 0) {
      throw new Error('Segment requires a non-empty description.');
    }

    this.id = id;
    this.type = type;
    this.stance = stance;
    this.description = description;
    this.startAt = startAt;
    this.endAt = endAt;
    this.isVisited = false;
    this.isActive = false;
    this.currentlyAt = startAt;
    this.isHovered = false;
  }
}
