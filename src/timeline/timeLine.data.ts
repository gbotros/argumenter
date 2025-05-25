import { Segment, TextualSegment, VideoSegment, ConcurrentTextualSegment } from './types';

export class Timeline {
  segments: Segment[];
  activeSegment: Segment | null;
  visitedSegments: Segment[];

  constructor(segments: Segment[]) {
    this.segments = segments;
    this.activeSegment = null;
    this.visitedSegments = [];
  }

  addSegment(segment: Segment): void {
    this.segments = [...this.segments, segment];
  }

  getSegments(): Segment[] {
    return this.segments;
  }

  private markVisited(segment: Segment | null): void {
    if (segment && !this.visitedSegments.includes(segment)) {
      this.visitedSegments = [...this.visitedSegments, segment];
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

export { Segment, TextualSegment, VideoSegment, ConcurrentTextualSegment };
