<template>
  <div v-if="activeSegment" class="w-full flex flex-col gap-2 min-w-[180px] text-left">
    <div class="flex items-center gap-3 text-lg bg-zinc-900 border-b border-zinc-700 rounded-t px-4 py-2">
      <span class="text-2xl" :class="activeSegment.type === 'text' ? 'text-green-400' : 'text-blue-400'">
        {{ activeSegment.type === 'text' ? '📝' : '🎬' }}
      </span>
      <span class="font-bold text-zinc-100 text-base">
        {{ activeSegment.type === 'text' ? 'Text Segment' : 'Video Segment' }}
      </span>
      <span class="text-green-400 text-sm font-medium flex items-center gap-1">
        🗒️ {{ activeSegment.description }}
      </span>
      <span v-if="activeSegment.type === 'video'" class="ml-auto text-blue-400 font-semibold flex items-center">
        ⏳ {{ Math.max(0, Math.ceil((activeSegment as any).endAt - currentTime)) }}s
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTimelineStore } from '@/timeline/stores/timelineStore';
import { storeToRefs } from 'pinia';

const timelineStore = useTimelineStore();
const { activeSegment, currentTime } = storeToRefs(timelineStore);
</script>
