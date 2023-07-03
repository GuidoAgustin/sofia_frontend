import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: () => import("@/views/Auth/Login.vue"),
  },
  {
    path: "/",
    component: () => import("@/views/Dashboard/DashboardLayout.vue"),
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/Dashboard/Dashboard.vue"),
      },
      {
        path: "forms",
        component: () => import("@/views/UI/Forms.vue"),
      },
      {
        path: "tables",
        component: () => import("@/views/UI/Tables.vue"),
      },
      {
        path: "modals",
        component: () => import("@/views/UI/Modals.vue"),
      },
      {
        path: "opciones",
        component: () => import("@/views/Dashboard/Options.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
