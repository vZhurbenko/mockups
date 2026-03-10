import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/training-calendar",
    },
    {
      path: "/training-calendar",
      name: "training-calendar",
      component: () => import("@/views/TrainingCalendar.vue"),
    },
  ],
});

export default router;
