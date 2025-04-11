<script setup lang="ts">
    import { computed } from 'vue';
    import ProgressCircle from '../components/ProgressCircle.vue';
    import { store } from '../stores/store';
    import clsx from 'clsx';
    import type { Record } from '../types';
    import { formatDate } from '../utils';
    const classes = computed(() => clsx("flex px-11 py-6 rounded-[.75rem] gap-10", {
        'bg-[var(--secondary-color)] text-[var(--primary-color-light)]': store.theme === 'dark',
        'bg-[var(--primary-color-light)] text-[var(--secondary-color)]': store.theme === 'light',
    }))

    const { record } = defineProps<{
        record: Record
    }>();
</script>

<template>
    <div :class="classes" v-if="record">
       <section class="flex flex-col items-center gap-4 shrink-0">
         <ProgressCircle :size="80" :target-progress="Math.round(record.score / record.answers?.length * 100)"/>
         <button 
            class="bg-[var(--primary-action-color)] text-[var(--primary-color-light)] font-bold px-8 py-2 rounded-[.5rem] cursor-pointer 
                   hover:bg-[var(--primary-color-light)] hover:text-[var(--primary-action-color)]" 
            @click="$router.push(`/record/${record.id}`)"
         >View details</button>
       </section>
       <section class="flex flex-col justify-between">
            <div>
                <h3 class="font-bold text-2xl mb-2">{{ record.topic.title }}</h3>
                <p>{{ record.topic.description }}</p>
            </div>
            <em class="text-[var(--secondary-text-color)] font-medium">{{ formatDate(record.createdDate) }}</em>
       </section>
    </div>
</template>