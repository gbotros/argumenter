import { Segment } from './Segment';

export class Timeline {
  segments: Segment[];
  activeSegment: Segment | null;

  constructor(segments: Segment[]) {
    this.segments = segments;
    this.activeSegment = null;
  }

  addSegment(segment: Segment): void {
    this.segments = [...this.segments, segment];
  }

  getSegments(): Segment[] {
    return this.segments;
  }

  private markVisited(segment: Segment | null): void {
    if (segment && !segment.isVisited) {
      segment.isVisited = true;
    }
  }

  activateSegmentById(id: number): void {
    this.markVisited(this.activeSegment);
    const found = this.segments.find(segment => segment.id === id) || null;
    if (!found) {
      throw new Error(`No segment found with id ${id}.`);
    }
    this.activeSegment = found;
  }

  activateSegmentByIndex(index: number): void {
    this.markVisited(this.activeSegment);
    if (index < 0 || index >= this.segments.length) {
      throw new Error(`Index ${index} is out of bounds.`);
    }
    this.activeSegment = this.segments[index];
  }
}
