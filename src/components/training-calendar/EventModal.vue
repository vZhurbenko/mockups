<script setup>
import { computed, ref } from "vue";
import { X, MapPin, Clock, Users } from "lucide-vue-next";
import { useTrainingCalendarStore } from "@/stores/trainingCalendar";
import EventParticipants from "./EventParticipants.vue";

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

const store = useTrainingCalendarStore();

const isExpanded = ref(false);

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

const handleClose = () => {
  emit("close");
};

// Закрытие по ESC
const handleKeydown = (e) => {
  if (e.key === "Escape") {
    handleClose();
  }
};
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
        <!-- Затемнение фона -->
        <div
          class="fixed inset-0 bg-black/50 transition-opacity"
          @click="handleClose"
        />

        <!-- Модалка -->
        <div
          class="flex min-h-full items-center justify-center p-4"
          @keydown="handleKeydown"
        >
          <div
            class="relative bg-white rounded-lg shadow-xl max-w-lg w-full p-6"
            @click.stop
          >
            <!-- Заголовок -->
            <div class="flex items-start justify-between gap-4 mb-4">
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900 mb-1">
                  {{ event.title }}
                </h3>
                <p v-if="isGame && event.opponent" class="text-sm text-gray-600">
                  Соперник: <span class="font-medium">{{ event.opponent }}</span>
                </p>
              </div>
              <div class="flex flex-col items-end gap-2 shrink-0">
                <button
                  @click="handleClose"
                  class="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X class="w-5 h-5 text-gray-500" />
                </button>
                <span
                  class="px-2 py-1 text-xs font-medium rounded-full"
                  :class="isTraining ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'"
                >
                  {{ isTraining ? "Тренировка" : "Игра" }}
                </span>
              </div>
            </div>

            <!-- Детали -->
            <div class="space-y-3 mb-4">
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
                </button>
              </div>
            </div>

            <!-- Описание -->
            <div v-if="event.description" class="mb-4 p-3 bg-slate-50 rounded-lg">
              <p class="text-sm text-gray-700">{{ event.description }}</p>
            </div>

            <!-- Кнопка записи -->
            <div class="mb-4">
              <button
                @click="handleToggleParticipation"
                :disabled="isFull && !isParticipating"
                class="w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors"
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

            <!-- Участники -->
            <EventParticipants :event="event" :is-expanded="isExpanded" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active :deep(.bg-black\/50),
.modal-leave-active :deep(.bg-black\/50) {
  transition: opacity 0.2s ease;
}

.modal-enter-from :deep(.bg-black\/50),
.modal-leave-to :deep(.bg-black\/50) {
  opacity: 0;
}
</style>
