import type { SegmentType, StanceType } from '../types/index';

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
