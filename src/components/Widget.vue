<template>
  <div class="card widget h-auto">
    <div class="card-header">
      <i class="widget-icon" :class="icon" v-if="icon"></i>
      <h3 class="w-100"><slot name="title">Widget Title</slot></h3>

      <div class="buttons"><slot name="buttons"> </slot></div>
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
