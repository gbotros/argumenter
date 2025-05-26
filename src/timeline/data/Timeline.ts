import { Segment } from './Segment';

export class Timeline {
  segments: Segment[];
  // Cached active segment
  // This is used to avoid recalculating the active segment multiple times
  activeSegment: Segment | null;

  constructor(segments: Segment[]) {
    this.segments = segments;
    this.activeSegment = null;
  }

  getSegments(): Segment[] {
    return [...this.segments];
  }

  activateSegment(id: number): void {
    const sIndex = this.getSegmentIndexById(id);
    if (sIndex) this.activateSegmentByIndex(sIndex);
  }

  activateNextSegment(): void {
    const activeSegment = this.getActiveSegment();
    if (!activeSegment) {
      this.activateSegmentByIndex(0);
      return;
    }

    const activeIndex = this.getSegmentIndexById(activeSegment.id);
    const nextIndex = activeIndex! + 1;

    if (nextIndex >= this.segments.length) {
      throw new Error('No next segment available');
    }

    this.activateSegmentByIndex(nextIndex);
  }

  activatePreviousSegment(): void {
    const activeSegment = this.getActiveSegment();
    if (!activeSegment) {
      this.activateSegmentByIndex(0);
      return;
    }
    const activeIndex = this.getSegmentIndexById(activeSegment.id);
    const previousIndex = activeIndex! - 1;
    if (previousIndex < 0) {
      throw new Error('No previous segment available');
    }
    this.activateSegmentByIndex(previousIndex);
  }

  getActiveSegment(): Segment | null {
    return this.activeSegment ?? null;
  }

  hoverSegment(id: number): void {
    this.segments.forEach((seg) => {
      if (seg.id !== id) {
        seg.isHovered = seg.id === id;
      }
    });
  }

  clearHover(id: number): void {
    this.segments.forEach((seg) => {
      if (seg.id === id) {
        seg.isHovered = false;
      }
    });
  }

  setCurrentlyAtTime(time: number): void {
    const activeSegment = this.getActiveSegment();
    if (activeSegment) {
      activeSegment.currentlyAt = time;
    }
  }

  getSegmentRemainingTime(): number {
    const activeSegment = this.getActiveSegment();
    if (!activeSegment) return 0;

    const remainingTime = activeSegment.endAt - activeSegment.currentlyAt;
    return remainingTime >= 0 ? remainingTime : 0;
  }

  private activateSegmentByIndex(index: number): void {
    const segment = this.getSegmentByIndex(index);
    if (!segment) return;

    segment.isVisited = true;
    this.segments.forEach((seg) => {
      seg.isActive = seg.id === segment.id;
    });

    // set the active segment cached value
    this.activeSegment = segment;
  }

  private getSegmentById(id: number): Segment | null {
    const index = this.getSegmentIndexById(id);
    if (index === null) {
      return null;
    }
    return this.getSegmentByIndex(index);
  }

  private getSegmentIndexById(id: number): number | null {
    const index = this.segments.findIndex((segment) => segment.id === id);
    return index >= 0 ? index : null;
  }

  private getSegmentByIndex(index: number): Segment | null {
    if (index < 0 || index >= this.segments.length) {
      return null;
    }
    return this.segments[index] ?? null;
  }


}
