# Weekend Request BX24 — Проект мок-апов UI

**Коллекция UI мок-апов** для демонстрации архитектурных подходов и UX-паттернов при построении интерфейсов.

> ⚠️ **Важно:** Этот проект — **не готовое решение**, а набор мок-апов для демонстрации принципов построения UI. Дизайн (цвета, оформление) и логика могут отличаться в реальных приложениях.

---

## 📋 О проекте

Этот проект создан на базе **Vue 3 Starter Template** и используется для:
- Быстрого прототипирования UI-компонентов
- Демонстрации UX-паттернов
- Тестирования архитектурных решений
- Создания визуальных концепций

### **Текущие мок-апы**

| Мок-ап | Описание | Путь |
|--------|----------|------|
| 🗓️ **Календарь тренировок** | Календарь событий с записью участников, waitlist, группировкой по дням | `/training-calendar` |
| 📄 **Заявка на выходные** (legacy) | Форма заявки на работу в выходные дни | `/weekend-request` |
| ✅ **Сводный отчёт** (legacy) | Страница согласования заявок руководителем | `/approval` |

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
| `@vueuse/core` | 200+ композируемых утилит |
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
│   │   ├── counter.js       # Pinia store (пример)
│   │   └── trainingCalendar.js  # Мок-ап календаря
│   ├── components/
│   │   └── training-calendar/   # Компоненты календаря
│   └── views/
│       └── TrainingCalendar.vue # Вьюха календаря
├── tasks/
│   └── training-calendar-mockup/
│       └── README.md        # Документация мок-апа
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

## 🗓️ Мок-ап: Календарь тренировок

### **Основная концепция**

Двухуровневая навигация через табы:
- **Календарь** — сетка месяца с событиями
- **События месяца** — список всех событий с группировкой по дням

### **Ключевые особенности**

1. **Двухколоночная карточка события**
   - Левая колонка: информация (название, время, место, участники)
   - Правая колонка: бейдж типа + кнопка действия

2. **Waitlist (резервный список)**
   - При превышении лимита участники попадают в резерв
   - Отображение: "3 / 10 участников (в резерве: 1)"

3. **Модалка дня**
   - Клик на день → модалка со всеми событиями
   - Кнопка "Добавить событие" для будущих дат

4. **Фильтр событий**
   - Сегментированный контроль: "Все события" / "Предстоящие"
   - Прошедшие события помечены бейджиком "Завершено"

5. **Адаптивность**
   - Desktop: краткое описание в ячейках календаря
   - Mobile: точки-индикаторы + панель событий снизу

### **Структура компонентов**

```
src/components/training-calendar/
├── CalendarHeader.vue     # Заголовок с навигацией
├── CalendarGrid.vue       # Сетка календаря
├── CalendarDay.vue        # Ячейка дня
├── EventsPanel.vue        # Список событий
├── EventCard.vue          # Карточка события
├── EventParticipants.vue  # Участники события
├── DayModal.vue           # Модалка дня
└── AddEventModal.vue      # Модалка добавления
```

📖 **Подробная документация:** [`tasks/training-calendar-mockup/README.md`](tasks/training-calendar-mockup/README.md)

---

## 🔧 Настройки

### **Path Aliases**

```js
import { useTrainingCalendarStore } from "@/stores/trainingCalendar";
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

### **Кастомная тема**

Синяя цветовая палитра в `src/styles/theme.css`:

```css
@theme inline {
  --color-primary-50: #f0f7fb;
  --color-primary-100: #cce4f5;
  --color-primary-500: #025ea1;
  --color-primary-600: #024a80;
  --color-primary-700: #01365c;
}
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
    expect(wrapper.text()).toContain('Календарь тренировок');
  });
});
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

## 🎯 Рекомендации по разработке

### **Создание нового мок-апа**

1. Создать ветку: `git checkout -b feature/new-mockup`
2. Создать структуру:
   ```
   src/views/NewMockup.vue
   src/components/new-mockup/
   src/stores/newMockup.js
   ```
3. Добавить маршрут в `src/router/index.js`
4. Задокументировать в `tasks/new-mockup/README.md`

### **State Management (Pinia)**

```js
// stores/newMockup.js
import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useNewMockupStore = defineStore("newMockup", () => {
  const items = ref([]);
  const filtered = computed(() => items.value.filter(i => i.active));

  function addItem(item) {
    items.value.push(item);
  }

  return { items, filtered, addItem };
});
```

### **Маршруты (Vue Router)**

```js
// router/index.js
const routes = [
  {
    path: "/new-mockup",
    name: "new-mockup",
    component: () => import("@/views/NewMockup.vue"),
  },
];
```

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
