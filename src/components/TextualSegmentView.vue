<template>
  <div class="textual-segment-view">
    <div class="text-content">{{ segment.content }}</div>
    <div class="timer">{{ countdown }}s</div>
    <button class="skip-btn" @click="completeSegment">Skip</button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, defineEmits } from 'vue';
import type { TextualSegment } from '../data/timeLine.data';

const props = defineProps<{ segment: TextualSegment }>();
const emit = defineEmits(['segment-complete']);

const countdown = ref(props.segment.duration);
let timer: number | null = null;

function startTimer() {
  timer = window.setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      completeSegment();
    }
  }, 1000);
  if (import.meta.env.DEV) {
    console.log(`[TextualSegmentView] Timer started for segment ${props.segment.id}`);
  }
}

function completeSegment() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  emit('segment-complete');
  if (import.meta.env.DEV) {
    console.log(`[TextualSegmentView] Segment ${props.segment.id} completed`);
  }
}

onMounted(() => {
  countdown.value = props.segment.duration;
  startTimer();
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

watch(() => props.segment, (newSeg) => {
  countdown.value = newSeg.duration;
  if (timer) clearInterval(timer);
  startTimer();
});
</script>

<style lang="scss">
@use '../assets/variables.scss' as *;

.textual-segment-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: $color-bg-alt;
  border-radius: 0.7rem;
  padding: 1.2rem 1.5rem;
  box-shadow: 0 1px 8px $color-shadow-light;
}
.text-content {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: $color-fg;
  text-align: center;
}
.timer {
  font-size: 1.1rem;
  color: $color-timer;
  margin-bottom: 1rem;
}
.skip-btn {
  background: $color-bg;
  color: $color-fg;
  border: 1px solid $color-border-light;
  border-radius: 0.4rem;
  padding: 0.4rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
}
.skip-btn:hover {
  background: $color-btn-hover;
  border-color: $color-btn-hover-border;
}
</style>
