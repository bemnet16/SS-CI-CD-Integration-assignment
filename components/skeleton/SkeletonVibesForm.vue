<template>
    <div
  class="w-full mx-auto mt-4 bg-white rounded-2xl grid grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-2 justify-center items-center p-2 shadow-shadowOp2"
>
  <template v-for="n in 8" :key="n">
    <div
      class="flex flex-col items-center justify-center rounded-xl py-4 md:py-8 lg:py-5 xl:py-8 lg:px-0 cursor-default animate-pulse"
    >
      <div
        class="rounded-full h-8 w-8 xl:h-10 xl:w-10 mb-4"
        :style="{
          background: 'linear-gradient(90deg, rgba(250, 250, 250, 0.5) 0%, #DDDDDD 100%)'
        }"
      ></div> 
      <div
        class="rounded-full h-4 w-16 sm:w-20 md:h-6 md:w-24"
        :style="{
          background: 'linear-gradient(90deg, rgba(250, 250, 250, 0.5) 0%, #DDDDDD 100%)'
        }"
      ></div>
    </div>
  </template>
</div>

</template>
