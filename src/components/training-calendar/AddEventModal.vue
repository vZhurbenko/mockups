<script setup>
import { ref } from "vue";
import { X, Plus } from "lucide-vue-next";

const props = defineProps({
  date: {
    type: Date,
    required: true,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "add"]);

const formData = ref({
  title: "",
  type: "training",
  startTime: "19:00",
  endTime: "21:00",
  location: "",
  address: "",
  maxParticipants: 12,
  description: "",
});

const handleSubmit = () => {
  emit("add", {
    ...formData.value,
    date: props.date,
  });
  handleClose();
};

const handleClose = () => {
  emit("close");
  formData.value = {
    title: "",
    type: "training",
    startTime: "19:00",
    endTime: "21:00",
    location: "",
    address: "",
    maxParticipants: 12,
    description: "",
  };
};

const handleKeydown = (e) => {
  if (e.key === "Escape") {
    handleClose();
  }
};
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="fixed inset-0 z-[60] overflow-y-auto">
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
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900">
                Добавить событие
              </h3>
              <button
                @click="handleClose"
                class="p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X class="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <!-- Форма -->
            <form @submit.prevent="handleSubmit" class="space-y-4">
              <!-- Тип события -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Тип события
                </label>
                <div class="flex gap-3">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      v-model="formData.type"
                      value="training"
                      class="w-4 h-4 text-primary-600"
                    />
                    <span class="text-sm text-gray-700">Тренировка</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      v-model="formData.type"
                      value="game"
                      class="w-4 h-4 text-primary-600"
                    />
                    <span class="text-sm text-gray-700">Игра</span>
                  </label>
                </div>
              </div>

              <!-- Название -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Название *
                </label>
                <input
                  v-model="formData.title"
                  type="text"
                  required
                  placeholder="Например: Тренировка по баскетболу"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
              </div>

              <!-- Время -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Начало *
                  </label>
                  <input
                    v-model="formData.startTime"
                    type="time"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Конец *
                  </label>
                  <input
                    v-model="formData.endTime"
                    type="time"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  />
                </div>
              </div>

              <!-- Место -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Место *
                </label>
                <input
                  v-model="formData.location"
                  type="text"
                  required
                  placeholder="Например: СК Олимпийский"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
              </div>

              <!-- Адрес -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Адрес *
                </label>
                <input
                  v-model="formData.address"
                  type="text"
                  required
                  placeholder="Например: ул. Спортивная, 1"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
              </div>

              <!-- Макс. участников -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Макс. количество участников
                </label>
                <input
                  v-model.number="formData.maxParticipants"
                  type="number"
                  min="1"
                  max="50"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
              </div>

              <!-- Описание -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Описание
                </label>
                <textarea
                  v-model="formData.description"
                  rows="3"
                  placeholder="Описание события"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm resize-none"
                />
              </div>

              <!-- Кнопки -->
              <div class="flex gap-3 pt-4">
                <button
                  type="button"
                  @click="handleClose"
                  class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  class="flex-1 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Добавить
                </button>
              </div>
            </form>
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
