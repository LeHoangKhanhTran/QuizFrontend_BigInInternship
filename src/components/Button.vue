<script setup lang="ts">
import clsx from 'clsx';
import { computed } from 'vue';

    interface Props {
        name: string,
        isActive?: boolean,
    }

    const { name, isActive=true } = defineProps<Props>();
    const classes = computed(() => clsx("relative w-full flex items-center justify-center rounded-[.875rem] py-4 bg-[var(--primary-action-color)] font-semibold text-[1.4rem] text-[var(--primary-color-light)] cursor-pointer",
        {
            'hover:text-[var(--primary-action-color)] hover:bg-[var(--primary-color-light)]': isActive,
            'after:absolute after:bg-black after:w-full after:h-full after:opacity-40 after:rounded-[inherit] cursor-not-allowed pointer-events-none': !isActive,
        }
    ))
</script>

<template>
    <button 
        :class="classes">
        {{ name }}
    </button>
</template>