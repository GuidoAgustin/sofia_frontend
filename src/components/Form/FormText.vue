<template>
  <div class="form-container" :class="{ disabled, 'form-textarea': textarea }">
    <i class="icon" :class="icon" v-if="icon"></i>
    <input
      :type="password ? 'password' : 'text'"
      placeholder=" "
      :id="itemId"
      v-model="result"
      v-if="!textarea"
    />
    <textarea
      placeholder=" "
      :rows="textareaRows"
      :id="itemId"
      v-model="result"
      v-else
    />
    <label :for="itemId">{{ label }}</label>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
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
    password: {
      type: Boolean,
      default: false,
    },
    textarea: {
      type: Boolean,
      default: false,
    },
    textareaRows: {
      type: Number,
      default: 5,
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
