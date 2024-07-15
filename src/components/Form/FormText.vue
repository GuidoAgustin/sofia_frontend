<template>
  <div class="form-container" :class="{ disabled, 'form-textarea': textarea }">
    <label :for="itemId">{{ label }}</label>
    <div class="form-wrapper">
      <div class="icon" v-if="icon">
        <i :class="icon"></i>
      </div>
      <input
        :id="itemId"
        v-model="result"
        :type="password ? 'password' : 'text'"
        @input="updateValue"
        @keydown.enter="$emit('keydownEnter')"
        @click="$emit('click', $event)"
        v-if="!textarea"
      />
      <textarea placeholder=" " :rows="textareaRows" :id="itemId" v-model="result" v-else />
    </div>
    <p
      v-if="maxChars"
      style="margin: 0.25em 0 0 0; text-align: right; font-size: 0.7em"
      :class="{ 'text-danger': (modelValue ? modelValue.length : 0) > maxChars }"
    >
      {{ maxChars - (modelValue ? modelValue.length : 0) }}/{{ maxChars }} characters
    </p>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: 'Nombre'
    },
    icon: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    password: {
      type: Boolean,
      default: false
    },
    textarea: {
      type: Boolean,
      default: false
    },
    textareaRows: {
      type: Number,
      default: 5
    },
    maxChars: {
      type: [Number, String],
      default: null
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
        this.$emit('update:modelValue', value)
      }
    }
  },
  mounted() {
    this.fillId()
  },
  methods: {
    fillId() {
      this.itemId = Math.floor(Math.random() * Date.now())
    },
    updateValue({ target: { value } }) {
      if (this.maxChars && value.length > this.maxChars) {
        this.result = value.slice(0, this.maxChars)
      } else {
        this.result = value
      }
    }
  }
}
</script>

<style></style>
