<template>
  <Widget>
    <template #title>Vue Tables</template>
    <vue-table
      v-if="vTable.headers"
      :values="vTable.values"
      :headers="vTable.headers"
      :actions="vTable.actions"
      :options="vTable.options"
      ref="vtable"
    />
  </Widget>
</template>

<script>
import Widget from "@/components/Widget.vue";
export default {
  components: {
    Widget,
  },
  data: () => ({
    vTable: {
      headers: [
        {
          title: "name",
          sortable: true,
        },
        {
          title: "username",
          sortable: true,
        },
      ],
      actions: [
        /// Go to ACTIONS SECTION for explanation
      ],
      values: {
        total: 3,
        per_page: 15,
        current_page: 1,
        last_page: 1,
        from: 1,
        to: 15,
        data: [
          {
            id: 1,
            name: "Pedro Aznar",
            username: "paznar",
          },
          {
            id: 2,
            name: "Charlie Alberti",
            username: "chalberti",
          },
          {
            id: 3,
            name: "Gustavo Cerati",
            username: "gcerati",
          },
        ],
      },
      options: {
        /// Go to OPTIONS SECTION for explanation
      },
    },
  }),
};
</script>

<style></style>
