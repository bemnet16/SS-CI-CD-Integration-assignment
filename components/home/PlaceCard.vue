<script lang="ts" setup>
import { ref } from "vue";
const isFocus = ref(false);
const { place } = defineProps<{
  isSelected: boolean;
  place: { country: string; city: string };
}>();

const { country, city } = place;
</script>

<template>
  <div
    @mouseover="isFocus = true"
    @mouseleave="isFocus = false"
    class="flex gap-2 items-center hover:bg-bgColor-light rounded-lg p-2 cursor-pointer"
     :class="isSelected && 'bg-bgColor-light'" 
  >
    <span
      :class="isSelected ? 'bg-[#FF0D4D]' : isFocus ? 'bg-bgColor' : 'bg-bgColor-light'"
      class="rounded-full p-2"
    >
      <svg
        width="16"
        height="20"
        viewBox="0 0 16 20"
        xmlns="http://www.w3.org/2000/svg"
        :fill="isSelected ? 'white' : isFocus ? 'white' : '#FF6690'"
        class="w-5 h-5"
      >
        <path
          d="M8 10C6.9 10 6 9.1 6 8C6 6.9 6.9 6 8 6C9.1 6 10 6.9 10 8C10 9.1 9.1 10 8 10ZM14 8.2C14 4.57 11.35 2 8 2C4.65 2 2 4.57 2 8.2C2 10.54 3.95 13.64 8 17.34C12.05 13.64 14 10.54 14 8.2ZM8 0C12.2 0 16 3.22 16 8.2C16 11.52 13.33 15.45 8 20C2.67 15.45 0 11.52 0 8.2C0 3.22 3.8 0 8 0Z"
        />
      </svg>
    </span>

    <div class="text-start">
      <p class="font-semibold"  :class="isSelected && 'text-bgColor'" >{{ city }}</p>
      <p class="text-textColor-sec-default">{{ country }}</p>
    </div>
  </div>
</template>
