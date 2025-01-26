<script setup lang="ts">
import { Check, Edit2 } from "lucide-vue-next";
import { Button } from "@/components/ui/button";

const { steps, changeIndex } = defineProps<{
  steps: {
    step: number;
    title: string;
    value: string | null | number;
  }[];
  changeIndex: (i: number) => void;
}>();

const editForm = (i: number) => {
  changeIndex(i);
};
</script>

<template>
  <section class="p-2 lg:p-0 lg:w-full mt-2 lg:mt-0">
    <div
      orientation="vertical"
      class="mx-auto lg:-mr-0 flex w-full max-w-md xl:max-w-[526px] flex-col justify-start gap-10 bg-white p-6 rounded-2xl shadow-shadowOp2"
    >
      <div>
        <img src="/icons/stepper_pic.svg" alt="" class="w-full"/>
      </div>

      <div
        v-for="step in steps"
        :key="step.step"
        class="relative flex w-full items-start gap-6"
      >
        <div
          v-if="step.step !== steps[steps.length - 1].step"
          class="absolute left-[18px] top-[38px] block h-[105%] w-0.5 shrink-0 rounded-full"
          :class="step.value ? 'bg-bgColor' : 'bg-bgColor-disabled'"
        />

        
          <Button
            size="icon"
            class="z-10 rounded-full shrink-0 hover:bg-bgColor hover:text-white"
            :class="
              step.value
                ? 'bg-bgColor text-white'
                : 'bg-bgColor-disabled text-textColor-disabled'
            "
          >
            <Check class="size-5" />
          </Button>


        <div class="flex flex-col relative w-full">
          <h2 class="text-xs md:text-sm font-semibold whitespace-nowrap text-textColor-sec-default transition">
            {{ step.title }}
          </h2>
          <p
            class="text-md md:text-lg font-semibold transition lg:text-base text-textColor overflow-hidden max-w-52  sm:max-w-72 truncate"
          >
            {{ step.value }}
          </p>

          <button
            v-if="step.value"
            @click="editForm(step.step)"
            class="absolute top-0 -right-4 text-xs text-bgColor flex items-center gap-x-1 hover:bg-bgColor-light p-2 rounded-md"
          >
            <Edit2 class="size-5 text-bgColor w-4 h-3" />
            Edit
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
