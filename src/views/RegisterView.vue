<script setup lang="ts">
    import { computed } from 'vue';
    import { store } from '../stores/store';
    import clsx from 'clsx';

    const wrapperClasses = computed(() => clsx("w-[32%] min-w-[430px] h-fit rounded-[.75rem] flex flex-col items-center gap-7 px-8 py-10", {
        'bg-[var(--secondary-color)]/65': store.theme === 'dark',
        'bg-[var(--primary-color-dark)]/65': store.theme === 'light',
    }))

    const headingClasses = computed(() => clsx("font-semibold text-[1.55rem]", {
        'text-[var(--background-light)]': store.theme === 'dark',
        'text-white': store.theme === 'light',
    }))

    const formClasses = computed(() => clsx("flex flex-col gap-5 w-full", {
        'text-white': store.theme === 'light',
    }))

    const inputClasses = computed(() => clsx("w-full h-[2.5rem] rounded-[.625rem] px-4 border-[1px] focus:outline-none focus:border-[var(--primary-action-color)] focus:ring-0 font-normal", {
        'bg-[var(--background-dark)]/50': store.theme === 'dark',
        'bg-[var(--primary-color-light)] text-[var(--secondary-color)]': store.theme === 'light',
    }))
</script>

<template>
    <main class="w-full h-full flex items-center justify-center">
        <div :class="wrapperClasses">
            <h2 :class="headingClasses">Create an account</h2>
            <form action="" :class="formClasses">
                <label for="" class="font-bold text-[1.05rem] flex flex-col gap-3 w-full">
                    Email / Username
                    <input type="text" :class="inputClasses"/>
                </label>
                <label for="" class="font-bold text-[1.05rem] flex flex-col gap-3 w-full">
                    Password
                    <input type="password" :class="inputClasses">
                </label>
                <label for="" class="font-bold text-[1.05rem] flex flex-col gap-3 w-full">
                    Confirm Password
                    <input type="password" :class="inputClasses">
                </label>
                <button type="submit" class="w-full py-3 bg-[var(--primary-action-color)] text-[1.15rem] font-bold rounded-[.75rem] mt-5">Register now</button>
            </form>
        </div>
    </main>
</template>