<template>
  <FormCombobox
    :value="result"
    :options="options"
    :optionGetter="getOptions"
    @onSelectOption="onSelectOption"
    :label="label || 'Users'"
    :icon="icon"
    :disabled="disabled"
  />
</template>

<script>
import FormCombobox from '@/components/Form/FormCombobox.vue'

export default {
  props: {
    modelValue: {
      type: Object,
      default: null
    },
    label: {
      type: String,
      default: 'Combobox'
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
  components: {
    FormCombobox
  },
  data: () => ({
    options: []
  }),
  computed: {
    result: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('update:modelValue', val)
      }
    }
  },
  methods: {
    getOptions(search) {
      const opts = [
        { value: 1, label: 'John Smith' },
        { value: 2, label: 'Emily Johnson' },
        { value: 3, label: 'Michael Brown' },
        { value: 4, label: 'Emma Davis' },
        { value: 5, label: 'James Wilson' },
        { value: 6, label: 'Olivia Taylor' },
        { value: 7, label: 'David Moore' },
        { value: 8, label: 'Sophia Anderson' },
        { value: 9, label: 'Daniel Thomas' },
        { value: 10, label: 'Grace Jackson' }
      ]

      // Emulate api call
      return new Promise((resolve) => {
        setTimeout(() => {
          if (!search) {
            this.options = [...opts]
          } else {
            this.options = opts.filter((x) => x.label.toLowerCase().includes(search.toLowerCase()))
          }
          resolve()
        }, 250)
      })
    },
    onSelectOption(option) {
      this.result = option
    }
  }
}
</script>
