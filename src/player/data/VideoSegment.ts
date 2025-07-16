import { Segment } from './Segment';
import { VideoComment } from './VideoComment';
import type { StanceType } from './index';

export class VideoSegment extends Segment {
  videoId: string;
  videoComments: VideoComment[];

  constructor(
    id: string,
    stance: StanceType,
    videoId: string,
    title: string,
    startAt: number,
    endAt: number,
    videoComments: VideoComment[] = [],
  ) {
    super(id, 'video', stance, title, startAt, endAt);
    if (startAt < 0 || endAt <= startAt) {
      throw new Error('Invalid video segment time range.');
    }
    if (!videoId || videoId.trim().length === 0) {
      throw new Error('VideoSegment requires a valid videoId.');
    }
    this.startAt = startAt;
    this.endAt = endAt;
    this.videoId = videoId;
    this.videoComments = videoComments;
  }

  getActiveVideoComment(): VideoComment | null {
    return (
      this.videoComments.find(
        (comment) => comment.startAt <= this.currentlyAt && comment.endAt >= this.currentlyAt,
      ) ?? null
    );
  }
}
