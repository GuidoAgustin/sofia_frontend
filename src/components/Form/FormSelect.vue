<template>
  <div class="form-container" :class="{ disabled }">
    <i class="icon" :class="icon" v-if="icon"></i>
    <select :id="itemId" v-model="result" :multiple="multiple">
      <option :value="opt.value" v-for="opt in options" :key="opt.value">
        {{ opt.name }}
      </option>
    </select>
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
    options: {
      type: Array,
      default: () => [],
    },
    icon: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    multiple: {
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
