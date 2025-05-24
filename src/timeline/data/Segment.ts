import type { SegmentType, StanceType } from './index';

export abstract class Segment {
  id: number;
  type: SegmentType;
  stance: StanceType;
  title: string;
  startAt: number;
  protected currentlyAt: number;
  endAt: number;
  isVisited: boolean;
  isActive: boolean; // TODO: George: make this protected and use getters/setters
  isHovered?: boolean;

  protected constructor(
    id: number,
    type: SegmentType,
    stance: StanceType,
    title: string,
    startAt: number,
    endAt: number,
  ) {
    if (startAt < 0 || endAt <= startAt) {
      throw new Error('Invalid startAt/endAt values for VideoComment.');
    }
    if (!title || title.trim().length === 0) {
      throw new Error('Segment requires a non-empty title.');
    }

    this.id = id;
    this.type = type;
    this.stance = stance;
    this.title = title;
    this.startAt = startAt;
    this.endAt = endAt;
    this.isVisited = false;
    this.isActive = false;
    this.currentlyAt = startAt;
    this.isHovered = false;
  }

  setCurrentlyAtTime(time: number): void {
    if (time < this.startAt) {
      this.currentlyAt = 0;
      return;
    }
    if (time > this.endAt) {
      this.currentlyAt = this.endAt;
      return;
    }

    this.currentlyAt = time;
  }

  getCurrentlyAtTime(): number {
    return this.currentlyAt;
  }

  getRemainingTime(): number {
    const remainingTime = this.endAt - this.currentlyAt;
    return remainingTime >= 0 ? remainingTime : 0;
  }
}
