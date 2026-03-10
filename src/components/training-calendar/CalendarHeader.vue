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
  <div class="flex items-center justify-between mb-6">
    <div class="flex items-center gap-4">
      <button
        @click="store.goToPreviousMonth"
        class="p-2 rounded-lg hover:bg-slate-100 transition-colors"
      >
        <ChevronLeft class="w-5 h-5 text-gray-600" />
      </button>
      <h2 class="text-xl font-semibold text-gray-900 capitalize flex items-center gap-2">
        <Calendar class="w-5 h-5 text-primary-600" />
        {{ monthName }}
      </h2>
      <button
        @click="store.goToNextMonth"
        class="p-2 rounded-lg hover:bg-slate-100 transition-colors"
      >
        <ChevronRight class="w-5 h-5 text-gray-600" />
      </button>
    </div>
    <button
      @click="store.goToToday"
      class="px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
    >
      Сегодня
    </button>
  </div>
</template>
