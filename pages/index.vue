<script lang="ts" setup>
import { ref } from "vue";
import MainHeader from "@/components/home/MainHeader.vue";
import PlaceForm from "@/components/home/PlaceForm.vue";
import { steps } from "@/lib/constants";

const index = ref(0);
const isLoading = ref(false);

const changeIndex = (i: number) => {
  index.value = i;
  if(i === 5) isLoading.value = true
};

const updateStepValue = (stepIndex: number, newValue: string) => {
  steps.value[stepIndex].value = newValue;
};
</script>

<template>
  <MainHeader />
  <div v-if="!isLoading" class="h-screen z-50 ">
    <PlaceForm
      v-if="index === 0"
      :cur_val="steps[0].value"
      :changeIndex="changeIndex"
      @update-step="updateStepValue(0, $event)"
    />

    <div
      class="flex flex-col lg:flex-row lg:justify-between lg:container lg:mt-8"
    >
      <HomeCalendarForm
        v-if="index === 1"
        :cur_val="steps[1].value"
        :changeIndex="changeIndex"
        @update-step="updateStepValue(1, $event)"
      />
      <HomeNumberOfTravelersForm
        v-if="index === 2"
        :cur_val="steps[2].value"
        :changeIndex="changeIndex"
        @update-step="updateStepValue(2, $event)"
      />
      <HomeBudgetForm
        v-if="index === 3"
        :cur_val="steps[3].value"
        :changeIndex="changeIndex"
        @update-step="updateStepValue(3, $event)"
      />

      <HomeVibeForm
        v-if="index === 4"
        :cur_val="steps[4].value"
        :changeIndex="changeIndex"
        @update-step="updateStepValue(4, $event)"
      />

      <HomeCompletionStepper
        v-if="index !== 0"
        :changeIndex="changeIndex"
        :steps="steps"
      />
    </div>

    <img
      src="/images/Illustration.svg"
      alt=""
      class="fixed bottom-0 -left-2/3 mobl:-left-0 -z-20 w-full min-w-[900px] mobl:min-w-full object-center"
    />
  </div>

  <HomeLoadingState v-if="isLoading" />

</template>
