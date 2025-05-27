import type { ConcurrentTextualSegment } from '.';
import { Segment } from './Segment';
import type { TextualSegment } from './TextualSegment';
import type { VideoSegment } from './VideoSegment';

export class Timeline {
  segments: Segment[];
  // Cached active segment
  // This is used to avoid recalculating the active segment multiple times
  private _activeSegment: Segment | null = null;
  private _hoveredSegment: Segment | null = null;

  allowBack = false;
  allowNext = false;

  constructor(segments: Segment[]) {
    this.segments = segments;
    this.activateSegmentByIndex(0);
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
      return;
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
      return;
    }
    this.activateSegmentByIndex(previousIndex);
  }

  getActiveSegment(): Segment | null {
    return this._activeSegment ?? null;
  }

  getActiveVideoSegment(): VideoSegment | null {
    const activeSegment = this.getActiveSegment();
    if (!activeSegment || activeSegment.type !== 'video') {
      return null;
    }
    return activeSegment as VideoSegment;
  }

  getActiveTextSegment(): TextualSegment | null {
    const activeSegment = this.getActiveSegment();
    if (!activeSegment || activeSegment.type !== 'text') {
      return null;
    }
    return activeSegment as TextualSegment;
  }

  getActiveConcurrentTextSegment(): ConcurrentTextualSegment | null {
    const activeVideoSegment = this.getActiveVideoSegment();
    if (!activeVideoSegment) {
      return null;
    }

    const concurrentTextSegment = activeVideoSegment.getActiveConcurrentTextSegment();
    return concurrentTextSegment;
  }

  getHoveredSegment(): Segment | null {
    return this._hoveredSegment;
  }

  hoverSegment(id: number): void {
    this.segments.forEach((seg) => {
      seg.isHovered = seg.id === id;
    })

    const hoveredSegment = this.segments.find((seg) => seg.isHovered);
    this._hoveredSegment = hoveredSegment ?? null;

  }

  clearHover(): void {
    this.segments.forEach((seg) => (seg.isHovered = false));
    this._hoveredSegment = null;
  }

  private activateSegmentByIndex(index: number): void {
    debugger;
    const segment = this.getSegmentByIndex(index);
    if (!segment) return;

    segment.isVisited = true;
    segment.setCurrentlyAtTime(segment.startAt);
    this.segments.forEach((seg) => {
      seg.isActive = seg.id === segment.id;
    });

    // set the active segment cached value
    this._activeSegment = segment;

    // Update allowBack and allowNext
    this.allowBack = index > 0;
    this.allowNext = index < this.segments.length - 1;
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
