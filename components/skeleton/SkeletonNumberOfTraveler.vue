<template>
  <div
    v-for="(item, index) in 3"
    :key="index"
    class="flex items-center justify-between animate-pulse"
  >
    <div
      class="h-5 w-32 md:w-52 bg-gray-300 rounded-r-full bg-[linear-gradient(to_right,#FFFFFF,#DDDDDD)]"
    />

    <div
      class="h-8 w-24 md:w-36 bg-gray-300 rounded-r-full bg-[linear-gradient(to_right,#FFFFFF,#DDDDDD)]"
    />
  </div>
</template>
