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
      <h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Календарь</h2>
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
