<script setup>
import Layout from "@/components/Layout.vue";
</script>

<template>
  <div class="flex flex-col h-screen bg-gradient-to-br from-slate-100 to-slate-200">
    <!-- Шапка -->
    <header class="bg-white border-b border-gray-200 px-6 py-4 shrink-0">
      <div class="flex items-center justify-center">
        <h1 class="text-2xl font-bold text-gray-900">Мокапы</h1>
      </div>
    </header>

    <!-- Основной контент с сайдбаром -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Сайдбар -->
      <Layout />

      <!-- Контент страницы -->
      <main class="flex-1 overflow-auto">
        <div class="p-6">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>
