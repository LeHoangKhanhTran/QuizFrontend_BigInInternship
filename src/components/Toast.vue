<script setup lang="ts">
    import checkIcon from '../assets/check-icon.svg';
    import xIcon from '../assets/x-icon.svg';

    const { message, type } = defineProps<{
        message: string,
        type: 'success' | 'error',
        statusCode?: number,
        onBtnClick: () => void
    }>();

    
</script>

<template>
    <div class="fixed w-full h-full flex justify-center items-center top-0 left-0">
        <div class="max-w-[30rem] max-h-[18rem] flex flex-col p-8 bg-[var(--background-dark)] rounded-[.675rem] justify-center items-center gap-5">
            <section class="flex flex-col items-center gap-1">
                <img :src="type === 'success' ? checkIcon : xIcon" alt="icon" class="w-[3.5rem] h-[3.5rem]">
                <b v-if="statusCode" class="text-[1.7rem]" :class="type === 'success' ? 'text-[var(--correct-color)]' : 'text-[var(--wrong-color)]'">{{ statusCode }}</b>
            </section>
            <p class="text-white font-medium text-[1.2rem] text-center">{{ message }}</p>
            <button 
                class="px-10 py-2 rounded-[.5rem] text-white font-semibold cursor-pointer" :class="type === 'success' ? 'bg-[var(--correct-color)] hover:bg-white hover:text-[var(--correct-color)]' : 'bg-[var(--wrong-color)] hover:bg-white hover:text-[var(--wrong-color)]'"
                @click="onBtnClick"
            >
                Got it
            </button>
        </div>
    </div>
</template>