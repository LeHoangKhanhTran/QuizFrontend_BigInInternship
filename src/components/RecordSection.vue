<script setup lang="ts">
    import Option from '../components/Option.vue';

</script>

<template>
    <div class="flex flex-col gap-1">
        <h4 class="font-medium text-[1.35rem] text-[var(--secondary-text-color)]">Question 1 of 10:</h4>
        <p class="text-[1.4rem] font-semibold mb-3">Which HTTP methods are commonly used in a REST API?</p>
        <ul class="flex flex-col gap-4">
            <Option :index="0" :have-pointer-events="false"/>
            <Option :index="1" :have-pointer-events="false" :is-correct="false">
                <p class="bg-[var(--primary-action-color)] text-[white] font-semibold w-fit px-2 py-[3.5px] rounded-md text-[.8rem]">Your answer</p>
            </Option>       
            <Option :index="2" :have-pointer-events="false"/>
            <Option :index="3" :have-pointer-events="false" :is-correct="true">
                <p class="bg-[var(--correct-color)] text-[white] font-semibold w-fit px-2 py-[3.5px] rounded-md text-[.8rem]">Correct answer</p>
            </Option>
        </ul> 
    </div>
</template>