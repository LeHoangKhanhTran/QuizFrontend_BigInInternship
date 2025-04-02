<script setup lang="ts">
import clsx from 'clsx';
import { store } from '../stores/store';

const classes = clsx("w-full rounded-[14px] p-5 bg-[var(--secondary-color)] flex justify-center items-center font-bold text-[1.25rem] cursor-pointer hover:text-[var(--primary-action-color)]",
    {
        'bg-[var(--secondary-color)]': store.theme === 'dark',
        'bg-[var(--primary-color-light)]': store.theme === 'light',
    }
)
</script>
<template>
    <main class="flex justify-between">
        <section class="flex-1/2 shrink-0">
            <h2 class="text-[2.8rem] mb-7 leading-14">
                Welcome to the 
                <span class="block font-bold">Software Development Quiz!</span>
            </h2>
            <p class="text-[1.1rem] italic">Pick a topic to get started</p> 
        </section>
        <section class="flex-1/2 shrink-0 pl-28 flex flex-col items-center gap-6">
            <div :class="classes" @click="$router.push('/topic/1')">
                Vue.js - The Progressive JavaScript Framework  
            </div>
            <div class="w-full rounded-[14px] p-5 bg-[var(--secondary-color)] flex justify-center items-center font-bold text-[1.25rem] cursor-pointer hover:text-[var(--primary-action-color)]">
                Vue.js - The Progressive JavaScript Framework  
            </div>
            <div class="w-full rounded-[14px] p-5 bg-[var(--secondary-color)] flex justify-center items-center font-bold text-[1.25rem] cursor-pointer hover:text-[var(--primary-action-color)]">
                Vue.js - The Progressive JavaScript Framework  
            </div>
            <div class="w-full rounded-[14px] p-5 bg-[var(--secondary-color)] flex justify-center items-center font-bold text-[1.25rem] cursor-pointer hover:text-[var(--primary-action-color)]">
                Vue.js - The Progressive JavaScript Framework  
            </div>
        </section>
    </main>
</template>