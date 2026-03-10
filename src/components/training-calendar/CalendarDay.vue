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

const emit = defineEmits(["day-click"]);

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
  emit("day-click", date.value);
};

const formatTime = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>

<template>
  <button
    @click="handleDayClick"
    class="relative min-h-[70px] sm:min-h-[80px] p-1.5 sm:p-2 rounded-lg transition-all hover:bg-slate-100 text-left"
    :class="[
      !isCurrentMonth && 'text-gray-400',
      isCurrentMonth && !isToday && !isSelected && 'text-gray-900',
      isToday && 'bg-primary-50 text-primary-700 font-semibold',
      isSelected && 'bg-primary-100 ring-2 ring-primary-500',
      isWeekend && isCurrentMonth && 'text-red-600',
    ]"
  >
    <!-- Число -->
    <span class="text-xs sm:text-sm" :class="isToday ? 'text-sm sm:text-base' : ''">{{ day }}</span>

    <!-- Desktop: краткие события -->
    <div v-if="dayEvents.length > 0" class="hidden md:block mt-1 space-y-0.5">
      <div
        v-for="event in dayEvents.slice(0, 2)"
        :key="event.id"
        class="text-[9px] truncate px-1 rounded"
        :class="event.type === 'training' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'"
      >
        {{ formatTime(event.date) }} {{ event.title }}
      </div>
      <div
        v-if="dayEvents.length > 2"
        class="text-[9px] text-gray-500 truncate px-1"
      >
        +{{ dayEvents.length - 2 }} ещё
      </div>
    </div>

    <!-- Mobile: индикаторы событий -->
    <div
      v-if="dayEvents.length > 0"
      class="md:hidden absolute bottom-1.5 sm:bottom-2 left-1.5 sm:left-2 flex gap-0.5 sm:gap-1"
    >
      <span
        v-if="hasTraining"
        class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500"
        title="Тренировка"
      />
      <span
        v-if="hasGame"
        class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-500"
        title="Игра"
      />
    </div>

    <!-- Mobile: Счётчик событий -->
    <span
      v-if="dayEvents.length > 2"
      class="md:hidden absolute bottom-1.5 sm:bottom-2 right-1.5 sm:right-2 text-[10px] sm:text-xs text-gray-500"
    >
      +{{ dayEvents.length }}
    </span>
  </button>
</template>
