/**
 * Represents the type of a segment within the timeline.
 *
 * - `'text'`: A segment containing textual content.
 * - `'video'`: A segment containing video content.
 */
export type SegmentType = 'text' | 'video';

/**
 * Represents the possible stances that can be taken in a discussion or argument.
 *
 * - `'main'`: The primary or central stance.
 * - `'supporting'`: A stance that supports or reinforces the main stance.
 * - `'against'`: A stance that opposes or contradicts the main stance.
 */
export type StanceType = 'main' | 'supporting' | 'against';

/**
 * Abstract base class for all timeline segments.
 */
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

/**
 * Represents a segment containing textual content.
 * duration: how long (in seconds) the text should be visible.
 */
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

/**
 * Represents a segment containing video content.
 * startAt: when the video segment starts (in seconds).
 * endAt: when the video segment ends (in seconds).
 */
export class VideoSegment extends Segment {
    videoId: string;
    startAt: number;
    endAt: number;

    constructor(
        id: number,
        startAt: number,
        endAt: number,
        stance: StanceType,
        videoId: string,
        description: string
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
    }
}

/**
 * Represents a timeline composed of multiple segments.
 * Provides methods to manage and retrieve timeline segments.
 */
export class Timeline {
    segments: Segment[];
    activeSegment: Segment | null;
    visitedSegments: Segment[];

    constructor(segments: Segment[]) {
        this.segments = segments;
        this.activeSegment = null;
        this.visitedSegments = [];
    }

    /**
     * Adds a new segment to the timeline.
     * @param segment - The Segment object to add to the timeline.
     */
    addSegment(segment: Segment): void {
        this.segments = [...this.segments, segment];
    }

    /**
     * Retrieves all segments in the timeline.
     * @returns An array of Segment objects currently in the timeline.
     */
    getSegments(): Segment[] {
        return this.segments;
    }

    /**
     * Adds a segment to visitedSegments if not already present.
     * @param segment - The segment to mark as visited.
     */
    private markVisited(segment: Segment | null): void {
        if (segment && !this.visitedSegments.includes(segment)) {
            this.visitedSegments = [...this.visitedSegments, segment];
        }
    }

    /**
     * Activates a segment by its id. Deactivates all others.
     * @param id - The id of the segment to activate.
     */
    activateSegmentById(id: number): void {
        this.markVisited(this.activeSegment);
        const found = this.segments.find(segment => segment.id === id) || null;
        if (!found) {
            throw new Error(`No segment found with id ${id}.`);
        }
        this.activeSegment = found;
    }

    /**
     * Activates a segment by its index in the array. Deactivates all others.
     * @param index - The index of the segment to activate.
     */
    activateSegmentByIndex(index: number): void {
        this.markVisited(this.activeSegment);
        if (index < 0 || index >= this.segments.length) {
            throw new Error(`Index ${index} is out of bounds.`);
        }
        this.activeSegment = this.segments[index];
    }
}