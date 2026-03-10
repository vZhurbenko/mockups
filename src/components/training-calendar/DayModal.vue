<script setup>
import { computed, ref } from "vue";
import { X, MapPin, Clock, Users, Trophy, Dumbbell } from "lucide-vue-next";
import { useTrainingCalendarStore } from "@/stores/trainingCalendar";
import EventParticipants from "./EventParticipants.vue";

const props = defineProps({
  date: {
    type: Date,
    required: true,
  },
  events: {
    type: Array,
    default: () => [],
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

const store = useTrainingCalendarStore();

const selectedEventIndex = ref(0);

const formattedDate = computed(() => {
  return props.date.toLocaleDateString("ru-RU", {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
});

const handleToggleParticipation = (eventId) => {
  store.toggleParticipation(eventId);
};

const isParticipating = (eventId) => {
  return store.isParticipating(eventId);
};

const handleClose = () => {
  emit("close");
  selectedEventIndex.value = 0;
};

// Закрытие по ESC
const handleKeydown = (e) => {
  if (e.key === "Escape") {
    handleClose();
  }
};

const formatTime = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
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
            class="relative bg-white rounded-lg shadow-xl max-w-2xl w-full"
            @click.stop
          >
            <!-- Заголовок -->
            <div class="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 capitalize">
                {{ formattedDate }}
              </h3>
              <button
                @click="handleClose"
                class="p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X class="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <!-- Контент -->
            <div class="p-4 max-h-[70vh] overflow-y-auto">
              <div v-if="events.length === 0" class="text-center py-8 text-gray-500">
                <p>В этот день событий нет</p>
              </div>

              <div v-else class="space-y-4">
                <div
                  v-for="(event, index) in events"
                  :key="event.id"
                >
                  <!-- Карточка события -->
                  <div class="bg-white border border-gray-200 rounded-lg p-4">
                    <div class="grid grid-cols-[1fr_auto] gap-4">
                      <!-- Левая колонка: заголовок + информация -->
                      <div class="min-w-0">
                        <h4 class="font-semibold text-gray-900 mb-2">
                          {{ event.title }}
                        </h4>
                        <p v-if="event.type === 'game' && event.opponent" class="text-sm text-gray-600 mb-2">
                          Соперник: <span class="font-medium">{{ event.opponent }}</span>
                        </p>

                        <!-- Детали -->
                        <div class="space-y-1.5">
                          <div class="flex items-center gap-2 text-sm text-gray-600">
                            <Clock class="w-4 h-4" />
                            <span>{{ formatTime(event.date) }} - {{ formatTime(event.endTime) }}</span>
                          </div>
                          <div class="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin class="w-4 h-4" />
                            <span>{{ event.location }}, {{ event.address }}</span>
                          </div>
                          <div class="flex items-center gap-2 text-sm text-gray-600">
                            <Users class="w-4 h-4" />
                            <EventParticipants
                              :event="event"
                              :is-expanded="false"
                              :inline="true"
                            />
                          </div>
                        </div>
                      </div>

                      <!-- Правая колонка: бейдж + кнопка -->
                      <div class="flex flex-col items-end gap-2 shrink-0">
                        <span
                          class="px-2 py-1 text-xs font-medium rounded-full"
                          :class="event.type === 'training' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'"
                        >
                          {{ event.type === 'training' ? "Тренировка" : "Игра" }}
                        </span>
                        <button
                          @click="handleToggleParticipation(event.id)"
                          :disabled="event.participants.length >= event.maxParticipants && !isParticipating(event.id)"
                          class="px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap"
                          :class="[
                            isParticipating(event.id)
                              ? 'bg-red-50 text-red-600 hover:bg-red-100'
                              : event.participants.length >= event.maxParticipants
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-primary-600 text-white hover:bg-primary-700',
                          ]"
                        >
                          {{ isParticipating(event.id) ? "Отписаться" : "Записаться" }}
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Разделитель -->
                  <div
                    v-if="index < events.length - 1"
                    class="my-3 border-t border-gray-100"
                  />
                </div>
              </div>
            </div>
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
