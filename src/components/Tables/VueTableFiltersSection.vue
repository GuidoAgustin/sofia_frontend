<template>
  <div
    class="filters-section"
    :class="{ collapse: isCollapse, collapsed: isCollapse && collapsed }"
  >
    <FormSelect
      :label="label"
      flex-field
      :options="options"
      v-model="result"
      v-if="sectionType === 'select'"
    />
    <FormDate :label="label" flex-field v-model="result" v-else-if="sectionType === 'date'" />
    <FormDateRange
      :label="label"
      flex-field
      v-model="result"
      v-else-if="sectionType === 'date-range'"
    />

    <template v-else>
      <div class="filters-section-head" @click="collapsed = !collapsed">
        <h6>{{ label }}</h6>
        <div class="icon">
          <i class="fa fa-chevron-down"></i>
        </div>
      </div>
      <div class="filters-section-body">
        <div :class="`filters-type-${sectionType}`">
          <FormCheckbox
            :label="o.name || o"
            v-for="(o, i) of options"
            :key="i"
            :value="o.value || o"
            v-model="result"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import FormCheckbox from '@/components/Form/FormCheckbox.vue'
import FormSelect from '@/components/Form/FormSelect.vue'
import FormDate from '@/components/Form/FormDate.vue'
import FormDateRange from '@/components/Form/FormDateRange.vue'

export default {
  components: {
    FormCheckbox,
    FormDate,
    FormDateRange,
    FormSelect
  },
  props: {
    modelValue: {
      type: [Number, String, Array, Object],
      default: null
    },
    sectionType: {
      type: String,
      validator: (value) => ['select', 'select-multiple', 'date', 'date-range'].includes(value),
      default: 'select'
    },
    options: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: null
    }
  },
  computed: {
    result: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('update:modelValue', val)
      }
    },
    isCollapse() {
      return ['select-multiple'].includes(this.sectionType)
    }
  },
  data: () => ({
    collapsed: true
  }),
  mounted() {
    if (this.modelValue || this.modelValue?.length) {
      this.collapsed = false
    }
  }
}
</script>
