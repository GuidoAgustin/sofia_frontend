<template>
  <div class="form-container form-switch" :class="{ disabled, small }">
    <i class="icon" :class="icon" v-if="icon"></i>
    <input type="checkbox" :id="itemId" v-model="result" />
    <label :for="itemId">{{ label }}</label>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      default: null,
    },
    label: {
      type: String,
      default: "Nombre",
    },
    icon: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    small: {
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
        this.$emit("update:modelValue", value);
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
