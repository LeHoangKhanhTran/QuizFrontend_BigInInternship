<script setup lang="ts">
    import { ref, watch } from 'vue';
import Option from '../components/Option.vue';
import { api } from '../axios';
import type { AxiosError } from 'axios';
import type { Question } from '../types';

    const question = ref<Question | null>(null);
    const { questionId, choiceId, index, questionNumber } = defineProps<{
        questionId: string;
        choiceId: string;
        index: number;
        questionNumber: number;
    }>();

    watch(() => questionId, async () => {
            try {
                const response = await api.get(`http://localhost:5075/api/questions/${questionId}`);
                if (response.status === 200) {
                    question.value = response.data as Question;
                    console.log(question.value);
                } 
            }
            catch (error) {
                const axiosError = error as AxiosError;
                console.error(axiosError);
            }
        }, { immediate: true });
</script>

<template>
    <div class="flex flex-col gap-1 w-[85%]" v-if="question">
        <h4 class="font-medium text-[1.35rem] text-[var(--secondary-text-color)]">Question {{ index + 1 }} of {{ questionNumber }}:</h4>
        <p class="text-[1.4rem] font-semibold mb-3">{{ question.content }}</p>
        <ul class="flex flex-col gap-4">
            <Option v-for="choice, index in question.choices" :content="choice.content" :index="index" :have-pointer-events="false" :is-correct="choice.id === question.correctChoiceId ? true : choice.id === choiceId ? false : undefined" :key="choice.id">
                <p v-if="choice.id === choiceId && choiceId !== question.correctChoiceId" class="bg-[var(--primary-action-color)] text-[white] font-semibold w-fit px-2 py-[3.5px] rounded-md text-[.8rem] select-none">Your answer</p>
                <p v-if="choice.id === question.correctChoiceId" class="bg-[var(--correct-color)] text-[white] font-semibold w-fit px-2 py-[3.5px] rounded-md text-[.8rem] select-none">{{ choice.id !== choiceId ? "Correct answer" : "Your answer" }}</p>
            </Option>
        </ul> 
    </div>
</template>