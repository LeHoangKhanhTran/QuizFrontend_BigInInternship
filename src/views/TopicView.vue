<script setup lang="ts">
    import Button from '../components/Button.vue';
</script>

<template>
    <main class="flex flex-col justify-center items-center gap-4">
        <h2 class="font-bold text-[2.5rem]">Vue.js - The Progressive JavaScript Framework</h2>
        <p class="font-medium text-[1.35rem] text-center text-[var(--secondary-text-color)]">Vue.js is an approachable, performant and versatile framework for building web user interfaces. This topic will provide you questions about this framework.</p>
        <div class="flex flex-col gap-3 w-[35%] mt-2">
            <p class="text-8xl font-bold text-center">8</p>
            <p class="font-semibold text-[1.35rem] text-center">questions in total</p>
            <Button class="mt-6" name="Start now" @click="$router.push('/topic/1/quiz')"/>
        </div>
    </main>
</template>