<script setup lang="ts">
import { type Ref, ref, watch } from "vue";

import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  XIcon,
} from "lucide-vue-next";
import {
  CalendarDate,
  type DateValue,
  isEqualMonth,
} from "@internationalized/date";

import { type DateRange, RangeCalendarRoot, useDateFormatter } from "radix-vue";
import { type Grid, createMonth, toDate } from "radix-vue/date";
import {
  RangeCalendarCell,
  RangeCalendarCellTrigger,
  RangeCalendarGrid,
  RangeCalendarGridBody,
  RangeCalendarGridHead,
  RangeCalendarGridRow,
  RangeCalendarHeadCell,
} from "@/components/ui/range-calendar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const isCalanderActive = ref(false);

const value = ref({
  start: new CalendarDate(2022, 1, 20),
  end: new CalendarDate(2022, 1, 20).add({ days: 20 }),
}) as Ref<DateRange>;

const emit = defineEmits(["changeDate"]);

watch(
  value,
  (newValue) => {
    emit(
      "changeDate",
      newValue.start && newValue.end
        ? `${newValue.start.toString()} - ${newValue.end.toString()}`
        : null,
    );
  },
  { immediate: true },
);

const locale = ref("en-US");
const formatter = useDateFormatter(locale.value);

const placeholder = ref(value.value.start) as Ref<DateValue>;
const secondMonthPlaceholder = ref(value.value.end) as Ref<DateValue>;

const firstMonth = ref(
  createMonth({
    dateObj: placeholder.value,
    locale: locale.value,
    fixedWeeks: true,
    weekStartsOn: 0,
  }),
) as Ref<Grid<DateValue>>;
const secondMonth = ref(
  createMonth({
    dateObj: secondMonthPlaceholder.value,
    locale: locale.value,
    fixedWeeks: true,
    weekStartsOn: 0,
  }),
) as Ref<Grid<DateValue>>;

function updateMonth(reference: "first" | "second", months: number) {
  if (reference === "first") {
    placeholder.value = placeholder.value.add({ months });
  } else {
    secondMonthPlaceholder.value = secondMonthPlaceholder.value.add({
      months,
    });
  }
}

watch(placeholder, (_placeholder) => {
  firstMonth.value = createMonth({
    dateObj: _placeholder,
    weekStartsOn: 0,
    fixedWeeks: false,
    locale: locale.value,
  });
  if (isEqualMonth(secondMonthPlaceholder.value, _placeholder)) {
    secondMonthPlaceholder.value = secondMonthPlaceholder.value.add({
      months: 1,
    });
  }
});

watch(secondMonthPlaceholder, (_secondMonthPlaceholder) => {
  secondMonth.value = createMonth({
    dateObj: _secondMonthPlaceholder,
    weekStartsOn: 0,
    fixedWeeks: false,
    locale: locale.value,
  });
  if (isEqualMonth(_secondMonthPlaceholder, placeholder.value))
    placeholder.value = placeholder.value.subtract({ months: 1 });
});
</script>

