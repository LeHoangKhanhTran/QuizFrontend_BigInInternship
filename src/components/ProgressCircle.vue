<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

const progress = ref(0);
const { targetProgress, size } = defineProps({
  targetProgress: {
    type: Number,
    required: true,
    default: 20,
  },
  size: {
    type: Number,
    default: 50, 
  },
});

const radius = computed(() => size / 2 - 5);
const circumference = computed(() => 2 * Math.PI * radius.value);
const strokeDashoffset = computed(() => {
  return circumference.value - (progress.value / 100) * circumference.value;
});

onMounted(() => {
  setTimeout(() => {
    progress.value = targetProgress;
  }, 200);
});
</script>

<template>
  <div class="relative w-fit h-fit">
    <svg
      :width="size"
      :height="size"
      :viewBox="`0 0 ${size} ${size}`"
      class="transform -rotate-90"
    >
      <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        fill="none"
        stroke="var(--background-light)"
        stroke-width="5"
      />
      <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        fill="none"
        :stroke="progress > 50 ? 'var(--correct-color)' : 'var(--wrong-color)'"
        stroke-width="5"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="strokeDashoffset"
        stroke-linecap="round"
        style="transition: stroke-dashoffset 1s ease"
      />
    </svg>
    <div
      :class="`absolute inset-0 flex items-center justify-center font-bold`"
      :style="{ fontSize: `${(size / 4) + 2}px`, color: progress > 50 ? 'var(--correct-color)' : 'var(--wrong-color)' }"
    >
      {{ progress }}%
    </div>
  </div>
</template>
