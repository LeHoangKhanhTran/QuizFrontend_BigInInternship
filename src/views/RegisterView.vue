<script setup lang="ts">
import { computed, ref } from "vue";
import { store } from "../stores/store";
import clsx from "clsx";
import useVuelidate from "@vuelidate/core";
import { minLength, required, helpers, sameAs } from "@vuelidate/validators";
import type { AxiosError } from "axios";
import { router } from "../router/router";
import { api } from "../axios";

const form = ref({
  email: "",
  password: "",
  confirmPassword: "",
});

const rules = computed(() => ({
  email: {
    required: helpers.withMessage("Email/Username is required", required),
    minLength: helpers.withMessage(
      "Email/Username must be at least 3 characters",
      minLength(3)
    ),
  },
  password: {
    required: helpers.withMessage("Password is required", required),
    minLength: helpers.withMessage(
      "Password must be at least 8 characters",
      minLength(8)
    ),
  },
  confirmPassword: {
    required: helpers.withMessage("Confirm Password is required", required),
    minLength: helpers.withMessage(
      "Confirm Password must be at least 8 characters",
      minLength(8)
    ),
    sameAsPassword: helpers.withMessage(
      "Confirm password does not match password",
      sameAs(form.value.password)
    ),
  },
}));

const v$ = useVuelidate(rules, form);

const confirmPasswordError = computed(() => {
  return v$.value.confirmPassword.$errors[0]?.$message || "";
});

const wrapperClasses = computed(() =>
  clsx(
    "w-[35%] min-w-[430px] h-fit rounded-[.75rem] flex flex-col items-center p-9",
    {
      "bg-[var(--secondary-color)]/65": store.theme === "dark",
      "bg-[var(--primary-color-dark)]/65": store.theme === "light",
    }
  )
);

const headingClasses = computed(() =>
  clsx("font-semibold text-[1.55rem]", {
    "text-[var(--background-light)]": store.theme === "dark",
    "text-white": store.theme === "light",
  })
);

const formClasses = computed(() =>
  clsx("flex flex-col gap-7 w-full items-center", {
    "text-white": store.theme === "light",
  })
);

const inputClasses = computed(() =>
  clsx(
    "w-full h-[2.5rem] rounded-[.625rem] px-4 border-[1px] focus:outline-none focus:border-[var(--primary-action-color)] focus:border-[2px] font-medium",
    {
      "bg-[var(--background-dark)]/50": store.theme === "dark",
      "bg-[var(--primary-color-light)] text-[var(--secondary-color)]":
        store.theme === "light",
    }
  )
);

const handleClick = async () => {
  const isValid = await v$.value.$validate();
  if (isValid) {
    try {
      const response = await api.post("/api/auth/register", form.value);
      if (response.status === 200) {
        router.push("/login");
      }
    } 
    catch(error) {
      const axiosError = error as AxiosError;
      console.error(axiosError);  
    }
  }
};
</script>

<template>
  <main class="w-fit h-fit min-w-full min-h-full flex justify-center translate-y-[-2rem]">
    <div :class="wrapperClasses">
      <form @submit.prevent="handleClick" :class="formClasses">
        <img src="../assets/vue.svg" alt="vue-logo" width="32" height="32" />
        <h2 :class="headingClasses">Create an account</h2>
        <label for="" class="font-bold flex flex-col gap-3 w-full">
          Email / Username
          <input type="text" :class="inputClasses" v-model.trim="form.email" />
          <p v-if="v$.email.$error" class="text-red-500 text-sm">
            <span v-for="error in v$.email.$errors"> {{ error.$message }}</span>
          </p>
        </label>
        <label for="" class="font-bold flex flex-col gap-3 w-full">
          Password
          <input
            type="password"
            :class="inputClasses"
            v-model="form.password"
          />
          <p v-if="v$.password.$error" class="text-red-500 text-sm">
            <span v-for="error in v$.password.$errors">
              {{ error.$message }}</span
            >
          </p>
        </label>
        <label for="" class="font-bold flex flex-col gap-3 w-full">
          Confirm Password
          <input
            type="password"
            :class="inputClasses"
            v-model="form.confirmPassword"
            @input="v$.confirmPassword.$touch()"
            @blur="v$.confirmPassword.$touch()"
          />
          <p v-if="v$.confirmPassword.$error" class="text-red-500 text-sm">
            <span>{{ confirmPasswordError }}</span>
          </p>
        </label>
        <button
          type="submit"
          class="w-full py-3 bg-[var(--primary-action-color)] text-[1.15rem] font-bold rounded-[.75rem] mt-5 cursor-pointer hover:bg-[var(--primary-color-light)] hover:text-[var(--primary-action-color)]"
        >
          Register now
        </button>
      </form>
    </div>
  </main>
</template>
