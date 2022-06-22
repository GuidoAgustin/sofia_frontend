<template>
  <div class="card widget">
    <div class="card-header">
      <i class="widget-icon" :class="icon" v-if="icon"></i>
      <h3><slot name="title">Widget Title</slot></h3>
    </div>
    <div class="card-body">
      <slot>Widget Body</slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: null,
    },
  },
};
</script>

<style></style>
