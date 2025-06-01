// Demo timeline data for TimelinePlayer
import { TextualSegment, VideoSegment, VideoComment } from '.';
import type { StanceType } from '.';

export const demoSegmentsRaw = [
  {
    id: 1,
    type: 'text',
    stance: 'main' as StanceType,
    title: `
        نظريه التطور
        `,
    content: 'Lets Discuss the theory of evolution',
    endAt: 5, // used as endAt for TextualSegment
    sources: [],
  },
  {
    id: 2,
    type: 'video',
    stance: 'main' as StanceType,
    videoId: 'QRxR98QLXyA',
    title: 'تخاريف ١ ',
    startAt: 3,
    endAt: 57,
    videoComments: [],
  },
  {
    id: 3,
    type: 'video',
    stance: 'main' as StanceType,
    videoId: 'QRxR98QLXyA',
    title: 'تخاريف ١ ',
    startAt: 163,
    endAt: 187,
    videoComments: [
      {
        id: 3.1,
        stance: 'supporting' as StanceType,
        title: 'شكرا',
        content: 'شكرا ياابونا علي التوضيح طبعا مش هيه دي نظريه التطور',
        startAt: 180,
        endAt: 187,
      },
    ],
  },
  {
    id: 4,
    type: 'video',
    stance: 'main' as StanceType,
    videoId: 'LEx3K50DQ4M',
    title: `
تخاريف 2
  `,
    startAt: 1,
    endAt: 57,
    videoComments: [
      {
        id: 4.1,
        stance: 'supporting' as StanceType,
        title: `
        نظريه التطور
        `,
        content: `
        التطور هو نظرية علمية وليست فرضية
        `,
        startAt: 45,
        endAt: 56,
      },
    ],
  },
  {
    id: 5,
    type: 'text',
    stance: 'against' as StanceType,
    title: `
         التطور نظريه
        `,
    content: 'التطور هو نظرية ',
    endAt: 10,
    sources: ['https://www.britannica.com/science/evolution-scientific-theory'],
  },
  {
    id: 6,
    type: 'video',
    stance: 'against' as StanceType,
    videoId: 'lqk3TKuGNBA',
    title: 'Fact vs. Theory vs. Hypothesis vs. Law… EXPLAINED!',
    startAt: 35,
    endAt: 236,
    videoComments: [
      {
        id: 6.1,
        stance: 'against' as StanceType,
        title: 'correction',
        content: 'I would say theories explain most of the observations, not all of them.',
        startAt: 2 * 60 + 47,
        endAt: 2 * 60 + 55,
      },
    ],
  },
  {
    id: 7,
    type: 'video',
    stance: 'main' as StanceType,
    videoId: 'LEx3K50DQ4M',
    title: `
        تخاريف 2`,
    startAt: 48,
    endAt: 4 * 60 + 14,
    videoComments: [
      {
        id: 7.1,
        stance: 'against' as StanceType,
        title: `
        متفقين
        `,
        content: `
        احنا متفقين ان مش هي دي نظريه التطور
        `,
        startAt: 60,
        endAt: 60 * 1 + 30,
      },
    ],
  },
  {
    id: 8,
    type: 'video',
    stance: 'main' as StanceType,
    videoId: 'qGHpQaI2P4s',
    title: `
        تخاريف 3
        `,
    startAt: 0,
    endAt: 4 * 60 + 41,
    videoComments: [
      {
        id: 8.1,
        stance: 'against' as StanceType,
        title: `
        احنا متفقين
        `,
        content: `
        احنا متفقين ان مش هي دي نظريه التطور
        `,
        startAt: 5,
        endAt: 40,
      },
    ],
  },
  {
    id: 9,
    type: 'video',
    stance: 'against' as StanceType,
    videoId: 'GhHOjC4oxh8',
    title: 'What is Evolution?',
    startAt: 15,
    endAt: 5 * 60 + 26,
    videoComments: [],
  },
  {
    id: 10,
    type: 'video',
    stance: 'main' as StanceType,
    videoId: 'Er08KFh9Pew',
    title: `
        تخاريف 4
        `,
    startAt: 0,
    endAt: 4 * 60 + 38,
    videoComments: [
      {
        id: 10.1,
        stance: 'main' as StanceType,
        title: `
        نظريه  لامارك
        `,
        content: `
        نظريه  لامارك مش هي نظريه التطور
        `,
        startAt: 35,
        endAt: 2 * 60,
      },
      {
        id: 10.2,
        stance: 'main' as StanceType,
        title: `
          ليه لسه في ذئاب
        `,
        content: `
        لو قبلنا ان الكلاب ليهم سلف مشترك مع الذئاب
        و قياس علي نفس المنطق ليه لسه في ذئاب`,
        startAt: 2 * 60 + 30,
        endAt: 2 * 60 + 48,
      },
      {
        id: 10.3,
        stance: 'main' as StanceType,
        title: `
        الفكره الاولي
        `,
        content: `
        مش هي نظريه التطور
        `,
        startAt: 3 * 60 + 9,
        endAt: 3 * 60 + 13,
      },
      {
        id: 10.4,
        stance: 'main' as StanceType,
        title: `
        الفكره الثانيه
        `,
        content: `
        مش هي نظريه التطور
        `,
        startAt: 3 * 60 + 16,
        endAt: 3 * 60 + 44,
      },
      {
        id: 10.5,
        stance: 'main' as StanceType,
        title: `
        الفكره الثالثه
        `,
        content: `
        قدسك مشرحتلناش ليه الانسان مش ممكن يكون ليه سلف مشترك مع القرده        `,
        startAt: 3 * 60 + 49,
        endAt: 4 * 60 + 9,
      },
    ],
  },
  {
    id: 11,
    type: 'video',
    stance: 'against' as StanceType,
    videoId: 'reXFwYEXQA0',
    title: 'اَلْآثَار وَمِصْدَاقِيَّةِ اَلْكِتَابِ اَلْمُقَدَّسِ - القس لوقا ماهر',
    startAt: 10 * 60 + 15,
    endAt: 10 * 60 + 35,
    videoComments: [],
  },
  {
    id: 12,
    type: 'video',
    stance: 'against' as StanceType,
    videoId: 'HhVRqC0GP0M',
    title: `
    حَقِيقَة اَلطُّوفَانِ اَلْكِتَابِيَّةِ - القمص أنطوني حنا
    `,
    startAt: 24 * 60 + 33,
    endAt: 25 * 60 + 45,
    videoComments: [
      {
        id: 12.1,
        stance: 'against' as StanceType,
        title: `رؤوس الاجناس`,
        content: `Domestic Cat Chromosome Count: 38
                  Geoffroy’s Cat Chromosome Count: 36
                  Tiger Chromosome Count: 38
        `,
        startAt: 24 * 60 + 50,
        endAt: 24 * 60 + 55,
      }, {
        id: 12.1,
        stance: 'against' as StanceType,
        title: `
          رؤوس الاجناس`,
        content: `Domestic Dog Chromosome Count: 78
                  Red Fox Chromosome Count: 34
                  Gray Wolf Chromosome Count: 78
        `,
        startAt: 24 * 60 + 56,
        endAt: 25 * 60 + 10,
      },
    ],
  },
  {
    id: 100,
    type: 'text',
    stance: 'main' as StanceType,
    content: 'Thank you',
    title: 'Thank you',
    endAt: 10,
    sources: [],
  },
];

export const demoSegments = demoSegmentsRaw.map((seg) => {
  if (!seg) {
    throw new Error('Segment is undefined');
  }
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
      seg.stance,
      seg.videoId ?? '',
      seg.title ?? '',
      seg.startAt ?? 0,
      seg.endAt ?? 0,
      (seg.videoComments ?? []).map(
        (ct: {
          id: number;
          content: string;
          startAt: number;
          endAt: number;
          stance: StanceType;
          title: string;
        }) => new VideoComment(ct.id, ct.stance, ct.content, ct.startAt, ct.endAt, ct.title),
      ),
    );
  }
  throw new Error('Unknown segment type');
});
