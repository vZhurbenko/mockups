<script setup>
import { ChevronLeft, ChevronRight, Calendar } from "lucide-vue-next";
import { useTrainingCalendarStore } from "@/stores/trainingCalendar";

const props = defineProps({
  monthName: {
    type: String,
    required: true,
  },
});

const store = useTrainingCalendarStore();
</script>

<template>
  <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 sm:mb-6">
    <div class="flex items-center gap-2 sm:gap-4">
      <button
        @click="store.goToPreviousMonth"
        class="p-1.5 sm:p-2 rounded-lg hover:bg-slate-100 transition-colors"
      >
        <ChevronLeft class="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
      </button>
      <h2 class="text-base sm:text-xl font-semibold text-gray-900 capitalize flex items-center gap-1.5 sm:gap-2">
        <Calendar class="w-4 h-4 sm:w-5 sm:h-5 text-primary-600" />
        <span class="truncate">{{ monthName }}</span>
      </h2>
      <button
        @click="store.goToNextMonth"
        class="p-1.5 sm:p-2 rounded-lg hover:bg-slate-100 transition-colors"
      >
        <ChevronRight class="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
      </button>
    </div>
    <div class="flex items-center gap-3 sm:gap-4">
      <!-- Легенда -->
      <div class="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
        <span class="flex items-center gap-1">
          <span class="w-2.5 h-2.5 rounded-full bg-green-500"></span>
          <span class="hidden sm:inline">Тренировка</span>
        </span>
        <span class="flex items-center gap-1">
          <span class="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
          <span class="hidden sm:inline">Игра</span>
        </span>
      </div>
      <button
        @click="store.goToToday"
        class="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors whitespace-nowrap"
      >
        Сегодня
      </button>
    </div>
  </div>
</template>
