<script setup>
import { ref } from "vue";
import { Users, ChevronDown, ChevronRight } from "lucide-vue-next";

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
});

const isExpanded = ref(false);
</script>

<template>
  <div class="mt-3">
    <button
      @click="isExpanded = !isExpanded"
      class="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
    >
      <Users class="w-4 h-4" />
      <span>
        {{ event.participants.length }} {{ event.participants.length === 1 ? 'участник' : event.participants.length < 5 ? 'участника' : 'участников' }}
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

    <div
      v-if="isExpanded"
      class="mt-3 p-3 bg-slate-50 rounded-lg"
    >
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
  </div>
</template>
