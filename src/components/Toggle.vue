<script setup lang="ts">
import { computed } from 'vue';
import clsx from 'clsx';
import { store } from "../stores/store.ts";
const classes = computed(() => {
    return clsx(
        'absolute w-4 h-4 rounded-full bg-white transition-left duration-300 ease-in-out',
        {
            'left-[calc(100%-1.25rem)]': store.theme === 'dark',
            'left-1': store.theme === 'light',
        }
    );
}); 
const toggleDarkMode = () => {
    store.toggleTheme();
}
</script>

<template>
    <section class="flex gap-4" @click="toggleDarkMode">
        <img src="../assets/light-sun.svg" alt="light-sun">
        <div class="relative rounded-[1.25rem] w-[45px] h-6 bg-[var(--primary-action-color)] flex items-center cursor-pointer justify-center">
            <span :class="classes"></span>
        </div>
        <img src="../assets/light-moon.svg" alt="light-moon">
    </section>
</template>