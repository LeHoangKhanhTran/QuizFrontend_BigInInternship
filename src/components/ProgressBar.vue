<script setup lang="ts">
    import { computed } from 'vue';
import { store } from '../stores/store';
import clsx from 'clsx';
    const classes = computed(() => clsx("absolute bottom-17 w-full h-3.5 rounded-[.75rem] flex items-center px-[6px] py-[3px]",
        {
          'bg-[var(--secondary-color)]': store.theme === 'dark',
          'bg-[var(--background-light)]': store.theme === 'light',
        }
    ))
</script>
<template>
    <div :class="classes">
        <span class="w-[60%] h-full rounded-[inherit] bg-[var(--primary-action-color)]"></span>
    </div>
</template>