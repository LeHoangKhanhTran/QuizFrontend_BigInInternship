<script setup lang="ts">
  import clsx from 'clsx';
  import { store } from '../stores/store';
  import { computed } from 'vue';
  import checkIcon from '../assets/check-icon.svg';
  import xIcon from '../assets/x-icon.svg';
  const classes = computed(() => clsx("relative w-full rounded-[14px] p-4 flex gap-4 items-center font-bold text-[1.25rem] cursor-pointer",
      {
        'pointer-events-none': !havePointerEvents,
        'bg-[var(--secondary-color)]': store.theme === 'dark',
        'text-[var(--primary-action-color)] border-[3.5px] border-[var(--primary-action-color)]': isActive && isCorrect === null && havePointerEvents,
        'text-[var(--correct-color)] border-[3.5px] border-[var(--correct-color)]': !isActive && isCorrect === true,
        'text-[var(--wrong-color)] border-[3.5px] border-[var(--wrong-color)]': !isActive && isCorrect === false,
        'bg-[var(--primary-color-light)]': store.theme === 'light',
      }
  ))
  const labelClasses = computed(() => clsx("flex justify-center items-center w-[2.6rem] h-[2.6rem] min-w-[2.7rem] rounded-[0.625rem] text-[1.6rem] font-medium",
      {
        'pointer-events-none': !havePointerEvents,
        'bg-[var(--primary-color-light)]': store.theme === 'dark' && !isActive && isCorrect === null,
        'text-[var(--secondary-color)]': !isActive && isCorrect === null,
        'text-[var(--primary-color-light)] bg-[var(--primary-action-color)]': isActive && isCorrect === null && havePointerEvents,
        'bg-[var(--background-light)]': store.theme === 'light',
        'text-[var(--primary-color-light)]': isCorrect !== null,
        'bg-[var(--correct-color)]': !isActive && isCorrect === true,
        'bg-[var(--wrong-color)]': !isActive && isCorrect === false,
      }
  ))
  const labels = ["A", "B", "C", "D"]
  const { content, index, isActive, isCorrect, havePointerEvents } = defineProps({
    content: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    }, 
    isCorrect: {
      type: Boolean,
      default: null
    },
    havePointerEvents: {
      type: Boolean,
      default: true
    }
  })
</script>

<template>
  <li class="w-full flex flex-col gap-2">
    <slot/>
    <div :class="classes" class="parent">
      <div 
        :class="labelClasses" class="select-none">
        {{ labels[index] }}
      </div>
      <p class="text-start max-w-[80%] text-[1.15rem]">{{ content }}</p>
      <img v-if="isCorrect" :src="checkIcon" alt="check-icon" class="absolute right-4 select-none"/>
      <img v-else-if="isCorrect === false" :src="xIcon" alt="x-icon" class="absolute right-4 select-none"/>
    </div>
  </li>
</template>

<style scoped>
  .parent:hover {
    color: var(--primary-action-color);
    border: 3.5px solid var(--primary-action-color);
  }
  
  .parent:hover div {
    color: var(--primary-color-light);
    background-color: var(--primary-action-color);
  }
</style>
