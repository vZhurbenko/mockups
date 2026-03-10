<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { FileText, Eye, Calendar } from "lucide-vue-next";

const route = useRoute();

const navigation = [
  { name: "Заявка", href: "/weekend-request", icon: FileText },
  { name: "Сводный отчёт", href: "/approval", icon: Eye },
  { name: "Календарь", href: "/training-calendar", icon: Calendar },
];

const isActive = (path) => {
  return route.path === path;
};
</script>

<template>
  <aside class="w-64 bg-white border-r border-gray-200 flex flex-col">
    <!-- Навигация -->
    <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
      <router-link
        v-for="item in navigation"
        :key="item.name"
        :to="item.href"
        class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
        :class="[
          isActive(item.href)
            ? 'bg-primary-50 text-primary-700 font-medium'
            : 'text-gray-600 hover:bg-slate-100 hover:text-gray-900',
        ]"
      >
        <component :is="item.icon" class="w-5 h-5" />
        <span>{{ item.name }}</span>
      </router-link>
    </nav>
  </aside>
</template>
