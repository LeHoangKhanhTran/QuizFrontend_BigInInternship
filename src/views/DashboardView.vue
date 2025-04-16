<script setup lang="ts">
    import { ref } from 'vue';
    import TopicTable from '../components/table-views/TopicTable.vue'
    import QuestionTable from '../components/table-views/QuestionTable.vue';

    const subject = ref<string>('Topic');
    
</script>

<template>
    <main>
        <h2 class="text-4xl font-bold mb-5">Dashboard</h2>
        <div class="flex gap-7 text-[1.2rem]">
            <section class="font-bold cursor-pointer" :class="subject === 'Topic' ? 'text-[var(--primary-action-color)]' : ''" @click="() => subject = 'Topic'">
                <p>Topics</p>
                <hr class="border-[1px] height-[1px]" v-show="subject === 'Topic'">
            </section>
            <section class="font-bold cursor-pointer" :class="subject === 'Question' ? 'text-[var(--primary-action-color)]' : ''" @click="subject = 'Question'">
                <p>Questions</p>
                <hr class="border-[1px] height-[1px]" v-show="subject === 'Question'">
            </section>
        </div>
        <TopicTable v-if="subject === 'Topic'"/>
        <QuestionTable v-if="subject === 'Question'"/>
    </main>
</template>
