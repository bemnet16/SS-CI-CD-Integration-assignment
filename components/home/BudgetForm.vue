<script lang="ts" setup>
import { ref } from "vue";
const props = defineProps<{
  cur_val: number | null | string;
  changeIndex: (i: number) => void;
}>();
const budget = props.cur_val ? ref(props.cur_val) : ref(100);

const emit = defineEmits(["update-step"]);

const nextStep = () => {
  props.changeIndex(4);
  emit("update-step", `${budget.value}`);
};

const getBackgroundStyle = () => {
  const min = 100;
  const max = 3000;
  const percentage = ((Number(budget.value) - min) / (max - min)) * 100;
  return `background: linear-gradient(to right, #FF6690 ${percentage}%, #FFF0F4 ${percentage}%)`;
};
</script>

<template>
  <section class="lg:pt-20 lg:w-full">
    <div class="w-full sm:max-w-xl lg:max-w-xl mx-auto px-2 mt-4">
      <div class="text-center lg:text-start">
        <p class="text-2xl md:text-4xl font-extrabold">What’s Your Budget?</p>
        <p class="text-textColor-sec-default md:text-lg lg:text-xl font-bold">
          What’s your budget per person (e.g., €300, €500, €1000)
        </p>
        <p class="text-2xl md:text-4xl font-extrabold mt-4">
          £{{ budget }}
          <span class="text-bgColor text-lg md:text-2xl">/person</span>
        </p>
      </div>
      <div
        class="mx-auto px-2 mt-4 bg-white h-20 rounded-lg flex flex-col justify-center items-center pt-4 relative"
      >
        <input
          type="range"
          min="100"
          max="3000"
          step="10"
          v-model="budget"
          :style="getBackgroundStyle()"
          class="w-full h-3 bg-bgColor-light rounded-full appearance-none"
        />
        <span
          :style="`left: calc(${Number(budget) / 30}% - 20px)`"
          class="absolute top-0 text-xs text-white bg-bgColor rounded-full h-5 px-2 flex items-center"
          >£{{ budget }}</span
        >
        <div class="flex items-center justify-between w-full mt-1">
          <span>£100</span>
          <span>£3000</span>
        </div>
      </div>
      <button
        @click="nextStep"
        :disabled="budget === 0"
        :class="
          budget === 0
            ? 'bg-bgColor-btn-disabled text-textColor-disabled'
            : 'bg-bgColor text-white hover:bg-bgColor/90'
        "
        class="rounded-full px-8 py-3 my-4 w-full xxs:w-fit"
      >
        Next
      </button>
    </div>
  </section>
</template>
