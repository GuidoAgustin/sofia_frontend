import VueTable from "./VueTable.vue";

export default {
  install: (app) => {
    app.component("vue-table", VueTable);
  },
};
