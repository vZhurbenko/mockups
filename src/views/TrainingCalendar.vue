<script setup>
import { computed, ref } from "vue";
import { useTrainingCalendarStore } from "@/stores/trainingCalendar";
import CalendarHeader from "@/components/training-calendar/CalendarHeader.vue";
import CalendarGrid from "@/components/training-calendar/CalendarGrid.vue";
import EventsPanel from "@/components/training-calendar/EventsPanel.vue";
import EventModal from "@/components/training-calendar/EventModal.vue";

const store = useTrainingCalendarStore();

const selectedEvent = ref(null);
const isModalOpen = ref(false);

const monthName = computed(() => {
  return new Intl.DateTimeFormat("ru-RU", { month: "long", year: "numeric" }).format(
    store.currentDate
  );
});

const handleDayClick = (date) => {
  store.selectDate(date);
};

const handleEventClick = (event) => {
  selectedEvent.value = event;
  isModalOpen.value = true;
};

const handleCloseModal = () => {
  isModalOpen.value = false;
  selectedEvent.value = null;
};
</script>

<template>
  <div class="max-w-7xl mx-auto space-y-4 sm:space-y-6">
    <!-- Секция календаря -->
    <div>
      <div class="flex items-center justify-between mb-3 sm:mb-4">
        <h2 class="text-lg sm:text-xl font-semibold text-gray-900">Календарь</h2>
        <!-- Легенда -->
        <div class="flex items-center gap-3 sm:gap-4">
          <div class="flex items-center gap-1.5 sm:gap-2">
            <span class="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
            <span class="text-xs sm:text-sm text-gray-600">Тренировка</span>
          </div>
          <div class="flex items-center gap-1.5 sm:gap-2">
            <span class="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-purple-500" />
            <span class="text-xs sm:text-sm text-gray-600">Игра</span>
          </div>
        </div>
      </div>
      <div class="bg-white rounded shadow p-3 sm:p-6">
        <CalendarHeader :month-name="monthName" />
        <CalendarGrid
          @day-click="handleDayClick"
          @event-click="handleEventClick"
        />
      </div>
    </div>

    <!-- Секция событий (только mobile) -->
    <div class="md:hidden">
      <h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Предстоящие события</h2>
      <EventsPanel />
    </div>
  </div>

  <!-- Модалка события (только desktop) -->
  <EventModal
    v-if="selectedEvent"
    :event="selectedEvent"
    :is-open="isModalOpen"
    @close="handleCloseModal"
  />
</template>
