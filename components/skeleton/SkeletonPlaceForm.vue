<template>
  <div
    v-for="n in 3"
    :key="n"
    class="flex gap-2 items-center border-b pb-2 bg-white"
  >
    <span class="bg-bgColor-light rounded-full p-2">
      <img src="/icons/locationIcon.svg" alt="" class="h-6 w-6 text-bgColor" />
    </span>

    <div class="text-start space-y-2">
      <div
        class="h-5 w-32 md:w-52 bg-gray-300 rounded-r-full bg-[linear-gradient(to_right,#FFFFFF,#DDDDDD)]"
      ></div>
      <div
        class="h-5 w-40 md:w-80 bg-gray-200 rounded-r-full bg-[linear-gradient(to_right,#FFFFFF,#DDDDDD)]"
      ></div>
    </div>
  </div>
</template>
