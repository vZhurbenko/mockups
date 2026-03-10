<script setup>
import { computed, ref } from "vue";
import { ChevronDown, ChevronRight, UserX } from "lucide-vue-next";

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
  isExpanded: {
    type: Boolean,
    default: false,
  },
  inline: {
    type: Boolean,
    default: false,
  },
});

const localExpanded = ref(false);

const isExpanded = computed(() => props.inline ? localExpanded.value : props.isExpanded);

const mainParticipants = computed(() => {
  return props.event.participants.filter((p) => !p.isWaitlist);
});

const waitlistParticipants = computed(() => {
  return props.event.participants.filter((p) => p.isWaitlist);
});

const totalParticipants = computed(() => {
  return mainParticipants.value.length + waitlistParticipants.value.length;
});
</script>

<template>
  <div v-if="inline">
    <button
      @click="localExpanded = !localExpanded"
      class="flex items-center gap-1 hover:text-gray-900 transition-colors"
    >
      <span>
        {{ totalParticipants }} / {{ event.maxParticipants }} участников
        <span v-if="waitlistParticipants.length > 0" class="text-amber-600">
          (в резерве: {{ waitlistParticipants.length }})
        </span>
      </span>
      <ChevronDown
        v-if="localExpanded"
        class="w-4 h-4"
      />
      <ChevronRight
        v-else
        class="w-4 h-4"
      />
    </button>
  </div>

  <div v-if="isExpanded" class="mt-3 space-y-3">
    <!-- Основные участники -->
    <div v-if="mainParticipants.length > 0">
      <h5 class="text-xs font-medium text-gray-700 mb-2">Участники:</h5>
      <div class="p-3 bg-slate-50 rounded-lg space-y-2">
        <div
          v-for="participant in mainParticipants"
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

    <!-- Резервные участники -->
    <div v-if="waitlistParticipants.length > 0">
      <h5 class="text-xs font-medium text-amber-700 mb-2 flex items-center gap-1.5">
        <UserX class="w-3.5 h-3.5" />
        В резерве ({{ waitlistParticipants.length }}):
      </h5>
      <div class="p-3 bg-amber-50 rounded-lg space-y-2">
        <div
          v-for="participant in waitlistParticipants"
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
            class="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-medium"
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
