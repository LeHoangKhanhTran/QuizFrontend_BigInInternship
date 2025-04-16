<script setup lang="ts">
    import TopicForm from '../forms/TopicForm.vue';
    import useFetch from '../../composables/useFetch';
    import { useToast } from '../../composables/useToast';
    import type { Topic } from '../../types';
    import { ref, watch } from 'vue';
    import type { AxiosError } from 'axios';
    import { api } from '../../axios';

    const { fetchData, data: topics } = useFetch<Topic[]>('api/topics');
    const shouldFetch = ref(false);
    const { show, toggleShow } = useToast();
    const pickedTopic = ref<Topic>();
    const handleUpdateClick = (topic: Topic) => {
        pickedTopic.value = topic;
        toggleShow();
    };  
    const handleClose = () => {
        toggleShow();
        pickedTopic.value = undefined
    }

    const handleDelete = async (id: string) => {
        try {
            await api.delete(`api/topics/${id}`)
        }
        catch(err) {
            console.log(err as AxiosError)
        }
    }

    watch(shouldFetch, async () => {
       if (shouldFetch) {
        await fetchData();
        shouldFetch.value = false;
       }
    })
    
</script>

<template>
    <div class="mt-7 w-full flex justify-end">
            <button
                class="p-2 w-[11rem] bg-[var(--primary-action-color)] font-semibold rounded-[.5rem] hover:bg-[var(--primary-color-light)] hover:text-[var(--primary-action-color)]"
                @click="toggleShow">
                Add new topic 
                <span class="font-bold text-[1.3rem] ml-2">+</span>
            </button>
        </div>
        <table class="w-full border border-white mt-3 rounded-[.5rem]">
            <thead>
                <tr>
                    <th>Topic</th>
                    <th>Description</th>
                    <th class="w-[17rem]">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="topic in topics">
                    <td class="min-w-[25rem]">{{ topic.title }}</td>
                    <td>{{ topic.description }}</td>
                    <td>
                        <div class="flex flex-col gap-3 items-center">
                            <button 
                                class="p-2 w-[11rem] bg-[var(--correct-color)] font-semibold rounded-[.5rem] hover:bg-[var(--primary-color-light)] hover:text-[var(--correct-color)]"
                                @click="() => handleUpdateClick(topic)">
                                Update topic
                            </button>
                            <button 
                                class="p-2 w-[11rem] bg-[var(--wrong-color)] font-semibold rounded-[.5rem] hover:bg-[var(--primary-color-light)] hover:text-[var(--wrong-color)]"
                                @click="async() => {await handleDelete(topic.id); shouldFetch=true}">
                                Delete topic
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>   
        <Teleport to="body">
            <div class="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,.7)] flex flex-col justify-center items-center z-50 gap-4" v-if="show">
              <TopicForm :topic="pickedTopic" @close="handleClose" :title="pickedTopic ? 'Update topic' : 'Add new topic'" @submit="() => {handleClose(); shouldFetch=true}"/>
            </div>
        </Teleport>
</template>

<style>
    table {
        border-radius: .5rem;
        border-style: hidden;
        box-shadow: 0 0 0 1.5px white;
    }
    th {
        font-size: 1.2rem;
    }

    th, tr, td{
        border: 2px solid white;
        padding: .9rem 1rem;
        border-radius: inherit;
    }

    td {
        font-size: 1.05rem;
        font-weight: 500;
    }

    button {
        cursor: pointer;
    }
</style>