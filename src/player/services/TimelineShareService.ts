import { Timeline } from '@/player/data';
import type { Segment } from '@/player/data';
import { TextualSegment, VideoSegment, VideoComment } from '@/player/data';
import type { StanceType } from '@/player/data';

export class TimelineShareService {
  /**
   * Encodes the segments array into a base64 string and returns a sharable URL.
   */
  static createShareUrl(segments: Segment[]): string {
    const json = JSON.stringify(segments);
    const encoded = btoa(encodeURIComponent(json));
    const url = `${window.location.origin}${window.location.pathname}?timeline=${encoded}`;
    return url;
  }

  /**
   * Reads the current URL and, if a timeline param is present, decodes and returns the segments array.
   * Returns null if not present or invalid.
   */
  static getSegmentsFromUrl(): Segment[] | null {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('timeline');
    if (!encoded) return null;
    try {
      const json = decodeURIComponent(atob(encoded));
      const segmentsRaw = JSON.parse(json);
      if (!Array.isArray(segmentsRaw)) return null;
      // Recreate class instances from raw data

      return segmentsRaw.map((seg) => {
        if (!seg) throw new Error('Segment is undefined');
        if (seg.type === 'text') {
          return new TextualSegment(
            seg.id,
            seg.stance as StanceType,
            seg.content ?? '',
            seg.title ?? '',
            seg.endAt ?? 0,
            seg.sources ?? [],
          );
        } else if (seg.type === 'video') {
          return new VideoSegment(
            seg.id,
            seg.stance as StanceType,
            seg.videoId ?? '',
            seg.title ?? '',
            seg.startAt ?? 0,
            seg.endAt ?? 0,

            (seg.videoComments ?? []).map(
              (ct: {
                id: string;
                content: string;
                startAt: number;
                endAt: number;
                title: string;
              }) =>
                new VideoComment(
                  ct.id,
                  ct.content ?? '',
                  ct.startAt ?? 0,
                  ct.endAt ?? 0,
                  ct.title ?? '',
                ),
            ),
          );
        } else {
          return new TextualSegment(
            new Date().toISOString(), // Generate a new ID if not provided
            seg.stance as StanceType,
            seg.content ?? 'Failed to decode segment',
            seg.title ?? 'Failed to decode segment',
            seg.endAt ?? 0,
            seg.sources ?? [],
          );
        }
      });
    } catch (e) {
      if (import.meta.env.DEV) console.error('Failed to decode timeline from URL', e);
      return null;
    }
  }

  /**
   * Returns a Timeline instance from the URL if present, otherwise null.
   */
  static getTimelineFromUrl(): Timeline | null {
    const segments = this.getSegmentsFromUrl();
    if (segments) {
      return new Timeline(segments);
    }
    return null;
  }
}
