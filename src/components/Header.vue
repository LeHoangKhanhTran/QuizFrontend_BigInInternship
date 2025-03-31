<script setup lang="ts">
    import Toggle from './Toggle.vue';
</script>
<template>
    <nav class="flex justify-between mb-16 z-1">
        <a href="/" class="flex gap-3 items-center">
            <img src="../assets/vue.svg" alt="Logo" class="logo" width="32"/>
            <h1 class="text-[1.15rem] font-bold">Software Development Quiz with Vue</h1>
        </a>
        <div class="flex items-center gap-14 text-[1.1rem] font-bold">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
            <Toggle/>
        </div>
    </nav>
</template>