<script lang="ts" setup>
import { ref } from "vue";
import DatePicker from "../ui/DatePicker.vue";

const isFocus = ref(false);

const props = defineProps<{
  cur_val: string | null | number;
  changeIndex: (i: number) => void;
}>();

const emit = defineEmits(["update-step"]);

const dateRange = ref("");

const changeDate = (newDate: string) => {
  dateRange.value = newDate;
};

const nextStep = () => {
  props.changeIndex(2);
  emit("update-step", dateRange.value);
};
</script>

<template>
  <section class="lg:pt-20 lg:w-full">
    <div
      class="w-full sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto mobl:px-2 mt-4"
    >
      <p
        class="text-center lg:text-start text-2xl md:text-4xl font-extrabold mb-2"
      >
        When Are You Traveling?
      </p>
      <span class="relative">
        <DatePicker :cur_val="props.cur_val" @changeDate="changeDate" />
        <button
          :disabled="!dateRange"
          @click="nextStep"
          class="absolute top-3 right-2 rounded-full bg-bgColor p-4 px-2 flex gap-1 items-center h-8 cursor-pointer disabled:bg-bgColor/60"
          @mouseover="isFocus = true"
          @mouseleave="isFocus = false"
        >
          <span v-if="isFocus && dateRange" class="text-sm text-white"
            >next</span
          >
          <img src="/icons/rightArrow.svg" class="w-4 h-3" />
        </button>
      </span>
    </div>
  </section>
</template>
