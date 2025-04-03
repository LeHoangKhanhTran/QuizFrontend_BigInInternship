<script setup lang="ts">
    import Option from '../components/Option.vue';
    import ProgressBar from '../components/ProgressBar.vue';
    import Button from '../components/Button.vue';
    import { ref } from 'vue';
    const selectedId = ref("0");
    const progress = ref(0);

    const handlePick = (id: string) => {
        selectedId.value = id;
    }

    const handleClick = () => {
        progress.value += 10;
    }
</script>
<template>
    <main class="flex justify-between">
        <section class="relative flex-1/2 shrink-0 flex flex-col">
            <h3 class="text-[1.2rem] mb-5 italic text-[var(--secondary-text-color)] font-semibold">
                Question 1 of 10
            </h3>
            <p class="text-[2.25rem] font-medium">Which HTTP methods are commonly used in a REST API?</p>
            <ProgressBar :progress="progress"/>
        </section>
        <section class="flex-1/2 shrink-0 pl-28 flex flex-col items-center gap-6">
            <Option :index="0" @click="() => handlePick('0')" :is-active="selectedId==='0'"/>
            <Option :index="1" @click="() => handlePick('1')" :is-active="selectedId==='1'"/>       
            <Option :index="2" @click="() => handlePick('2')" :is-active="selectedId==='2'"/>
            <Option :index="3" @click="() => handlePick('3')" :is-active="selectedId==='3'"/>
            <Button name="Next question" @click="handleClick"/>
        </section>
    </main>
</template>