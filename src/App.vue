<script setup lang="ts">
  import Header from './components/Header.vue';
  import HomeView from './views/HomeView.vue';
  import { store } from "./stores/store.ts";
  import clsx from 'clsx';
  import { computed } from 'vue';
  import darkBgCircle from './assets/dark-bg-circle.svg';
  import lightBgCircle from './assets/light-bg-circle.svg';
  const classes = computed(() => {
      return clsx(
          'w-fit h-git min-w-full min-h-full absolute top-0 left-0 px-24 py-10 z-0',
          {
              'bg-[var(--primary-color-dark)] text-[var(--primary-text-color)]': store.theme === 'dark',
              'bg-[var(--primary-color-light)] text-[var(--secondary-color)]': store.theme === 'light',
          }
      );
  });

  const bgUrl = computed(() => {
      return store.theme === 'dark' ? darkBgCircle : lightBgCircle;
  });
</script>

<template >
  <div :class="classes">
    <img :src="bgUrl" class="fixed z-[-1] box-border rotate-45 top-[-26%]" alt="bg-circle">
    <Header/>
    <img :src="bgUrl" class="fixed z-[-1] box-border rotate-[230deg] bottom-[-28%] right-[2%]" alt="bg-circle">
    <HomeView/>
  </div>
</template>


