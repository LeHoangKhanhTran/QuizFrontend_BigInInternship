<script setup lang="ts">
    import Toggle from './Toggle.vue';
</script>
<template>
    <nav class="flex justify-between mb-15 z-1">
        <router-link to="/" class="flex gap-3 items-center">
            <img src="../assets/vue.svg" alt="Logo" class="logo" width="36"/>
            <h1 class="text-[1.25rem] font-bold">Software Development Quiz with Vue</h1>
        </router-link>
        <div class="flex items-center gap-14 text-[1.1rem] font-bold">
            <router-link to="/login" class="hover:text-[var(--primary-action-color)]">Login</router-link>
            <router-link to="/register" class="hover:text-[var(--primary-action-color)]">Register</router-link>
            <Toggle/>
        </div>
    </nav>
</template>