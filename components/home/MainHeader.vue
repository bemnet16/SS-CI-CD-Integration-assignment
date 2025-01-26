<template>
  <nav
    class="w-full md:container flex justify-between items-center h-[100px] sm:h-[150px] text-sm"
  >
    <img src="/images/logo.png" alt="logo png" class="h-28 sm:h-full -ml-8" />

    <div class="flex items-center">
      <div class="hidden md:block">
        <NuxtLink to="/" class="mr-4 text-textColor font-bold">FAQ</NuxtLink>
        <NuxtLink to="/" class="mr-4 text-textColor font-bold"
          >Contact</NuxtLink
        >
      </div>

      <div class="flex items-center justify-between gap-1" v-if="!isAuth">
        <button
          @click="login"
          class="mr-1 md:mr-4 border border-bgColor bg-white rounded-full px-3 py-1 text-bgColor"
        >
          Sign Up
        </button>
        <button
          @click="login"
          class="mr-1 md:mr-0 bg-bgColor border border-bgColor text-white rounded-full px-3 py-1"
        >
          Login
        </button>
        <button
          class="md:hidden bg-white text-center rounded-full h-8 w-8 mr-2 flex items-center justify-center"
        >
          <img src="/icons/menu.svg" alt="profile" class="h-5 w-5" />
        </button>
      </div>

      <div
        v-else
        class="bg-white rounded-full px-2 py-1 flex items-center justify-between gap-2 mr-2 md:mr-0"
      >
        <button @click="login">
          <img src="/icons/menu.svg" alt="profile" class="h-5 w-5" />
        </button>
        <img
          src="/public/images/profile.jpeg"
          alt="profile"
          class="h-6 w-6 rounded-full"
        />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";

const isAuth = ref(false);

// TODO: Add login/logout functionality
const login = () => {
  isAuth.value = !isAuth.value;
};
</script>

<style lang="ts" scoped></style>
