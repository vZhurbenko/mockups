import { defineStore } from "pinia";
import { ref, computed } from "vue";

// Моковые данные участников
const mockParticipants = [
  { ID: 1, NAME: "Алексей", LAST_NAME: "Иванов", PERSONAL_PHOTO_LINK: null },
  { ID: 2, NAME: "Дмитрий", LAST_NAME: "Петров", PERSONAL_PHOTO_LINK: null },
  { ID: 3, NAME: "Сергей", LAST_NAME: "Сидоров", PERSONAL_PHOTO_LINK: null },
  { ID: 4, NAME: "Максим", LAST_NAME: "Козлов", PERSONAL_PHOTO_LINK: null },
  { ID: 5, NAME: "Андрей", LAST_NAME: "Новиков", PERSONAL_PHOTO_LINK: null },
];

// Моковые события
const mockEvents = [
  {
    id: 1,
    type: "training",
    title: "Тренировка по баскетболу",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 5, 19, 0),
    endTime: new Date(new Date().getFullYear(), new Date().getMonth(), 5, 21, 0),
    location: "СК Олимпийский",
    address: "ул. Спортивная, 1",
    participants: [mockParticipants[0], mockParticipants[1], mockParticipants[2]],
    maxParticipants: 12,
    description: "Обычная тренировка, отработка бросков",
  },
  {
    id: 2,
    type: "game",
    title: "Игра с командой Eagles",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 8, 14, 0),
    endTime: new Date(new Date().getFullYear(), new Date().getMonth(), 8, 16, 0),
    location: "Стадион Динамо",
    address: "пр. Ленина, 45",
    opponent: "Eagles BC",
    participants: [mockParticipants[0], mockParticipants[1], mockParticipants[2], mockParticipants[3]],
    maxParticipants: 10,
    description: "Товарищеский матч",
  },
  {
    id: 3,
    type: "training",
    title: "Тренировка по футболу",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 12, 18, 30),
    endTime: new Date(new Date().getFullYear(), new Date().getMonth(), 12, 20, 30),
    location: "Поле №5",
    address: "ул. Зеленая, 10",
    participants: [mockParticipants[3], mockParticipants[4]],
    maxParticipants: 16,
    description: "Тактическая подготовка",
  },
  {
    id: 4,
    type: "game",
    title: "Игра с командой Tigers",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 15, 12, 0),
    endTime: new Date(new Date().getFullYear(), new Date().getMonth(), 15, 14, 0),
    location: "Арена 2000",
    address: "ул. Мира, 100",
    opponent: "Tigers United",
    participants: [mockParticipants[0]],
    maxParticipants: 10,
    description: "Выездная игра",
  },
  {
    id: 5,
    type: "training",
    title: "Интенсивная тренировка",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 20, 19, 0),
    endTime: new Date(new Date().getFullYear(), new Date().getMonth(), 20, 21, 30),
    location: "СК Олимпийский",
    address: "ул. Спортивная, 1",
    participants: [],
    maxParticipants: 14,
    description: "Подготовка к сезону",
  },
  {
    id: 6,
    type: "game",
    title: "Игра с командой Bears",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 25, 15, 0),
    endTime: new Date(new Date().getFullYear(), new Date().getMonth(), 25, 17, 0),
    location: "Стадион Динамо",
    address: "пр. Ленина, 45",
    opponent: "Bears FC",
    participants: [mockParticipants[0], mockParticipants[1], mockParticipants[2], mockParticipants[3], mockParticipants[4]],
    maxParticipants: 10,
    description: "Домашняя игра",
  },
  {
    id: 7,
    type: "training",
    title: "Тренировка по баскетболу",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 28, 19, 0),
    endTime: new Date(new Date().getFullYear(), new Date().getMonth(), 28, 21, 0),
    location: "СК Олимпийский",
    address: "ул. Спортивная, 1",
    participants: [mockParticipants[0], mockParticipants[1]],
    maxParticipants: 12,
    description: "Работа в защите",
  },
];

export const useTrainingCalendarStore = defineStore("trainingCalendar", () => {
  // Состояние
  const currentDate = ref(new Date());
  const selectedDate = ref(null);
  const events = ref(mockEvents);
  const currentUserId = ref(1);

  // Вычисляемые свойства
  const currentYear = computed(() => currentDate.value.getFullYear());
  const currentMonth = computed(() => currentDate.value.getMonth());

  const selectedDateEvents = computed(() => {
    if (!selectedDate.value) return [];
    return events.value.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === selectedDate.value.getDate() &&
        eventDate.getMonth() === selectedDate.value.getMonth() &&
        eventDate.getFullYear() === selectedDate.value.getFullYear()
      );
    });
  });

  const upcomingEvents = computed(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return events.value
      .filter((event) => new Date(event.date) >= now)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  });

  const monthEvents = computed(() => {
    return events.value.filter(
      (event) =>
        new Date(event.date).getMonth() === currentMonth.value &&
        new Date(event.date).getFullYear() === currentYear.value
    );
  });

  // Методы
  function goToMonth(year, month) {
    currentDate.value = new Date(year, month, 1);
  }

  function goToPreviousMonth() {
    currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1);
  }

  function goToNextMonth() {
    currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1);
  }

  function goToToday() {
    currentDate.value = new Date();
  }

  function selectDate(date) {
    selectedDate.value = date;
  }

  function toggleParticipation(eventId) {
    const event = events.value.find((e) => e.id === eventId);
    if (!event) return;

    const isParticipating = event.participants.some((p) => p.ID === currentUserId.value);

    if (isParticipating) {
      event.participants = event.participants.filter((p) => p.ID !== currentUserId.value);
    } else {
      if (event.participants.length < event.maxParticipants) {
        event.participants.push({
          ID: currentUserId.value,
          NAME: "Текущий",
          LAST_NAME: "Пользователь",
          PERSONAL_PHOTO_LINK: null,
        });
      }
    }
  }

  function isParticipating(eventId) {
    const event = events.value.find((e) => e.id === eventId);
    if (!event) return false;
    return event.participants.some((p) => p.ID === currentUserId.value);
  }

  return {
    // State
    currentDate,
    selectedDate,
    events,
    currentUserId,
    // Getters
    currentYear,
    currentMonth,
    selectedDateEvents,
    upcomingEvents,
    monthEvents,
    // Actions
    goToMonth,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    selectDate,
    toggleParticipation,
    isParticipating,
  };
});
