<script setup>
import { ChevronDown, ChevronRight } from "lucide-vue-next";

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
  isExpanded: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div v-if="isExpanded" class="mt-3 p-3 bg-slate-50 rounded-lg">
    <div class="space-y-2">
      <div
        v-for="participant in event.participants"
        :key="participant.ID"
        class="flex items-center gap-3"
      >
        <div
          v-if="participant.PERSONAL_PHOTO_LINK"
          class="w-8 h-8 rounded-full overflow-hidden"
        >
          <img
            :src="participant.PERSONAL_PHOTO_LINK"
            :alt="participant.LAST_NAME"
            class="w-full h-full object-cover"
          />
        </div>
        <div
          v-else
          class="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-medium"
        >
          {{ participant.LAST_NAME?.[0] || participant.NAME?.[0] || "?" }}
        </div>
        <span class="text-sm text-gray-900">
          {{ participant.LAST_NAME }} {{ participant.NAME }}
        </span>
      </div>
    </div>
  </div>
</template>
