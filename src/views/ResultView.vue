<script setup lang="ts">
import Button from '../components/Button.vue';
import clsx from 'clsx';
import { store } from '../stores/store';
import { computed } from 'vue';

const classes = computed(() => clsx("w-full h-fit flex flex-col p-11 justify-between items-center rounded-[14px] gap-8 border-[2px] border-[var(--primary-action-color)]",
    {
        'bg-[var(--secondary-color)]': store.theme === 'dark',
        'bg-[var(--primary-color-light)]': store.theme === 'light',
    }
))
</script>
<template>
    <main class="flex justify-between">
        <section class="flex-1/2 shrink-0">
            <h2 class="text-[3.4rem] leading-17">
                Quiz completed
                <span class="block font-bold">You scored...</span>
            </h2>
        </section>
        <section class="flex-1/2 shrink-0 pl-28 flex flex-col items-center gap-6">
            <div :class="classes">
                <h3 class="text-2xl font-bold text-center">Vue.js - The Progressive JavaScript Framework</h3>
                <div class="flex flex-col gap-3">
                    <p class="text-8xl font-bold text-center">8</p>
                    <p class="text-[var(--secondary-text-color)] font-medium text-[1.2rem] text-center">out of 10</p>
                </div>
            </div>
            <Button name="Review"/>
            <p class="w-full rounded-[.875rem] py-4 flex justify-center font-bold text-[1.4rem] hover:text-[var(--primary-action-color)] 
                      cursor-pointer border-[3px] border-[var(--primary-action-color)] hover:border-[var(--primary-color-light)]">
                Take quiz again
            </p>
        </section>
    </main>
</template>