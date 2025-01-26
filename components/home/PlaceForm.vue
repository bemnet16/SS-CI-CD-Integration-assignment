<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { places } from "@/lib/constants";

const props = defineProps<{
  cur_val: string | null | number;
  changeIndex: (i: number) => void;
}>();

const isFocus = ref(false);
const loading = ref(false);
const destination = ref<string | null | undefined>(
  props.cur_val?.toString() ?? null,
);

watch(destination, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    loading.value = true;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
});

const availablePlaces = computed(() => {
  if (
    destination.value !== null &&
    destination.value !== undefined &&
    destination.value.trim() !== ""
  ) {
    const searchTerm = destination.value.toLowerCase().trim();
    return places.filter((place) =>
      place.city.toLowerCase().startsWith(searchTerm),
    );
  } else {
    return [];
  }
});

const selectPlace = (city: string) => {
  destination.value = city;
};

const emit = defineEmits(["update-step"]);

const nextStep = () => {
  props.changeIndex(1);
  emit("update-step", destination.value);
};
</script>

<template>
  <section class="mx-auto max-w-screen-xl lg:flex lg:items-center pt-20 px-1">
    <div class="mx-auto text-center">
      <h1 class="text-2xl md:text-4xl lg:text-6xl font-bold font-arvo">
        Revolutionize Your <br />
        Travel Planning
      </h1>
      <p class="section-description mt-4">
        Get personalized itineraries and instant access to flights, hotels, and
        activities with our AI-driven platform.
      </p>
      <div class="w-full sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto px-2 mt-4">
        <span class="relative">
          <input
            v-model="destination"
            type="text"
            placeholder="Where do you want to travel?"
            class="custom-input"
          />
          <button
            :disabled="!destination"
            @click="nextStep"
            class="absolute -top-1 right-2 rounded-full bg-bgColor p-4 px-2 flex gap-1 items-center h-full cursor-pointer disabled:bg-bgColor/60"
            @mouseover="isFocus = true"
            @mouseleave="isFocus = false"
          >
            <span v-if="isFocus && destination" class="text-sm text-white"
              >next</span
            >
            <img src="/icons/rightArrow.svg" class="w-4 h-3" />
          </button>
        </span>

        <div
          v-if="availablePlaces.length > 0 || loading"
          class="bg-white rounded-lg p-4 mt-6 flex flex-col gap-4 shadow-shadowOp1 max-h-64 overflow-y-auto no-scrollbar"
        >
          <template v-if="loading">
            <SkeletonPlaceForm />
          </template>

          <template v-else>
            <HomePlaceCard
              v-for="(place, index) in availablePlaces"
              @click="selectPlace(place.city)"
              :place="place"
              :key="index"
              :isSelected="destination === place.city"
            />
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
