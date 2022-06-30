<template>
  <FullPageLoader v-if="$store.getters.loader_active" />
  <router-view />
</template>

<script>
import FullPageLoader from "@/components/FullPageLoader.vue";

export default {
  components: {
    FullPageLoader,
  },
};
</script>
