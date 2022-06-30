import Toast from "vue-toastification";
import { useToast } from "vue-toastification";

import "vue-toastification/dist/index.css";

export default {
  install: async (app) => {
    const toast = useToast();

    app.use(Toast, {});

    app.config.globalProperties.$toast = toast;
    app.config.globalProperties.$store.$toast = toast;
  },
};
