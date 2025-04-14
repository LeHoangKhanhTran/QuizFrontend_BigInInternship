<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';
    import RecordSection from '../components/RecordSection.vue';
    import { useRoute } from 'vue-router';
    import type { AxiosError } from 'axios';
    import { api } from '../axios';
    import type { Record, User } from '../types';
    import clsx from 'clsx';
    import { formatDate } from '../utils';
        const record = ref<Record | null>(null);
        const user = ref<User | null>(null);
        const answerIndex = ref(0);
        const route = useRoute();
        const buttonSectionClasses = computed(() => clsx("flex w-full", 
            {
                'justify-between': answerIndex.value > 0 && record.value && answerIndex.value < record.value.answers.length - 1,
                'justify-center': answerIndex.value === 0 || (record.value && answerIndex.value === record.value?.answers.length - 1),
            }
        ))

        const handleClick = (action: "Prev" | "Next") => {
            if (action === "Prev") {
                if (answerIndex.value > 0) {
                    answerIndex.value--;
                }
            }
            else if (action === "Next") {
                if (record.value && answerIndex.value < record.value.answers.length - 1) {
                    answerIndex.value++;
                }
            }
        }

        onMounted(async() => {
            const fetchRecord = async () => {
                try {
                    const response = await api.get(`/api/records/${route.params.id}`); 
                    if (response.status === 200) {
                        record.value = response.data as Record; 
                        await fetchUserInfo(record.value.userId).then((userData) => {
                            user.value = userData as User;
                        })
                    } 
                }
                catch (error) {
                    const axiosError = error as AxiosError;
                    console.error(axiosError);
                }
            }
            const fetchUserInfo = async (id: string) => {
                try {
                    const response = await api.get(`/api/users/${id}`); 
                    if (response.status === 200) {
                        return response.data;
                    } 
                }
                catch (error) {
                    const axiosError = error as AxiosError;
                    console.error(axiosError);
                }
            }
            await fetchRecord();
            window.scroll({
                top: 120,
                behavior: "smooth",
            });
        })
</script>
<template>
    <main class="w-full flex flex-col items-center justify-center" v-if="record">
        <div class="w-[70%] h-fit min-w-fit px-22 flex flex-col items-center gap-8">
            <header class="flex flex-col gap-3 items-center">
                <h3 class="font-bold text-[2rem] flex gap-2"><span>Topic:</span>{{ record.topic.title }}</h3>
                <div class="w-full flex justify-center gap-11">
                    <p class="text-[1.35rem]">Score <span class="font-bold text-[var(--primary-action-color)]">{{ record.score }}</span> of {{ record.answers.length }}</p>
                    <p class="text-[1.35rem]"><span class="text-[var(--correct-color)] font-semibold">{{ Math.round(record.score / record.answers.length * 100)}}%</span> correct</p>
                    <p class="text-[1.35rem]"><span class="text-[var(--wrong-color)] font-semibold">{{ (100 - Math.floor(record.score / record.answers.length * 100)) }}%</span> incorrect</p>
                </div>
                <p class="text-[var(--secondary-text-color)] text-[1.1rem]">This record is created at <span>{{ formatDate(record.createdDate) }}</span> by <em v-if="user" class="text-[var(--primary-action-color)] font-bold">{{ user.email }}</em></p>
            </header>
            <section class="flex flex-col gap-10 items-center w-full max-w-[46rem]">
                <RecordSection :question-id="record.answers[answerIndex].questionId" :question-number="record.answers.length" :choice-id="record.answers[answerIndex].choiceId" :index="answerIndex"/>
            </section>
            <section :class="buttonSectionClasses">
                <button class="w-[15rem] py-3 text-[var(--primary-color-light)] bg-[var(--secondary-color)] text-[1.2rem] font-bold rounded-[10px] cursor-pointer hover:text-[var(--secondary-color)] hover:bg-[var(--primary-color-light)]" v-show="answerIndex > 0" @click="() => handleClick('Prev')">Previous Question</button>
                <button class="w-[15rem] py-3 text-[var(--primary-color-light)] bg-[var(--primary-action-color)] text-[1.2rem] font-bold rounded-[10px] cursor-pointer hover:text-[var(--primary-action-color)] hover:bg-[var(--primary-color-light)]" v-show="answerIndex < record.answers.length - 1" @click="() => handleClick('Next')">Next question</button>
            </section>
            <em class=" text-[1.25rem] font-semibold" v-show="answerIndex === record.answers.length - 1">End of quiz record!</em>
        </div>
    </main>
</template>

<style scoped>
    p {
        font-weight: 500;
    }
</style>
