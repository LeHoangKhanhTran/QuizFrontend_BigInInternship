<script setup lang="ts">
    import Option from '../components/Option.vue';
    import ProgressBar from '../components/ProgressBar.vue';
    import Button from '../components/Button.vue';
    import { computed, onMounted, ref } from 'vue';
    import { api } from '../axios';
    import { useRoute, useRouter } from 'vue-router';
    import type { AxiosError } from 'axios';
    import type { Answer, Question, Record } from '../types';
    import { store } from '../stores/store';

    const selectedId = ref("");
    const questions = ref<Question[]>([]);
    const currentIndex = ref(0);
    const router = useRouter();
    const progress = computed(() => {
        return (currentIndex.value + 1) / questions.value.length * 100;
    });
    const answers = ref<Answer[]>([]);  
    const open = ref(false)

    const createRecord = async () => {
        open.value = true;
        try {
            const response = await api.post('/api/records', {
                topicId: route.params.id,
                userId: store.user?.id,
                answers: answers.value,
            });
            setTimeout(() => {
                if (response.status === 201) {
                const record = response.data as Record;
                router.push(`/result/${record.id}`);
                }
                open.value = false;
            }, 2000); 
        } 
        catch (error) {
            const axiosError = error as AxiosError;
            console.error(axiosError);
        }
    }
    const handlePick = (id: string) => {
        selectedId.value = id;
    }

    const handleClick = async() => {
        if (currentIndex.value <= questions.value.length - 1) {
            currentIndex.value++;
            answers.value.push({
                questionId: questions.value[currentIndex.value - 1].id,
                choiceId: selectedId.value,
            });
            selectedId.value = "";
            if (currentIndex.value > questions.value.length - 1) {
                await createRecord();
            }
        }
    }

    const route = useRoute();
    onMounted(async () => {
        const fetchQuestions = async () => {
            try {
                const response = await api.get(`/api/questions?topicId=${route.params.id}`); 
                if (response.status === 200) {
                    questions.value = response.data as Question[]; 
                } 
            }
            catch (error) {
                const axiosError = error as AxiosError;
                console.error(axiosError);
            }
        }   
        await fetchQuestions();
    })

</script>
<template>
    <main class="flex justify-between">
        <section class="relative flex-1/2 shrink-0 flex flex-col" v-if="questions.length > 0 && currentIndex < questions.length">
            <h3 class="text-[1.2rem] mb-5 italic text-[var(--secondary-text-color)] font-semibold">
                Question {{ currentIndex + 1 }} of {{ questions.length }}
            </h3>
            <p class="text-[2.25rem] font-medium">{{ questions[currentIndex].content }}</p>
            <ProgressBar :progress="progress"/>
        </section>

        <section class="flex-1/2 shrink-0 pl-28 flex flex-col items-center gap-6" v-if="questions[currentIndex]">
            <Option v-for="option, index in questions[currentIndex].choices" @click="() => handlePick(option.id)" :is-active="selectedId===option.id" :content="option.content" :index="index"/>
            <Button :name="currentIndex < questions.length - 1 ? 'Next Question' : 'Submit'" @click="handleClick" :is-active="selectedId.length !== 0"/>
        </section>
        <Teleport to="body">
            <div class="fixed top-0 left-0 w-full h-full bg-[rgba(255,255,255,.6)] flex flex-col justify-center items-center z-50 gap-4" v-if="open">
              <div class="spinner"></div>
              <p class="text-[var(--primary-action-color)] text-2xl font-bold">Recording your answers, please wait...</p>
            </div>
        </Teleport>
    </main>
</template>

<style scoped>
    .spinner {
        border: 5px solid white;
        border-top: 5px solid var(--primary-action-color);
        border-radius: 50%;
        width: 3rem;
        height: 3rem;
        animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>