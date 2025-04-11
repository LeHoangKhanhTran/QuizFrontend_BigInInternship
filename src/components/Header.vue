<script setup lang="ts">
    import Toggle from './Toggle.vue';
    import { store } from '../stores/store';
    import { onMounted, ref } from 'vue';
    import { api } from '../axios';
    import { router } from '../router/router';
    import type { AxiosError } from 'axios';

    const isActive = ref(false);

    const LogOut = async() => {
        try {
            const response = await api.post('/api/auth/logout');
            if (response.status === 200) {
                store.setUser(null);
                router.push('/login');
            }
        }
        catch (error) {
            const axiosError = error as AxiosError;
            console.error(axiosError);
        }
    }

    onMounted(() => {
        document.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (!target.closest('.username')) {
                isActive.value = false;
            }
        });
    })
</script>
<template>
    <nav class="relative flex justify-between mb-18 z-100">
        <router-link to="/" class="flex gap-3 items-center">
            <img src="../assets/vue.svg" alt="Logo" class="logo" width="36"/>
            <h1 class="text-[1.25rem] font-bold">Software Development Quiz with Vue</h1>
        </router-link>
        <div class="flex items-center gap-14 text-[1.1rem] font-bold" v-if="store.user === null && !store.userLoading">
            <router-link to="/login" class="hover:text-[var(--primary-action-color)]" :class="$route.path === '/login' ? 'text-[var(--primary-action-color)]' : ''">Login</router-link>
            <router-link to="/register" class="hover:text-[var(--primary-action-color)]" :class="$route.path === '/register' ? 'text-[var(--primary-action-color)]' : ''">Register</router-link>
            <Toggle/>
        </div>
        <div class="flex items-center gap-14 text-[1.15rem] font-bold" v-if="store.user !== null && !store.userLoading">
            <div class="relative font-semibold username">
                <p class="cursor-pointer select-none" @click="isActive=!isActive" :class="isActive ? 'text-[var(--primary-action-color)]' : 'text-inherit'">{{ store.user.email }}</p>
                <ul class="w-[7rem] flex flex-col items-center absolute top-[calc(100%+5px)] left-[calc((100%-7rem)/2)] bg-[var(--primary-action-color)] font-medium px-3 py-4 rounded-[.625rem] gap-3 text-white" v-show="isActive">
                    <li class="cursor-pointer" @click="isActive=!isActive">
                        <router-link :to="`/user/${store.user.id}/history`">History</router-link>
                    </li>
                    <li class="cursor-pointer" @click="LogOut">
                        Log out
                    </li>
            </ul>
            </div>
            <Toggle/>
        </div>
    </nav>
</template>