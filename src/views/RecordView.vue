<script setup lang="ts">
    import { onMounted } from 'vue';
    import RecordSection from '../components/RecordSection.vue';

    const createdAt = new Date("2025-03-19T04:06:07.919923");
    const formattedDate = createdAt.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    onMounted(() => {
        window.scroll({
            top: 120,
            behavior: "smooth",
        });
    })
</script>
<template>
    <main class="w-full flex flex-col items-center justify-center">
        <div class="w-fit h-fit px-22 flex flex-col items-center gap-8">
            <header class="flex flex-col gap-3 items-center">
                <h3 class="font-bold text-[1.8rem] flex gap-2"><span>Topic:</span>Vue.js - The Progressive JavaScript Framework</h3>
                <div class="w-full flex justify-center gap-11">
                    <p class="text-[1.35rem]">Score <span class="font-bold text-[var(--primary-action-color)]">7</span> of 10</p>
                    <p class="text-[1.35rem]"><em class="text-[var(--correct-color)] font-semibold">70%</em> correct</p>
                    <p class="text-[1.35rem]"><em class="text-[var(--wrong-color)] font-semibold">30%</em> incorrect</p>
                </div>
                <p class="text-[var(--secondary-text-color)] text-[1.1rem]">This record is created at <span>{{ formattedDate }}</span> </p>
            </header>
            <section class="flex flex-col gap-10 items-start">
                <RecordSection/>
            </section>
            <section class="flex w-full justify-between">
                <button class="w-[14rem] py-3 bg-[var(--secondary-color)] text-[1.1rem] font-bold rounded-[10px] cursor-pointer hover:text-[var(--secondary-color)] hover:bg-[var(--primary-color-light)]">Previous Question</button>
                <button class="w-[14rem] py-3 bg-[var(--primary-action-color)] text-[1.1rem] font-bold rounded-[10px] cursor-pointer hover:text-[var(--primary-action-color)] hover:bg-[var(--primary-color-light)]">Next question</button>
            </section>
        </div>
        <!-- <em class="mt-11 text-[1.25rem] font-semibold">End of quiz record!</em> -->
    </main>
</template>

<style scoped>
    p {
        font-weight: 500;
    }
</style>
