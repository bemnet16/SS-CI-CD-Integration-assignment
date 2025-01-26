<script lang="ts" setup>
import { type HTMLAttributes, computed } from "vue";
import type { StepperSeparatorProps } from "radix-vue";
import { StepperSeparator, useForwardProps } from "radix-vue";

import { cn } from "@/lib/utils";

const props = defineProps<
  StepperSeparatorProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { ...delegated } = props;

  return delegated;
});

const forwarded = useForwardProps(delegatedProps);
</script>

<template>
  <StepperSeparator v-bind="forwarded" :class="cn(props.class)" />
</template>
