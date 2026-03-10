<script setup>
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
    <!-- Шапка -->
    <header class="bg-white border-b border-gray-200 px-6 py-4 shrink-0">
      <div class="flex items-center justify-center">
        <h1 class="text-2xl font-bold text-gray-900">Календарь тренировок</h1>
      </div>
    </header>

    <!-- Контент -->
    <main class="p-6">
      <RouterView />
    </main>
  </div>
</template>
