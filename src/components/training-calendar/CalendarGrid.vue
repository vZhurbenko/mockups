<script setup>
import { computed } from "vue";
import { useTrainingCalendarStore } from "@/stores/trainingCalendar";
import CalendarDay from "./CalendarDay.vue";

const emit = defineEmits(["day-click"]);

const store = useTrainingCalendarStore();

const weekDays = computed(() => {
  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  return days;
});

const calendarDays = computed(() => {
  const year = store.currentYear;
  const month = store.currentMonth;

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startDayOfWeek = firstDayOfMonth.getDay() || 7; // Пн=1, Вс=7
  const daysInMonth = lastDayOfMonth.getDate();

  const days = [];

  // Предыдущий месяц
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startDayOfWeek - 1; i > 0; i--) {
    days.push({
      day: prevMonthLastDay - i + 1,
      month: month - 1,
      year: month === 0 ? year - 1 : year,
      isCurrentMonth: false,
    });
  }

  // Текущий месяц
  for (let day = 1; day <= daysInMonth; day++) {
    days.push({
      day,
      month,
      year,
      isCurrentMonth: true,
    });
  }

  // Следующий месяц
  const remainingDays = 42 - days.length; // 6 рядов по 7 дней
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      day: i,
      month: month + 1,
      year: month === 11 ? year + 1 : year,
      isCurrentMonth: false,
    });
  }

  return days;
});

const handleDayClick = (date) => {
  emit("day-click", date);
};
</script>

<template>
  <div class="mb-6">
    <!-- Дни недели -->
    <div class="grid grid-cols-7 gap-0.5 sm:gap-1 mb-1 sm:mb-2">
      <div
        v-for="day in weekDays"
        :key="day"
        class="text-center text-[10px] sm:text-sm font-medium py-1 sm:py-2"
        :class="day === 'Сб' || day === 'Вс' ? 'text-red-600' : 'text-gray-600'"
      >
        {{ day }}
      </div>
    </div>

    <!-- Дни месяца -->
    <div class="grid grid-cols-7 gap-0.5 sm:gap-1">
      <CalendarDay
        v-for="(day, index) in calendarDays"
        :key="index"
        :day="day.day"
        :month="day.month"
        :year="day.year"
        :is-current-month="day.isCurrentMonth"
        @day-click="handleDayClick"
      />
    </div>
  </div>
</template>
