<script setup lang="ts">
    import clsx from 'clsx';
    import { store } from '../stores/store';
    import { computed } from 'vue';
    import { type Topic } from '../types'; 
    import useFetch from '../composables/useFetch';

    const { data: topics } = useFetch<Topic[]>('/api/topics');

    const classes = computed(() => clsx("w-full rounded-[14px] p-5 flex justify-center items-center font-bold text-[1.25rem] cursor-pointer hover:text-[var(--primary-action-color)] tracking-wide", 
    {
        'bg-[var(--secondary-color)]': store.theme === 'dark',
        'bg-[var(--primary-color-light)]': store.theme === 'light',
    }))
    
</script>
<template>
    <main class="flex justify-between">
        <section class="flex-1/2 shrink-0">
            <h2 class="text-[2.8rem] mb-7 leading-14">
                Welcome to the 
                <em class="block font-bold">Software Development Quiz!</em>
            </h2>
            <p class="text-[1.1rem] italic">Pick a topic to get started</p> 
        </section>
        <section class="flex-1/2 shrink-0 pl-28 flex flex-col items-center gap-6">
            <div :class="classes" v-for="topic in topics" :key="topic.id" @click="store.user ? $router.push(`/topic/${topic.id}`) : $router.push('/login')">
                {{ topic.title }} 
            </div>
        </section>
    </main>
</template>