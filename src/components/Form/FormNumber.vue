<template>
  <div class="form-container" :class="{ disabled }">
    <i class="icon" :class="icon" v-if="icon"></i>
    <input type="number" placeholder=" " :id="itemId" v-model="result" />
    <label :for="itemId">{{ label }}</label>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Number,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    itemId: null,
  }),
  computed: {
    result: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value !== "" ? value : null);
      },
    },
  },
  mounted() {
    this.fillId();
  },
  methods: {
    fillId() {
      this.itemId = Math.floor(Math.random() * Date.now());
    },
  },
};
</script>

<style></style>
