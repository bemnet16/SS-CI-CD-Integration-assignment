<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";

const numberOfTravelers = ref({
  adults: 1,
  children: 0,
  pets: 0,
});

const showSelection = ref(false);
const inputDisabled = ref(true);
const nextButtonDisabled = ref(true);

const props = defineProps<{
  cur_val: string | null | number;
  changeIndex: (i: number) => void;
}>();

if (props.cur_val) {
  const values = props.cur_val.toString().split(", ");
  numberOfTravelers.value = {
    adults: parseInt(values[0].split(" ")[0]),
    children: parseInt(values[1].split(" ")[0]),
    pets: parseInt(values[2].split(" ")[0]),
  };
  inputDisabled.value = false;
}

const emit = defineEmits(["update-step"]);

const nextStep = () => {
  props.changeIndex(3);
  emit(
    "update-step",
    `${numberOfTravelers.value.adults} Adults, ${numberOfTravelers.value.children} Children, ${numberOfTravelers.value.pets} Pets`,
  );
  showSelection.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const inputEl = document.querySelector(".custom-input") as HTMLElement;
  const selectionEl = document.querySelector(".selection-ui") as HTMLElement;

  if (
    inputEl &&
    selectionEl &&
    !inputEl.contains(target) &&
    !selectionEl.contains(target)
  ) {
    showSelection.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

const toggleSelection = () => {
  showSelection.value = true;
  inputDisabled.value = false;
};

watch(
  () => numberOfTravelers.value,
  (newVal) => {
    if (newVal.adults > 0) {
      inputDisabled.value = false;
    }
  },
  { deep: true },
);
</script>

<template>
  <section class="lg:pt-20 lg:w-full">
    <div class="w-full sm:max-w-xl lg:max-w-xl mx-auto px-2 mt-4">
      <p
        class="text-center lg:text-start text-2xl md:text-4xl font-extrabold mb-2"
      >
        Who’s coming along?
      </p>
      <div class="relative">
        <input
          @click="toggleSelection"
          :value="
            !inputDisabled
              ? `${numberOfTravelers.adults} Adults, ${numberOfTravelers.children} Children, ${numberOfTravelers.pets} Pets`
              : 'Who will come with you?'
          "
          type="text"
          placeholder="Who will come with you?"
          class="custom-input w-full"
          readonly
        />

        <button
          @click="nextStep"
          :disabled="nextButtonDisabled && inputDisabled"
          class="absolute top-2 lg:top-3 right-2 rounded-full bg-bgColor p-2 flex gap-1 items-center h-8 cursor-pointer disabled:bg-bgColor/60"
          @mouseover="nextButtonDisabled = inputDisabled"
          @mouseleave="nextButtonDisabled = true"
        >
          <span
            v-if="!nextButtonDisabled && !inputDisabled"
            class="text-sm text-white"
            >Next</span
          >
          <img src="/icons/rightArrow.svg" class="w-4 h-3" />
        </button>

        <div
          v-if="showSelection"
          class="selection-ui bg-white rounded-xl p-4 mt-4 flex flex-col gap-4 shadow-shadowOp2 overflow-y-auto no-scrollbar absolute w-full"
        >
          <div
            v-for="(value, key, index) in numberOfTravelers"
            :key="index"
            class="flex items-center justify-between"
          >
            <span class="font-semibold">{{ key }}</span>
            <div
              class="flex gap-x-4 items-center p-[2px] rounded-full border border-[#EFEFEF]"
            >
              <button
                :disabled="key === 'adults' ? value === 1 : value === 0"
                @click="numberOfTravelers[key]--"
                :class="
                  key === 'adults'
                    ? value === 1
                      ? 'bg-bgColor-disabled text-textColor-disabled cursor-not-allowed'
                      : 'btn-counter hover:bg-bgColor hover:text-white'
                    : value === 0
                      ? 'bg-bgColor-disabled text-textColor-disabled cursor-not-allowed'
                      : 'btn-counter hover:bg-bgColor hover:text-white'
                "
                class="btn-counter"
              >
                -
              </button>
              <span>{{ value }}</span>
              <button
                @click="numberOfTravelers[key]++"
                class="btn-counter hover:bg-bgColor hover:text-white"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
