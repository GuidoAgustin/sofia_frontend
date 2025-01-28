import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/Auth/Login.vue')
  },

  {
    path: '/registro',
    component: () => import('@/views/Auth/Registro.vue')
  },

  {
    path: '/',
    component: () => import('@/views/Dashboard/DashboardLayout.vue'),
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/Dashboard/Dashboard.vue')
      },
      {
        path: 'products',
        name: 'Products list',
        component: () => import('@/views/UI/Tables.vue')
      },
      {
        path: 'calculadora',
        component: () => import('@/views/UI/Calculadora.vue')
      },
      {
        path: 'addProducts',
        component: () => import('@/views/UI/ProductsForm.vue')
      },
      {
        path: 'editProduct/:id',
        name: 'Editar Producto',
        component: () => import('@/views/UI/ProductsForm.vue'),
      },
      {
        path: 'products/scan/',
        component: () => import('@/views/UI/Scan.vue')
      },
      {
        path: 'opciones',
        component: () => import('@/views/Dashboard/Options.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
