<script setup lang="ts">
    interface Props {
        name: string
    }

    const { name } = defineProps<Props>();
</script>

<template>
    <button 
        class="w-full flex items-center justify-center rounded-[.875rem] py-4 bg-[var(--primary-action-color)] font-semibold text-[1.4rem] 
               text-[var(--primary-color-light)] cursor-pointer hover:text-[var(--primary-action-color)] hover:bg-[var(--primary-color-light)]">
        {{ name }}
    </button>
</template>