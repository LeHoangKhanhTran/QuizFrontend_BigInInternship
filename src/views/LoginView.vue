<script setup lang="ts">
    import { computed, ref } from 'vue';
    import { store } from '../stores/store';
    import clsx from 'clsx';
    import { helpers, minLength, required } from '@vuelidate/validators';
    import useVuelidate from "@vuelidate/core";
    import { api } from '../axios';
    import type { AxiosError } from 'axios';
    import { router } from '../router/router';
    import type { User } from '../types';
    const form = ref({
        email: '',
        password: ''
    })

    const rules = {
        email: {
            required: helpers.withMessage('Email/Username is required', required),
            minLength: helpers.withMessage('Email/Username must be at least 3 characters', minLength(3)),
        },
        password: {
            required: helpers.withMessage('Password is required', required),
            minLength: helpers.withMessage('Password must be at least 8 characters', minLength(8)),
        },
    }

    const v$ = useVuelidate(rules, form)

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

    const inputClasses = computed(() => clsx("w-full h-[2.5rem] rounded-[.625rem] px-4 border-[1px] focus:outline-none focus:border-[var(--primary-action-color)] focus:border-[2px] font-medium", {
        'bg-[var(--background-dark)]/50': store.theme === 'dark',
        'bg-[var(--primary-color-light)] text-[var(--secondary-color)]': store.theme === 'light',
    }))

    const handleClick = async() => {
        const isValid = await v$.value.$validate();
        if (isValid) {
            try {
                store.userLoading = true;
                const response = await api.post('/api/auth/login', form.value);
                if (response.status === 200) {
                    store.setUser(response.data as User);
                    store.userLoading = false;
                    router.push('/');
                }
            }
            catch(error) {
                const axiosError = error as AxiosError;
                console.error(axiosError);
            }
            finally {
                store.userLoading = false;
            }
        } 
    }
</script>

<template>
    <main class="w-full h-full flex items-center justify-center">

        <div :class="wrapperClasses">
            <img src="../assets/vue.svg" alt="vue-logo">
            <h2 :class="headingClasses">Login to your account</h2>
            <form @submit.prevent="handleClick" :class="formClasses">
                <label for="" class="font-bold flex flex-col gap-3 w-full">
                    Email / Username
                    <input type="text" :class="inputClasses" v-model.trim="form.email"/>
                    <p v-if="v$.email.$error" class="text-red-500 text-sm">
                        <span v-for="error in v$.email.$errors"> {{ error.$message }}</span>
                    </p>
                </label>
                <label for="" class="font-bold flex flex-col gap-3 w-full">
                    Password
                    <input type="password" :class="inputClasses" v-model="form.password">
                    <p v-if="v$.password.$error" class="text-red-500 text-sm">
                        <span v-for="error in v$.password.$errors"> {{ error.$message }}</span>
                    </p>
                </label>
                <button 
                type="submit" 
                class="w-full py-3 bg-[var(--primary-action-color)] text-[1.15rem] font-bold rounded-[.75rem] mt-6 cursor-pointer hover:bg-[var(--primary-color-light)] hover:text-[var(--primary-action-color)]" 
                >
                    Login now
                </button>
            </form>
        </div>
    </main>
</template>