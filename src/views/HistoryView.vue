<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import HistoryCard from '../components/HistoryCard.vue';
  import type { Record } from '../types';
  import type { AxiosError } from 'axios';
  import { api } from '../axios';
import { useRoute } from 'vue-router';

  const records = ref<Record[]>([]);
  const route = useRoute();
  onMounted(async () => {
    const fetchRecords = async () => {
      try {
        const response = await api.get(`/api/records?userId=${route.params.id}`); 
        console.log(response)
        if (response.status === 200) {
          records.value = response.data as Record[];
        }
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error(axiosError);
      }
    };
    await fetchRecords();
  });
</script>

<template>
  <main>
    <h2 class="text-4xl font-bold mb-8">Your quiz history</h2>
    <section class="flex flex-col gap-5" v-if="records.length > 0">
      <HistoryCard v-for="record in records" :record="record"/>
    </section>
    <div class="text-[1.05rem]" v-if="records.length === 0">You do not have any quiz record.<span class="text-[var(--primary-action-color)] font-semibold hover:underline cursor-pointer ml-1" @click="$router.push('/')">Pick a topic</span> and take a quiz!</div>
  </main>
</template>

