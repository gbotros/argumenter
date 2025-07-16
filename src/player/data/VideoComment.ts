export class VideoComment {
  constructor(
    public id: string,
    public content: string,
    public startAt: number,
    public endAt: number,
    public title: string,
  ) {
    if (!content || content.trim().length === 0) {
      throw new Error('VideoComment requires non-empty content.');
    }

    if (!title || title.trim().length === 0) {
      throw new Error('VideoComment requires a non-empty title.');
    }

    if (startAt < 0 || endAt <= startAt) {
      throw new Error('Invalid startAt/endAt values for VideoComment.');
    }
  }
}
