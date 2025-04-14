<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import Button from '../components/Button.vue';
    import type { Topic } from '../types';
    import useFetch from '../composables/useFetch';

    const route = useRoute(); 
    const { data: topic } = useFetch<Topic>(`/api/topics/${route.params.id}`);
</script>

<template>
    <main class="flex flex-col justify-center items-center gap-4" v-if="topic">
        <h2 class="font-bold text-[2.5rem]">{{ topic.title }}</h2>
        <p class="font-medium text-[1.35rem] text-center text-[var(--secondary-text-color)]">{{ topic.description }}</p>
        <div class="flex flex-col gap-3 w-[35%] mt-2">
            <p class="text-8xl font-bold text-center">{{ topic.questions ? topic.questions.length : 0 }}</p>
            <p class="font-semibold text-[1.35rem] text-center">questions in total</p>
            <Button class="mt-6" name="Start now" @click="$router.push(`/topic/${topic.id}/quiz`)"/>
        </div>
    </main>
</template>
