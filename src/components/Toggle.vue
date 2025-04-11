<script setup lang="ts">
import { computed } from 'vue';
import clsx from 'clsx';
    import { store } from "../stores/store.ts";
    import lightSun from '../assets/light-sun.svg';
    import lightMoon from '../assets/light-moon.svg';
    import darkMoon from '../assets/dark-moon.svg';
    import darkSun from '../assets/dark-sun.svg';

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
    <section class="flex gap-4">
        <img :src="store.theme === 'dark' ? lightSun : darkSun" :alt="store.theme === 'dark' ? 'light-sun' : 'dark-sun'">
        <div class="relative rounded-[1.25rem] w-[45px] h-6 bg-[var(--primary-action-color)] flex items-center cursor-pointer justify-center" @click="toggleDarkMode">
            <span :class="classes"></span>
        </div>
        <img :src="store.theme === 'dark' ? lightMoon : darkMoon" alt="store.theme === 'dark' ? 'light-moon' : 'dark-moon'">
    </section>
</template>