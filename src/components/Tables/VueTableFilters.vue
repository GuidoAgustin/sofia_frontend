<template>
  <div class="v-table-filters">
    <div class="vt-search">
      <input
        v-if="searchable"
        type="text"
        placeholder="buscar..."
        class="form-control"
        @keyup.enter="search"
      />
    </div>

    <div class="vt-filters">
      <div class="vt-filters-wrapper" v-if="showFiltersButton">
        <button class="btn btn-sm btn-medium" @click="showFilters = true">
          <span class="material-symbols-outlined"> tune </span>
        </button>
        <button class="btn btn-sm btn-outline-medium disabled">
          <span class="material-symbols-outlined"> filter_list </span>
          <span>Ordenado: {{ sortedBy }}</span>
        </button>
      </div>

      <Teleport to="#modal-container">
        <VueTableFiltersModal
          v-if="showFilters"
          @close="showFilters = false"
          v-model="result"
          @filter="applyFilters"
          :defaultValue="resultDefault"
          :sortOpts="sortOpts"
          :showOpts="showOpts"
          :hideOpts="hideOpts"
          :filters="filters"
        />
      </Teleport>
    </div>
  </div>
</template>

<script>
import VueTableFiltersModal from './VueTableFiltersModal.vue'

/**
 * # INPUT
 * - lastPage | required
 *
 * # OUTPUT
 * - changing_page
 * - searching
 * - changing_showing
 */
export default {
  props: {
    searchable: {
      type: [Boolean, Number],
      default: true
    },
    filters: {
      type: [Array],
      default: () => []
    },
    headers: {
      type: Array,
      default: () => []
    },
    showFiltersButton: {
      type: Boolean,
      default: true
    }
  },
  components: {
    VueTableFiltersModal
  },
  data() {
    return {
      showFilters: false,
      showOpts: [10, 25, 50, 100],
      types_default_values: {
        select: null,
        'select-multiple': [],
        date: null,
        'date-range': { start: null, end: null },
        combobox: null
      },
      resultDefault: '',
      result: {
        showing: 10,
        sort: null,
        hidden: []
      }
    }
  },
  showModal: false,
  computed: {
    sortedBy() {
      if (!this.result.sort) return 'Last update'

      return this.sortOpts.find((x) => x.value === this.result.sort)?.name
    },
    sortOpts() {
      const sortableCols = this.headers.filter((x) => x.sortable)

      return [
        {
          value: 'null',
          label: 'Sin orden'
        },
        ...sortableCols.map((x) => ({
          value: `${x.sort_value || x.mask}__asc`,
          label: `${x.mask.ucwords()} - ASC`
        })),
        ...sortableCols.map((x) => ({
          value: `${x.sort_value || x.mask}__desc`,
          label: `${x.mask.ucwords()} - DESC`
        }))
      ].sort((a, b) => (a.label < b.label ? -1 : 1))
    },
    hideOpts() {
      return this.headers
        .filter((x) => x.hideable)
        .map((x) => ({
          value: x.mask || x.title,
          label: x.mask?.ucwords() || x.title.ucwords()
        }))
    }
  },
  mounted() {
    if (this.filters.length) {
      for (const f of this.filters) {
        this.result[f.column] = this.types_default_values[f.type]
      }
    }
    this.resultDefault = JSON.stringify(this.result)

    this.loadFilters()
  },
  methods: {
    loadFilters() {
      const route = this.$route.fullPath.replaceAll('/', '_')

      const inMemoryFilters = localStorage.getItem(`vt_filters_${route}`)

      if (inMemoryFilters) {
        const DEFAULT_KEYS = Object.keys(JSON.parse(this.resultDefault)).sort().join(',')
        const INMEMORY_KEYS = Object.keys(JSON.parse(inMemoryFilters)).sort().join(',')

        if (DEFAULT_KEYS === INMEMORY_KEYS) {
          this.result = JSON.parse(inMemoryFilters)
          this.applyFilters(this.result)
        }
      }
    },
    saveFilters(evt) {
      this.result = evt
      const route = this.$route.fullPath.replaceAll('/', '_')
      localStorage.setItem(`vt_filters_${route}`, JSON.stringify(this.result))
    },
    applyFilters(evt) {
      this.saveFilters(evt)
      this.$emit('filter', evt)
    },

    search(evt) {
      this.$emit('search', evt.target.value)
    }
  }
}
</script>
