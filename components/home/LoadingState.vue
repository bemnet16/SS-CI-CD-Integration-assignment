<script setup lang="ts">
import { ref, onMounted } from "vue";

const progress = ref(0);

onMounted(() => {
  const timer = setInterval(() => {
    progress.value = Math.min(progress.value + 1, 100);
    if (progress.value === 100) {
      clearInterval(timer);
    }
  }, 50);

  return () => {
    clearInterval(timer);
  };
});
</script>

<template>
  <main class="flex flex-col items-center w-full mt-24 md:mt-44">
    <div
      class="w-full max-w-md md:max-w-2xl text-center flex items-center px-6"
    >
      <p
        class="text-bgColor font-extrabold text-lg sm:text-2xl md:text-4xl mr-3 md:mr-6 w-16 md:w-24"
      >
        {{ progress }}%
      </p>
      <div class="relative text-center flex items-center w-full">
        <div
          class="h-1 md:h-[6px] transition-all duration-500 ease-linear"
          :style="{ width: `${progress}%` }"
        >
          <div class="h-full bg-[#FFD1DD] rounded-tl-2xl ml-8" />
          <div class="h-full bg-[#FF85A5] rounded-tl-2xl ml-4" />
          <div class="h-full bg-[#FF4275] rounded-tl-2xl" />
        </div>
        <img
          src="/icons/plane.svg"
          alt="Pink airplane"
          class="w-16 h-16 md:w-32 md:h-32 -ml-10"
        />
      </div>
    </div>
    <div class="w-full md:w-[636px] text-center">
      <p class="mt-2 px-2 text-lg md:text-2xl font-bold w-full">
        Creating your ideal escape... Your travel your adventure is just around
        the corner 🌴🎒
      </p>
    </div>

    <img
      src="../../public/icons/cloud.svg"
      alt=""
      class="fixed bottom-0 -left-2/3 mobl:-left-0 -z-20 w-full min-w-[1400px] object-center"
    />
  </main>
</template>
