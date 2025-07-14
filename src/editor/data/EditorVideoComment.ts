import type { StanceType } from '@/player/data';


export interface EditorVideoComment {
    id: string;
    stance: StanceType;
    content: string;
    title: string;
    startAt: number;
    endAt: number;
}
