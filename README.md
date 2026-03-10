# Vue 3 Starter Template

Современный универсальный шаблон проекта на **Vue 3** + **Vite** с полным набором инструментов для разработки.

---

## 🚀 Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev

# Сборка для production
npm run build

# Запуск тестов
npm run test:unit

# Линтинг и форматирование
npm run lint
npm run format
```

---

## 📦 Стек технологий

### **Основные**

| Технология | Версия | Назначение |
|------------|--------|------------|
| [Vue 3](https://vuejs.org/) | 3.5+ | Фреймворк (Composition API, `<script setup>`) |
| [Vite](https://vite.dev/) | 7+ | Сборка и dev-сервер |
| [Pinia](https://pinia.vuejs.org/) | 3+ | Управление состоянием |
| [Vue Router](https://router.vuejs.org/) | 5+ | Клиентская маршрутизация |
| [Tailwind CSS](https://tailwindcss.com/) | 4+ | Utility-first CSS |

### **UI и визуализация**

| Библиотека | Назначение |
|------------|------------|
| `lucide-vue-next` | 5000+ иконок |
| `@headlessui/vue` | UI-компоненты без стилей (Modal, Dropdown, Tabs) |
| `@fullcalendar/vue3` | Календарь событий |
| `chart.js` + `vue-chartjs` | Графики и диаграммы |
| `@tanstack/vue-table` | Мощные таблицы (сортировка, фильтрация, пагинация) |
| `vuedraggable` | Drag-n-drop элементов |
| `vue-cropper` | Обрезка изображений |
| `vue-sonner` | Toast-уведомления |

### **Формы и валидация**

| Библиотека | Назначение |
|------------|------------|
| `vee-validate` | Валидация форм |
| `yup` | Схемы валидации |

### **Работа с файлами**

| Библиотека | Назначение |
|------------|------------|
| `xlsx` | Экспорт/импорт Excel |
| `jspdf` + `jspdf-autotable` | Генерация PDF с таблицами |
| `markdown-it` | Рендеринг Markdown |

### **Утилиты**

| Библиотека | Назначение |
|------------|------------|
| `@vueuse/core` | 200+ композируемых утилит (useMouse, useLocalStorage, useFetch...) |
| `@vueuse/motion` | Анимации |
| `axios` | HTTP-запросы |
| `lodash-es` | Полезные функции |
| `date-fns` | Работа с датами |
| `clsx` + `tailwind-merge` | Умное объединение классов |

### **Качество кода**

| Инструмент | Назначение |
|------------|------------|
| `ESLint 10+` | Линтинг кода |
| `oxlint` | Быстрый линтер |
| `Vitest 4+` | Тестирование |
| `@vue/test-utils` | Утилиты для тестов Vue |

---

## 📁 Структура проекта

```
project/
├── src/
│   ├── main.js              # Точка входа (Pinia + Router)
│   ├── App.vue              # Корневой компонент
│   ├── index.css            # Глобальные стили (Tailwind)
│   ├── router/
│   │   └── index.js         # Маршруты
│   ├── stores/
│   │   └── counter.js       # Pinia store (пример)
│   └── __tests__/
│       └── App.spec.js      # Тесты
├── public/                  # Статические файлы
├── index.html               # HTML-шаблон
├── vite.config.js           # Конфигурация Vite
├── vitest.config.js         # Конфигурация Vitest
├── eslint.config.js         # Конфигурация ESLint
├── jsconfig.json            # Алиасы путей
├── package.json             # Зависимости
└── README.md                # Документация
```

---

## 🔧 Настройки

### **Path Aliases**

```js
import { useCounterStore } from "@/stores/counter";
```

Настроено в `vite.config.js` и `jsconfig.json`:
- `@/*` → `src/*`

### **Tailwind CSS 4**

Используется новая версия с Vite-плагином:

```js
// vite.config.js
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
});
```

### **Компоненты Vue**

Рекомендуемый синтаксис:

```vue
<script setup>
import { ref, computed } from "vue";
import { useCounterStore } from "@/stores/counter";

const count = ref(0);
const store = useCounterStore();
</script>

<template>
  <h1>{{ count }}</h1>
</template>

<style scoped>
/* scoped стили */
</style>
```

---

## 📚 Примеры использования

### **Иконки (Lucide)**

```vue
<script setup>
import { Camera, Home, User } from 'lucide-vue-next';
</script>

