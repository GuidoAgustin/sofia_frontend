export default [
  {
    icon: 'fa-solid fa-book',
    title: 'Vistas',
    to: null,
    children: [
      {
        icon: 'fa-solid fa-gauge-high',
        title: 'Panel Central',
        to: '/dashboard'
      },
      {
        icon: 'fa fa-shopping-basket',
        title: 'Ventas',
        to: '/ventas'
      },
      {
        icon: 'fa-solid fa-calculator',
        title: 'Calculadora',
        to: '/calculadora'
      },
      {
        icon: 'fa-solid fa-table',
        title: 'Productos',
        to: '/products'
      },
      {
        icon: 'fa-solid fa-store',
        title: 'Agregar Productos',
        to: '/addProducts'
      },
      {
        icon: 'fa-solid fa-barcode',
        title: 'Escanea Productos',
        to: 'products/scan'
      },
    ]
  },
  {
    icon: 'fa-solid fa-gear',
    title: 'Opciones',
    to: '/opciones',
    children: null
  }
]
