<template>
  <div class="form-container form-select" :class="{ disabled, 'flex-field': flexField }">
    <label :for="itemId">{{ label }}</label>
    <div class="form-wrapper">
      <i class="icon" :class="icon" v-if="icon"></i>
      <select :id="itemId" v-model="result" :multiple="multiple">
        <option :value="opt.value || opt" v-for="opt in options" :key="opt.value || opt">
          {{ opt.name || opt }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: [Number, String],
      default: null
    },
    label: {
      type: String,
      default: null
    },
    options: {
      type: Array,
      default: () => []
    },
    icon: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    flexField: {
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
