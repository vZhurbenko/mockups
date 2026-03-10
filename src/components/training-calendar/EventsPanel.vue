<script setup>
import { computed, ref } from "vue";
import { useTrainingCalendarStore } from "@/stores/trainingCalendar";
import EventCard from "./EventCard.vue";

const store = useTrainingCalendarStore();

const showAll = ref(false);

const eventsToShow = computed(() => {
  const events = store.selectedDateEvents.length > 0
    ? store.selectedDateEvents
    : store.upcomingEvents;

  if (showAll.value || events.length <= 3) {
    return events;
  }
  return events.slice(0, 3);
});

const title = computed(() => {
  if (store.selectedDateEvents.length > 0) {
    const dateStr = store.selectedDate.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
    });
    return `События на ${dateStr}`;
  }
  return "Предстоящие события";
});

const hasMore = computed(() => {
  const events = store.selectedDateEvents.length > 0
    ? store.selectedDateEvents
    : store.upcomingEvents;
  return events.length > 3;
});
</script>

<template>
  <div class="border-t border-gray-200 pt-4">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ title }}</h3>

    <div v-if="eventsToShow.length === 0" class="text-center py-8 text-gray-500">
      <p>На этот день событий нет</p>
    </div>

    <div class="space-y-3">
      <EventCard
        v-for="event in eventsToShow"
        :key="event.id"
        :event="event"
      />
    </div>

    <button
      v-if="hasMore"
      @click="showAll = !showAll"
      class="mt-4 w-full py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
    >
      {{ showAll ? "Свернуть" : "Показать ещё" }}
    </button>
  </div>
</template>
