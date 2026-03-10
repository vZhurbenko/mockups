<script setup>
import { computed, ref } from "vue";
import { useTrainingCalendarStore } from "@/stores/trainingCalendar";
import { MapPin, Clock, Users, ChevronDown, ChevronRight } from "lucide-vue-next";
import EventParticipants from "./EventParticipants.vue";

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
  isPastDate: {
    type: Boolean,
    default: false,
  },
});

const store = useTrainingCalendarStore();

const isTraining = computed(() => props.event.type === "training");

const isGame = computed(() => props.event.type === "game");

const isParticipating = computed(() => store.isParticipating(props.event.id));

const spotsLeft = computed(() => {
  return props.event.maxParticipants - props.event.participants.length;
});

const isFull = computed(() => spotsLeft.value <= 0);

const isExpanded = ref(false);

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
  <div class="p-4">
    <div class="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3">
      <!-- Левая колонка: заголовок + информация -->
      <div class="min-w-0">
        <h4 class="font-semibold text-gray-900 mb-2">
          {{ event.title }}
        </h4>
        <p v-if="isGame && event.opponent" class="text-sm text-gray-600 mb-2">
          Соперник: <span class="font-medium">{{ event.opponent }}</span>
        </p>

        <!-- Детали -->
        <div class="space-y-1.5">
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
            <button
              @click="isExpanded = !isExpanded"
              class="flex items-center gap-1 hover:text-gray-900 transition-colors"
            >
              <span>
                {{ event.participants.length }} / {{ event.maxParticipants }} участников
                <span v-if="spotsLeft > 0" class="text-green-600">
                  (свободно: {{ spotsLeft }})
                </span>
                <span v-else class="text-red-600 font-medium">
                  (мест нет)
                </span>
              </span>
              <ChevronDown
                v-if="isExpanded"
                class="w-4 h-4"
              />
              <ChevronRight
                v-else
                class="w-4 h-4"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- Правая колонка: бейдж + кнопка -->
      <div class="flex md:flex-col items-center md:items-end gap-2 shrink-0 justify-between md:justify-start">
        <span
          class="px-2 py-1 text-xs font-medium rounded-full"
          :class="isTraining ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'"
        >
          {{ isTraining ? "Тренировка" : "Игра" }}
        </span>
        <button
          @click="handleToggleParticipation"
          :disabled="isPastDate || (isFull && !isParticipating)"
          class="px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap"
          :class="[
            isPastDate
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : isParticipating
                ? 'bg-red-50 text-red-600 hover:bg-red-100'
                : isFull
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-primary-600 text-white hover:bg-primary-700',
          ]"
        >
          {{ isPastDate ? 'Завершено' : isParticipating ? "Отписаться" : "Записаться" }}
        </button>
      </div>
    </div>

    <!-- Участники -->
    <EventParticipants :event="event" :is-expanded="isExpanded" />
  </div>
</template>
