import { defineStore } from "pinia";
import { ref, computed } from "vue";

// Моковые данные участников
const mockParticipants = [
  { ID: 1, NAME: "Алексей", LAST_NAME: "Иванов", PERSONAL_PHOTO_LINK: null },
  { ID: 2, NAME: "Дмитрий", LAST_NAME: "Петров", PERSONAL_PHOTO_LINK: null },
  { ID: 3, NAME: "Сергей", LAST_NAME: "Сидоров", PERSONAL_PHOTO_LINK: null },
  { ID: 4, NAME: "Максим", LAST_NAME: "Козлов", PERSONAL_PHOTO_LINK: null },
  { ID: 5, NAME: "Андрей", LAST_NAME: "Новиков", PERSONAL_PHOTO_LINK: null },
  { ID: 6, NAME: "Павел", LAST_NAME: "Морозов", PERSONAL_PHOTO_LINK: null },
  { ID: 7, NAME: "Илья", LAST_NAME: "Волков", PERSONAL_PHOTO_LINK: null },
  { ID: 8, NAME: "Олег", LAST_NAME: "Соколов", PERSONAL_PHOTO_LINK: null },
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
    participants: [
      mockParticipants[1], mockParticipants[2], // Основные
      { ...mockParticipants[5], isWaitlist: true }, // В резерве
    ],
    maxParticipants: 2,
    description: "Обычная тренировка, отработка бросков",
  },
  {
    id: 8,
    type: "training",
    title: "Тренировка по футболу",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 5, 17, 0),
    endTime: new Date(new Date().getFullYear(), new Date().getMonth(), 5, 18, 30),
    location: "Поле №3",
    address: "ул. Спортивная, 3",
    participants: [mockParticipants[3]], // ID: 4
    maxParticipants: 16,
    description: "Тактическая подготовка",
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
    participants: [mockParticipants[1], mockParticipants[2], mockParticipants[3]], // ID: 2, 3, 4
    maxParticipants: 10,
    description: "Товарищеский матч",
  },
  {
    id: 9,
    type: "training",
    title: "Тренировка вратарей",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 8, 10, 0),
    endTime: new Date(new Date().getFullYear(), new Date().getMonth(), 8, 12, 0),
    location: "Стадион Динамо",
    address: "пр. Ленина, 45",
    participants: [], // Пусто
    maxParticipants: 6,
    description: "Специализированная тренировка для вратарей",
  },
  {
    id: 3,
    type: "training",
    title: "Тренировка по футболу",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 12, 18, 30),
    endTime: new Date(new Date().getFullYear(), new Date().getMonth(), 12, 20, 30),
    location: "Поле №5",
    address: "ул. Зеленая, 10",
    participants: [], // Пусто - можно записаться
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
    participants: [mockParticipants[0]], // ID: 1 - уже записан
    maxParticipants: 10,
    description: "Выездная игра",
  },
  {
    id: 10,
    type: "training",
    title: "ОФП и растяжка",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 15, 9, 0),
    endTime: new Date(new Date().getFullYear(), new Date().getMonth(), 15, 10, 30),
    location: "Зал №2",
    address: "ул. Мира, 100",
    participants: [mockParticipants[2]], // ID: 3
    maxParticipants: 10,
    description: "Общая физическая подготовка",
  },
  {
    id: 5,
    type: "training",
    title: "Интенсивная тренировка",
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 20, 19, 0),
    endTime: new Date(new Date().getFullYear(), new Date().getMonth(), 20, 21, 30),
    location: "СК Олимпийский",
    address: "ул. Спортивная, 1",
    participants: [], // Пусто - можно записаться
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
    participants: [mockParticipants[1], mockParticipants[2], mockParticipants[3], mockParticipants[4]], // Без ID: 1
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
    participants: [mockParticipants[1]], // ID: 2 (без ID: 1)
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
    const eventIndex = events.value.findIndex((e) => e.id === eventId);
    if (eventIndex === -1) return;

    const event = events.value[eventIndex];
    const isParticipating = event.participants.some((p) => p.ID === currentUserId.value);

    if (isParticipating) {
      // Если пользователь в основных участниках - убираем его
      const mainParticipantIndex = event.participants.findIndex(
        (p) => p.ID === currentUserId.value && !p.isWaitlist
      );
      if (mainParticipantIndex !== -1) {
        event.participants.splice(mainParticipantIndex, 1);
      } else {
        // Если в waitlist - убираем оттуда
        event.participants = event.participants.filter((p) => p.ID !== currentUserId.value);
      }
    } else {
      if (event.participants.filter((p) => !p.isWaitlist).length < event.maxParticipants) {
        // Есть место в основных
        event.participants.push({
          ID: currentUserId.value,
          NAME: "Текущий",
          LAST_NAME: "Пользователь",
          PERSONAL_PHOTO_LINK: null,
          isWaitlist: false,
        });
      } else {
        // Нет места - добавляем в waitlist
        const alreadyInWaitlist = event.participants.some(
          (p) => p.ID === currentUserId.value && p.isWaitlist
        );
        if (!alreadyInWaitlist) {
          event.participants.push({
            ID: currentUserId.value,
            NAME: "Текущий",
            LAST_NAME: "Пользователь",
            PERSONAL_PHOTO_LINK: null,
            isWaitlist: true,
          });
        }
      }
    }

    // Обновляем массив событий для триггера реактивности
    events.value = [...events.value];
  }

  function isParticipating(eventId) {
    const event = events.value.find((e) => e.id === eventId);
    if (!event) return false;
    return event.participants.some((p) => p.ID === currentUserId.value);
  }

  function isOnWaitlist(eventId) {
    const event = events.value.find((e) => e.id === eventId);
    if (!event) return false;
    return event.participants.some(
      (p) => p.ID === currentUserId.value && p.isWaitlist
    );
  }

  function getWaitlistCount(eventId) {
    const event = events.value.find((e) => e.id === eventId);
    if (!event) return 0;
    return event.participants.filter((p) => p.isWaitlist).length;
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
    isOnWaitlist,
    getWaitlistCount,
  };
});
