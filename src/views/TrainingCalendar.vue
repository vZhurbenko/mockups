<script setup>
import { computed } from "vue";
import { useTrainingCalendarStore } from "@/stores/trainingCalendar";
import CalendarHeader from "@/components/training-calendar/CalendarHeader.vue";
import CalendarGrid from "@/components/training-calendar/CalendarGrid.vue";
import EventsPanel from "@/components/training-calendar/EventsPanel.vue";

const store = useTrainingCalendarStore();

const monthName = computed(() => {
  return new Intl.DateTimeFormat("ru-RU", { month: "long", year: "numeric" }).format(
    store.currentDate
  );
});
</script>

<template>
  <div class="max-w-6xl mx-auto">
    <div class="mb-6 bg-white rounded shadow p-6">
      <!-- Заголовок календаря -->
      <CalendarHeader :month-name="monthName" />

      <!-- Календарная сетка -->
      <CalendarGrid />

      <!-- Панель событий -->
      <EventsPanel />
    </div>
  </div>
</template>
