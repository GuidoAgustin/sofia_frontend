import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VCalendar from "v-calendar";
import toast from "./utils/toast";
import VueTables from "./components/Tables";

import "v-calendar/dist/style.css";
import "./assets/scss/styles.scss";

createApp(App)
  .use(store)
  .use(router)
  .use(toast)
  .use(VCalendar, {})
  .use(VueTables)
  .mount("#app");
