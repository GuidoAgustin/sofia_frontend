<template>
  <VueModal size="sm" position="right" class="vt-filters-modal" ref="modal">
    <template #title>
      <span class="material-symbols-outlined"> tune </span>
      <span>FILTROS</span>
    </template>
    <template #body>
      <VueTableFiltersSection label="Cantidad de filas" :options="showOpts" v-model="result.showing" />
      <!-- <VueTableFiltersSection label="Ordenado por" :options="sortOpts" v-model="result.sort" /> -->
      <VueTableFiltersSection
        section-type="select-multiple"
        label="Ocultar Columnas"
        :options="hideOpts"
        v-model="result.hidden"
        v-if="hideOpts.length"
      />

      <VueTableFiltersSection
        v-for="(f, fi) of filters"
        :key="fi"
        :section-type="f.type"
        :options="f.options"
        :label="f.title"
        :moduleName="f.module"
        v-model="result[f.column]"
      />
    </template>
    <template #footer>
      <a href="#" class="underlined text-medium" @click="clearAll">Limpiar filtros</a>
      <button class="btn btn-sm btn-medium" @click="applyFilters">Aplicar filtros</button>
    </template>
  </VueModal>
</template>

<script>
import VueModal from '@/components/Modal/VueModal.vue'
import VueTableFiltersSection from './VueTableFiltersSection.vue'

export default {
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    },
    defaultValue: {
      type: String,
      default: ''
    },
    showOpts: {
      type: Array,
      default: () => []
    },
    sortOpts: {
      type: Array,
      default: () => []
    },
    hideOpts: {
      type: Array,
      default: () => []
    },
    filters: {
      type: Array,
      default: () => []
    }
  },
  components: {
    VueModal,
    VueTableFiltersSection
  },
  data: () => ({
    result: {}
  }),
  mounted() {
    this.result = JSON.parse(JSON.stringify(this.modelValue))
  },
  methods: {
    close() {
      this.$refs.modal.close()
    },
    clearAll() {
      this.result = JSON.parse(this.defaultValue)
    },
    applyFilters() {
      this.$emit('filter', this.result)
      this.close()
    }
  }
}
</script>
