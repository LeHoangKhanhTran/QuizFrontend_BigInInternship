<script setup lang="ts">
import { computed, ref } from 'vue';
// import useFetch from '../composables/useFetch';
// import type { Topic } from '../types';
import clsx from 'clsx';
import { store } from '../../stores/store';
import type { Topic } from '../../types';
import { api } from '../../axios';
import type { AxiosError } from 'axios';

    const { topic } = defineProps<{
        topic?: Topic,
        title: string
    }>();

    const form = ref({
        title: topic ? topic.title : '',
        description: topic ? topic.description : ''
    });

    const handleSubmit = async () => {
        try {
            if (!topic) {
                const response = await api.post(`api/topics/`, form.value)
                if (response.status === 201) {
                    emits('submit')
                }
            }
            else {
                const response = await api.put(`api/topics/${topic.id}`, form.value)
                if (response.status === 204) {
                    emits('submit')
                }
            }
        }
        catch(err) {
            console.log(err as AxiosError)
        }
    }

    const emits = defineEmits(['submit', 'close']);

    const wrapperClasses = computed(() => clsx("relative w-[32%] min-w-[430px] h-fit rounded-[.75rem] flex flex-col items-start gap-7 p-8 text-white", {
        'bg-[var(--secondary-color)]': store.theme === 'dark',
        'bg-[var(--primary-color-dark)]': store.theme === 'light',
    }))

    const headingClasses = computed(() => clsx("font-semibold text-[1.55rem]", {
        'text-[var(--background-light)]': store.theme === 'dark',
        'text-white': store.theme === 'light',
    }))

    const formClasses = computed(() => clsx("flex flex-col gap-5 w-full", {
        'text-white': store.theme === 'light',
    }))

    const inputClasses = computed(() => clsx("w-full h-[2.5rem] rounded-[.625rem] px-4 border-[1px] focus:outline-none focus:border-[var(--primary-action-color)] focus:border-[2px] font-medium", {
        'bg-[var(--background-dark)]': store.theme === 'dark',
        'bg-[var(--primary-color-light)] text-[var(--secondary-color)]': store.theme === 'light',
    }))
     const textareaClasses = computed(() => clsx("w-full h-[8rem] rounded-[.625rem] px-4 py-2 border-[1px] focus:outline-none focus:border-[var(--primary-action-color)] focus:border-[2px] font-medium", {
        'bg-[var(--background-dark)]': store.theme === 'dark',
        'bg-[var(--primary-color-light)] text-[var(--secondary-color)]': store.theme === 'light',
    }))
    
</script>

<template>
    <div :class="wrapperClasses">
        <h2 :class="headingClasses">{{ title }}</h2>
        <img src="../../assets/close.svg" alt="close-icon" width="18" height="18" class="absolute top-9 right-8 cursor-pointer" @click="emits('close')">
        <form @submit.prevent="handleSubmit" :class="formClasses">
            <label for="" class="font-bold flex flex-col gap-3 w-full">
                Title
                <input type="text" :class="inputClasses" v-if="topic" v-model="form.title"/>
                <input type="text" :class="inputClasses" v-if="!topic" v-model="form.title"/>
                <!-- <p v-if="v$.email.$error" class="text-red-500 text-sm">
                    <span v-for="error in v$.email.$errors"> {{ error.$message }}</span>
                </p> -->
            </label>
            <label for="" class="font-bold flex flex-col gap-3 w-full">
                Description
                <textarea type="text" :class="textareaClasses" v-if="topic" v-model="form.description"/>
                <textarea type="text" :class="textareaClasses" v-if="!topic" v-model="form.description"/>
                <!-- <p v-if="v$.password.$error" class="text-red-500 text-sm">
                    <span v-for="error in v$.password.$errors"> {{ error.$message }}</span>
                </p> -->
            </label>
            <button 
                type="submit" 
                class="w-full py-3 bg-[var(--primary-action-color)] text-[1.15rem] font-bold rounded-[.75rem] mt-5 cursor-pointer hover:bg-[var(--primary-color-light)] hover:text-[var(--primary-action-color)]"
            >
                Submit
            </button>
        </form>
    </div>
</template>