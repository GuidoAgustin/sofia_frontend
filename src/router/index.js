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
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
