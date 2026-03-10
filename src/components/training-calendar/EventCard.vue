<script setup>
import { computed } from "vue";
import { useTrainingCalendarStore } from "@/stores/trainingCalendar";
import { MapPin, Clock, Users, ChevronDown, ChevronUp, Trophy, Dumbbell } from "lucide-vue-next";
import EventParticipants from "./EventParticipants.vue";

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
});

const store = useTrainingCalendarStore();

const isExpanded = computed(() => false);

const isTraining = computed(() => props.event.type === "training");

const isGame = computed(() => props.event.type === "game");

const isParticipating = computed(() => store.isParticipating(props.event.id));

const spotsLeft = computed(() => {
  return props.event.maxParticipants - props.event.participants.length;
});

const isFull = computed(() => spotsLeft.value <= 0);

const dateTime = computed(() => {
  const start = new Date(props.event.date);
  const end = new Date(props.event.endTime);

  const timeStr = start.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endTimeStr = end.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const dateStr = start.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    weekday: "long",
  });

  return { date: dateStr, time: `${timeStr} - ${endTimeStr}` };
});

const handleToggleParticipation = () => {
  store.toggleParticipation(props.event.id);
};
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
    <div class="flex items-start gap-4">
      <!-- Иконка типа события -->
      <div
        class="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
        :class="isTraining ? 'bg-green-100' : 'bg-purple-100'"
      >
        <Dumbbell
          v-if="isTraining"
          class="w-6 h-6 text-green-600"
        />
        <Trophy
          v-else
          class="w-6 h-6 text-purple-600"
        />
      </div>

      <!-- Основная информация -->
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h4 class="font-semibold text-gray-900 mb-1">
              {{ event.title }}
            </h4>
            <p v-if="isGame && event.opponent" class="text-sm text-gray-600 mb-2">
              Соперник: <span class="font-medium">{{ event.opponent }}</span>
            </p>
          </div>
          <span
            class="px-2 py-1 text-xs font-medium rounded-full shrink-0"
            :class="isTraining ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'"
          >
            {{ isTraining ? "Тренировка" : "Игра" }}
          </span>
        </div>

        <!-- Детали -->
        <div class="mt-3 space-y-2">
          <div class="flex items-center gap-2 text-sm text-gray-600">
            <Clock class="w-4 h-4" />
            <span>{{ dateTime.time }}</span>
          </div>
          <div class="flex items-center gap-2 text-sm text-gray-600">
            <MapPin class="w-4 h-4" />
            <span>{{ event.location }}, {{ event.address }}</span>
          </div>
          <div class="flex items-center gap-2 text-sm text-gray-600">
            <Users class="w-4 h-4" />
            <span>
              {{ event.participants.length }} / {{ event.maxParticipants }} участников
              <span v-if="spotsLeft > 0" class="text-green-600">
                (свободно: {{ spotsLeft }})
              </span>
              <span v-else class="text-red-600 font-medium">
                (мест нет)
              </span>
            </span>
          </div>
        </div>

        <!-- Кнопка записи -->
        <div class="mt-4 flex items-center gap-3">
          <button
            @click="handleToggleParticipation"
            :disabled="isFull && !isParticipating"
            class="px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
            :class="[
              isParticipating
                ? 'bg-red-50 text-red-600 hover:bg-red-100'
                : isFull
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-primary-600 text-white hover:bg-primary-700',
            ]"
          >
            {{ isParticipating ? "Отписаться" : "Записаться" }}
          </button>
        </div>
      </div>
    </div>

    <!-- Участники -->
    <EventParticipants :event="event" />
  </div>
</template>
