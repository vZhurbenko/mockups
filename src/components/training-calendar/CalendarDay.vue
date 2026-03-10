<script setup>
import { computed } from "vue";
import { useTrainingCalendarStore } from "@/stores/trainingCalendar";

const props = defineProps({
  day: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  isCurrentMonth: {
    type: Boolean,
    default: true,
  },
});

const store = useTrainingCalendarStore();

const date = computed(() => new Date(props.year, props.month, props.day));

const isToday = computed(() => {
  const today = new Date();
  return (
    props.day === today.getDate() &&
    props.month === today.getMonth() &&
    props.year === today.getFullYear()
  );
});

const isSelected = computed(() => {
  if (!store.selectedDate) return false;
  return (
    props.day === store.selectedDate.getDate() &&
    props.month === store.selectedDate.getMonth() &&
    props.year === store.selectedDate.getFullYear()
  );
});

const isWeekend = computed(() => {
  const dayOfWeek = new Date(props.year, props.month, props.day).getDay();
  return dayOfWeek === 0 || dayOfWeek === 6;
});

const dayEvents = computed(() => {
  return store.events.filter(
    (event) =>
      new Date(event.date).getDate() === props.day &&
      new Date(event.date).getMonth() === props.month &&
      new Date(event.date).getFullYear() === props.year
  );
});

const hasTraining = computed(() => {
  return dayEvents.value.some((e) => e.type === "training");
});

const hasGame = computed(() => {
  return dayEvents.value.some((e) => e.type === "game");
});

const handleDayClick = () => {
  store.selectDate(date.value);
};
</script>

<template>
  <button
    @click="handleDayClick"
    class="relative min-h-[80px] p-2 rounded-lg transition-all hover:bg-slate-100 text-left"
    :class="[
      !isCurrentMonth && 'text-gray-400',
      isCurrentMonth && !isToday && !isSelected && 'text-gray-900',
      isToday && 'bg-primary-50 text-primary-700 font-semibold',
      isSelected && 'bg-primary-100 ring-2 ring-primary-500',
      isWeekend && isCurrentMonth && 'text-red-600',
    ]"
  >
    <!-- Число -->
    <span class="text-sm" :class="isToday ? 'text-base' : ''">{{ day }}</span>

    <!-- Индикаторы событий -->
    <div v-if="dayEvents.length > 0" class="absolute bottom-2 left-2 flex gap-1">
      <span
        v-if="hasTraining"
        class="w-2 h-2 rounded-full bg-green-500"
        title="Тренировка"
      />
      <span
        v-if="hasGame"
        class="w-2 h-2 rounded-full bg-purple-500"
        title="Игра"
      />
    </div>

    <!-- Счётчик событий -->
    <span
      v-if="dayEvents.length > 2"
      class="absolute bottom-2 right-2 text-xs text-gray-500"
    >
      +{{ dayEvents.length }}
    </span>
  </button>
</template>