<template>
  <Camera :size="24" :color="'#333'" />
  <Home :size="32" />
  <User :stroke-width="1.5" />
</template>
```

### **Графики (Chart.js)**

```vue
<script setup>
import { ref } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartData = ref({
  labels: ['Январь', 'Февраль', 'Март'],
  datasets: [{
    label: 'Продажи',
    data: [10, 20, 30]
  }]
});
</script>

<template>
  <Line :data="chartData" />
</template>
```

### **Таблицы (@tanstack/vue-table)**

```vue
<script setup>
import {
  createColumnHelper,
  FlexRender,
  getCoreRowModel,
  useVueTable
} from '@tanstack/vue-table';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('name', {
    header: 'Имя',
  }),
  columnHelper.accessor('email', {
    header: 'Email',
  })
];

const data = ref([
  { name: 'Иван', email: 'ivan@example.com' },
  { name: 'Мария', email: 'maria@example.com' }
]);

const table = useVueTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel()
});
</script>

<template>
  <table>
    <thead>
      <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
        <th v-for="header in headerGroup.headers" :key="header.id">
          <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in table.getRowModel().rows" :key="row.id">
        <td v-for="cell in row.getVisibleCells()" :key="cell.id">
          <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
```

### **Календарь (@fullcalendar/vue3)**

```vue
<script setup>
import { ref } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  events: [
    { title: 'Событие 1', date: '2026-03-01' },
    { title: 'Событие 2', date: '2026-03-15' }
  ]
});
</script>

<template>
  <FullCalendar :options="calendarOptions" />
</template>
```

### **Уведомления (vue-sonner)**

```vue
<script setup>
import { Toaster, toast } from 'vue-sonner';

const showSuccess = () => {
  toast.success('Успешно сохранено!');
};

const showError = () => {
  toast.error('Произошла ошибка');
};
</script>

<template>
  <Toaster />
  <button @click="showSuccess">Показать успех</button>
  <button @click="showError">Показать ошибку</button>
</template>
```

### **@vueuse/core**

```vue
<script setup>
import { useMouse, useLocalStorage, useFetch } from '@vueuse/core';

const { x, y } = useMouse();
const state = useLocalStorage('my-key', 'default');
const { data, error } = useFetch('/api/data').json();
</script>

<template>
  <p>Мышь: {{ x }}, {{ y }}</p>
  <p>LocalStorage: {{ state }}</p>
  <pre>{{ data }}</pre>
</template>
```

---

## 🧪 Тестирование

```bash
# Запустить тесты
npm run test:unit

# Запустить с покрытием
npm run test:unit -- --coverage
```

Пример теста:

```js
// src/__tests__/App.spec.js
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import App from '../App.vue';

describe('App', () => {
  it('renders correctly', () => {
    const wrapper = mount(App);
    expect(wrapper.text()).toContain('You did it!');
  });
});
```

---

## 🎯 Рекомендации

### **State Management (Pinia)**

```js
// stores/counter.js
import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const double = computed(() => count.value * 2);

  function increment() {
    count.value++;
  }

  return { count, double, increment };
});
```

### **Маршруты (Vue Router)**

```js
// router/index.js
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: () => import("@/views/Home.vue") },
  { path: "/about", component: () => import("@/views/About.vue") }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
```

---

## 📝 Команды разработки

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск dev-сервера (HMR) |
| `npm run build` | Production сборка |
| `npm run preview` | Preview production сборки |
| `npm run test:unit` | Запуск тестов |
| `npm run lint` | Линтинг (oxlint + ESLint) |
| `npm run format` | Форматирование (oxfmt) |

---

## 🔗 Полезные ссылки

- [Vue 3 Docs](https://vuejs.org/)
- [Vite Docs](https://vite.dev/)
- [Pinia Docs](https://pinia.vuejs.org/)
- [Vue Router Docs](https://router.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [VueUse](https://vueuse.org/)
- [TanStack Table](https://tanstack.com/table/latest)
- [FullCalendar](https://fullcalendar.io/docs/vue)
- [Chart.js](https://www.chartjs.org/)

---

## 📄 Лицензия

MIT
