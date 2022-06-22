export default [
  {
    icon: "fa-solid fa-gauge-high",
    title: "Dashboard",
    to: "/dashboard",
    children: null,
  },
  {
    icon: "fa-solid fa-book",
    title: "Menu 1",
    to: null,
    children: [
      {
        icon: "fa-solid fa-list",
        title: "Submenu 1",
        to: null,
      },
      {
        icon: "fa-solid fa-burger",
        title: "Submenu 2",
        to: null,
      },
    ],
  },
  {
    icon: "fa-solid fa-people-group",
    title: "Usuarios",
    to: null,
    children: null,
  },
  {
    icon: "fa-solid fa-gear",
    title: "Opciones",
    to: null,
    children: null,
  },
];
