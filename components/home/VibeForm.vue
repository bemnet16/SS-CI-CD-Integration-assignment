<script lang="ts" setup>
import { ref , watch} from "vue";
import { vibeLists } from "@/lib/constants";


const props = defineProps<{
  cur_val: string | null | number
  changeIndex: (i: number) => void;
}>();
const emit = defineEmits(["update-step"]);

const checkedVibes = props.cur_val ? ref(props.cur_val.toString().split(",")) : ref<string[]>([]);

watch(checkedVibes, (newVal) => {
  if (newVal.length > 0) {
    emit("update-step", newVal.join(','));
  }else{
    emit("update-step", null)
  }
})

const nextStep = () => {
  props.changeIndex(5);
  emit("update-step", checkedVibes.value.join(','));
};
</script>

<template>
  <section class="lg:pt-20 lg:w-full">
    <div class="w-full sm:max-w-2xl mx-auto px-2 mt-4">
      <div class="text-start">
        <p class="text-2xl md:text-4xl font-extrabold">What’s Your Vibe?</p>
        <p class="text-textColor-sec-default md:text-2xl lg:text-xl font-bold">
          Choose your holiday style (e.g., sporty, romantic, family-friendly)
        </p>
      </div>
      <div
        class="w-full mx-auto mt-4 bg-white rounded-2xl grid grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-2 justify-center items-center p-6 shadow-shadowOp2"
      >
        <template v-for="{ id, name, icon: Icon } in vibeLists" :key="id">
          <label
            :for="id"
            class="flex flex-col items-center justify-center rounded-xl py-4 md:py-8 lg:py-5 xl:py-8 lg:px-0 cursor-pointer"
            :class="
              checkedVibes.includes(id)
                ? 'bg-bgColor-light text-bgColor'
                : 'bg-white text-textColor'
            "
          >
            <component :is="Icon" class="size-6" />
            <span>{{ name }}</span>
          </label>
          <input
            type="checkbox"
            class="hidden"
            :id="id"
            :value="id"
            v-model="checkedVibes"
          />
        </template>
      </div>
      
      <button
        @click="nextStep"
        :disabled="checkedVibes.length === 0"
        :class="
          checkedVibes.length === 0
            ? 'bg-bgColor-btn-disabled text-textColor-disabled'
            : 'bg-bgColor text-white hover:bg-bgColor/90'
        "
        class="w-full xxs:w-fit rounded-full px-12 py-3 my-4"
      >
        Submit
      </button>
    </div>
  </section>
</template>
