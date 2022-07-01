import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VCalendar from "v-calendar";
import toast from "./utils/toast";
import alert from "./utils/alert";
import VueTables from "./components/Tables";
import VueModal from "./components/Modal";

import "v-calendar/dist/style.css";
import "./assets/scss/styles.scss";

createApp(App)
  .use(store)
  .use(router)
  .use(toast)
  .use(alert)
  .use(VCalendar, {})
  .use(VueTables)
  .use(VueModal)
  .use(VueModal)
  .mount("#app");