<template>
  <div
    class="mobl:w-full mobl:h-full mobl:static"
    :class="
      isCalanderActive
        ? 'w-screen h-screen fixed top-0'
        : 'static px-1 mobl:px-0'
    "
  >
    <Popover class="shadow-shadowOp1 m-0 p-0">
      <PopoverTrigger as-child>
        <Button
          @click="isCalanderActive = !isCalanderActive"
          class="custom-input bg-bgColor-[#FAFAFA] text-textColor mobl:rounded-full py-7 flex items-center justify-between hover:bg-white focus:bg-white focus:ring-1 focus:ring-bgColor"
          :class="isCalanderActive ? 'rounded-none' : 'rounded-full'"
        >
          <!-- changed -->
          <div class="flex items-center">
            <CalendarIcon class="mr-2 h-6 w-6 pb-1" />
            <template v-if="value.start">
              <template v-if="value.end">
                {{
                  formatter.custom(toDate(value.start), {
                    dateStyle: "medium",
                  })
                }}
                -
                {{
                  formatter.custom(toDate(value.end), {
                    dateStyle: "medium",
                  })
                }}
              </template>

              <template v-else>
                {{
                  formatter.custom(toDate(value.start), {
                    dateStyle: "medium",
                  })
                }}
              </template>
            </template>
            <template v-else> Pick a date </template>
          </div>
          <XIcon
            :class="isCalanderActive ? 'block' : 'hidden'"
            class="h-7 w-7 p-1 text-textColor-disabled bg-bgColor-btn-disabled rounded-full hover:bg-bgColor-light mobl:hidden"
          />
        </Button>
      </PopoverTrigger>

      <!-- ! here we go mt -->
      <PopoverContent
        class="w-auto p-0 -mt-1 mobl:mt-2 min-h-96 sm:min-h-fit sm:h-fit mobl:w-full overflow-auto"
      >
        <RangeCalendarRoot
          v-slot="{ weekDays }"
          v-model="value"
          v-model:placeholder="placeholder"
          class="p-3 rounded-3xl w-screen h-screen min-h-96 sm:min-h-fit sm:h-fit overflow-scroll mobl:w-96 sm:w-full no-scrollbar"
        >
          <div
            class="flex flex-col gap-y-4 mt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0"
          >
            <div class="flex flex-col gap-4">
              <div class="flex items-center justify-between">
                <button
                  :class="
                    cn(
                      buttonVariants({ variant: 'outline' }),
                      'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
                    )
                  "
                  @click="updateMonth('first', -1)"
                >
                  <ChevronLeft class="h-4 w-4" />
                </button>
                <div :class="cn('text-sm font-medium')">
                  {{ formatter.fullMonthAndYear(toDate(firstMonth.value)) }}
                </div>
                <button
                  :class="
                    cn(
                      buttonVariants({ variant: 'outline' }),
                      'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
                    )
                  "
                  @click="updateMonth('first', 1)"
                >
                  <ChevronRight class="h-4 w-4" />
                </button>
              </div>
              <RangeCalendarGrid>
                <RangeCalendarGridHead>
                  <RangeCalendarGridRow>
                    <RangeCalendarHeadCell
                      v-for="day in weekDays"
                      :key="day"
                      class="w-full h-fit"
                    >
                      {{ day }}
                    </RangeCalendarHeadCell>
                  </RangeCalendarGridRow>
                </RangeCalendarGridHead>
                <RangeCalendarGridBody>
                  <RangeCalendarGridRow
                    v-for="(weekDates, index) in firstMonth.rows"
                    :key="`weekDate-${index}`"
                    class="mt-2 w-full"
                  >
                    <RangeCalendarCell
                      v-for="weekDate in weekDates"
                      :key="weekDate.toString()"
                      :date="weekDate"
                      class="w-full"
                    >
                      <RangeCalendarCellTrigger
                        :day="weekDate"
                        :month="firstMonth.value"
                      />
                    </RangeCalendarCell>
                  </RangeCalendarGridRow>
                </RangeCalendarGridBody>
              </RangeCalendarGrid>
            </div>
            <div class="flex flex-col gap-4">
              <div class="flex items-center justify-between">
                <button
                  :class="
                    cn(
                      buttonVariants({ variant: 'outline' }),
                      'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
                    )
                  "
                  @click="updateMonth('second', -1)"
                >
                  <ChevronLeft class="h-4 w-4" />
                </button>
                <div :class="cn('text-sm font-medium')">
                  {{ formatter.fullMonthAndYear(toDate(secondMonth.value)) }}
                </div>

                <button
                  :class="
                    cn(
                      buttonVariants({ variant: 'outline' }),
                      'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
                    )
                  "
                  @click="updateMonth('second', 1)"
                >
                  <ChevronRight class="h-4 w-4" />
                </button>
              </div>
              <RangeCalendarGrid class="min-h-96 sm:min-h-fit">
                <RangeCalendarGridHead>
                  <RangeCalendarGridRow>
                    <RangeCalendarHeadCell
                      v-for="day in weekDays"
                      :key="day"
                      class="w-full"
                    >
                      {{ day }}
                    </RangeCalendarHeadCell>
                  </RangeCalendarGridRow>
                </RangeCalendarGridHead>
                <RangeCalendarGridBody>
                  <RangeCalendarGridRow
                    v-for="(weekDates, index) in secondMonth.rows"
                    :key="`weekDate-${index}`"
                    class="mt-2 w-full"
                  >
                    <RangeCalendarCell
                      v-for="weekDate in weekDates"
                      :key="weekDate.toString()"
                      :date="weekDate"
                      class="w-full h-fit"
                    >
                      <RangeCalendarCellTrigger
                        :day="weekDate"
                        :month="secondMonth.value"
                      />
                    </RangeCalendarCell>
                  </RangeCalendarGridRow>
                </RangeCalendarGridBody>
              </RangeCalendarGrid>
            </div>
          </div>
        </RangeCalendarRoot>
      </PopoverContent>
    </Popover>
  </div>
</template>
