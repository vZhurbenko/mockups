<script setup>
import { computed } from "vue";
import { useTrainingCalendarStore } from "@/stores/trainingCalendar";
import EventCard from "./EventCard.vue";

const store = useTrainingCalendarStore();

// Все события месяца, сгруппированные по дням
const groupedEvents = computed(() => {
  const events = store.monthEvents
    .filter((event) => {
      const eventDate = new Date(event.date);
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      return eventDate >= now;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Группируем по датам
  const grouped = {};
  events.forEach((event) => {
    const date = new Date(event.date);
    const dateKey = date.toISOString().split('T')[0];
    
    if (!grouped[dateKey]) {
      grouped[dateKey] = {
        date: date,
        events: [],
      };
    }
    grouped[dateKey].events.push(event);
  });

  // Преобразуем в массив и сортируем по дате
  return Object.values(grouped).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
});

const isPastDate = (date) => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const eventDate = new Date(date);
  eventDate.setHours(0, 0, 0, 0);
  return eventDate < now;
};
</script>

<template>
  <div class="space-y-3 sm:space-y-4">
    <div v-if="groupedEvents.length === 0" class="text-center py-8 text-gray-500">
      <p>В этом месяце событий нет</p>
    </div>

    <div
      v-for="day in groupedEvents"
      :key="day.date.toISOString()"
      class="bg-white rounded shadow p-3 sm:p-4"
    >
      <!-- Заголовок дня -->
      <div class="flex flex-wrap items-center gap-2 mb-3 pb-3 border-b border-gray-200">
        <span class="text-xs sm:text-sm font-semibold text-gray-900 capitalize">
          {{ day.date.toLocaleDateString("ru-RU", {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          }) }}
        </span>
        <span class="text-[10px] sm:text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full whitespace-nowrap">
          {{ day.events.length }} {{ day.events.length === 1 ? 'событие' : day.events.length < 5 ? 'события' : 'событий' }}
        </span>
      </div>

      <!-- События дня -->
      <div class="space-y-2 sm:space-y-3">
        <template v-for="(event, index) in day.events" :key="event.id">
          <EventCard :event="event" :is-past-date="isPastDate(day.date)" />
          <!-- Разделитель между событиями -->
          <div
            v-if="index < day.events.length - 1"
            class="my-2 sm:my-3 border-t border-gray-100"
          />
        </template>
      </div>
    </div>
  </div>
</template>
