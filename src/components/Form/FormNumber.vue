<template>
  <div class="form-container" :class="{ disabled }">
    <label :for="itemId">{{ label }}</label>
    <div class="form-wrapper">
      <div class="icon" v-if="icon">
        <i :class="icon"></i>
      </div>
      <input type="number" placeholder=" " :id="itemId" v-model="result" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Number,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    itemId: null
  }),
  computed: {
    result: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value !== '' ? value : null)
      }
    }
  },
  mounted() {
    this.fillId()
  },
  methods: {
    fillId() {
      this.itemId = Math.floor(Math.random() * Date.now())
    }
  }
}
</script>

<style></style>
