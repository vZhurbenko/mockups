<script setup>
import { computed, ref } from "vue";
import { useTrainingCalendarStore } from "@/stores/trainingCalendar";
import CalendarHeader from "@/components/training-calendar/CalendarHeader.vue";
import CalendarGrid from "@/components/training-calendar/CalendarGrid.vue";
import EventsPanel from "@/components/training-calendar/EventsPanel.vue";
import DayModal from "@/components/training-calendar/DayModal.vue";
import AddEventModal from "@/components/training-calendar/AddEventModal.vue";

const store = useTrainingCalendarStore();

const selectedDate = ref(null);
const isDayModalOpen = ref(false);
const isAddEventModalOpen = ref(false);
const activeTab = ref("calendar"); // 'calendar' или 'events'

const monthName = computed(() => {
  return new Intl.DateTimeFormat("ru-RU", { month: "long", year: "numeric" }).format(
    store.currentDate
  );
});

const getEventsForDate = (date) => {
  return store.events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getDate() === date.getDate() &&
      eventDate.getMonth() === date.getMonth() &&
      eventDate.getFullYear() === date.getFullYear()
    );
  });
};

const handleDayClick = (date) => {
  selectedDate.value = date;
  isDayModalOpen.value = true;
};

const handleCloseDayModal = () => {
  isDayModalOpen.value = false;
  selectedDate.value = null;
};

const handleOpenAddEvent = (date) => {
  selectedDate.value = date;
  isAddEventModalOpen.value = true;
};

const handleAddEvent = (eventData) => {
  // Создаём новое событие
  const newEvent = {
    id: store.events.length + 1,
    type: eventData.type,
    title: eventData.title,
    date: new Date(
      eventData.date.getFullYear(),
      eventData.date.getMonth(),
      eventData.date.getDate(),
      ...eventData.startTime.split(':').map(Number)
    ),
    endTime: new Date(
      eventData.date.getFullYear(),
      eventData.date.getMonth(),
      eventData.date.getDate(),
      ...eventData.endTime.split(':').map(Number)
    ),
    location: eventData.location,
    address: eventData.address,
    participants: [],
    maxParticipants: eventData.maxParticipants,
    description: eventData.description,
  };

  store.events.push(newEvent);
  store.events = [...store.events];
};

const handleCloseAddEventModal = () => {
  isAddEventModalOpen.value = false;
};
</script>

<template>
  <div class="max-w-7xl mx-auto space-y-6">
    <!-- Секция с табами -->
    <div class="bg-white rounded shadow">
      <!-- Табы (Material-style с белым фоном активного) -->
      <div class="flex border-b border-gray-200">
        <button
          @click="activeTab = 'calendar'"
          class="px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px"
          :class="[
            activeTab === 'calendar'
              ? 'text-primary-600 border-primary-600 bg-white'
              : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300',
          ]"
        >
          Календарь
        </button>
        <button
          @click="activeTab = 'events'"
          class="px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px"
          :class="[
            activeTab === 'events'
              ? 'text-primary-600 border-primary-600 bg-white'
              : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300',
          ]"
        >
          События месяца
        </button>
      </div>

      <!-- Контент табов -->
      <div class="p-3 sm:p-6">
        <!-- Tab: Календарь -->
        <div v-if="activeTab === 'calendar'">
          <CalendarHeader :month-name="monthName" />
          <CalendarGrid
            @day-click="handleDayClick"
          />
        </div>

        <!-- Tab: События месяца -->
        <div v-if="activeTab === 'events'">
          <EventsPanel />
        </div>
      </div>
    </div>
  </div>

  <!-- Модалка дня -->
  <DayModal
    v-if="selectedDate"
    :date="selectedDate"
    :events="getEventsForDate(selectedDate)"
    :is-open="isDayModalOpen"
    @close="handleCloseDayModal"
    @add-event="handleOpenAddEvent"
  />

  <!-- Модалка добавления события -->
  <AddEventModal
    v-if="selectedDate"
    :date="selectedDate"
    :is-open="isAddEventModalOpen"
    @close="handleCloseAddEventModal"
    @add="handleAddEvent"
  />
</template>
