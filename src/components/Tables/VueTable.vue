<template>
  <div>
    <VueTableFilters
      :searchable="opts.searchable"
      :filters="filters"
      :headers="headers"
      @search="searched"
      @filter="filtered"
    />

    <div class="v-table-responsive-container">
      <table :class="opts.tableClass">
        <thead :class="opts.theadClass">
          <tr>
            <th v-if="opts.checkeable">
              <input v-model="checkAll" type="checkbox" class="mt-2" />
            </th>
            <template v-for="head in visibleHeaders" :key="head.key">
              <th :style="{ width: head.width ? head.width + '%' : 'auto' }">
                {{ (head.mask || head.title).ucwords() }}

                <button class="hide-btn" v-if="!head.required">
                  <i class="fa fa-eye" />
                </button>
              </th>
            </template>
            <th style="width: 1%" />
          </tr>
        </thead>
        <tbody :class="opts.tbodyClass">
          <template
            v-if="
              !values ||
              values.length === 0 ||
              (Object.keys(values).length === 0 && values.constructor === Object)
            "
          >
            <tr>
              <td :colspan="visibleHeaders.length + 1" style="text-align: center">
                <loader />
              </td>
            </tr>
          </template>
          <tr v-for="(item, a) in values.data" :key="item.id">
            <td v-if="opts.checkeable">
              <input
                v-model="item.checked"
                type="checkbox"
                class="mt-2"
                @click="$emit('itemChecked', a, $event.target.checked)"
              />
            </td>

            <td
              v-for="(head, b) in visibleHeaders"
              :key="b"
              :class="{
                'v-table-editable-td': head.editable
              }"
            >
              <template v-if="head.editable">
                <div
                  v-if="head.editable !== 'checkbox'"
                  class="v-table-input-container"
                  :class="opts.inputContainerClass"
                >
                  <input
                    v-if="['text', 'number'].includes(head.editable)"
                    class="v-table-input"
                    :class="opts.inputClass"
                    :type="head.editable"
                    :value="nestedTitle(item, head.title)"
                    @input="$emit('editableInput', a, head.title, $event.target.value)"
                    @change="$emit('editableChange', a, head.title, $event.target.value)"
                  />
                  <select
                    v-if="head.editable === 'select'"
                    :class="opts.inputClass"
                    class="v-table-input"
                    :value="nestedTitle(item, head.title)"
                    @input="$emit('editableInput', a, head.title, $event.target.value)"
                    @change="$emit('editableChange', a, head.title, $event.target.value)"
                  >
                    <option v-for="o in head.options" :key="o.id" :value="o.id">
                      {{ o.label }}
                    </option>
                  </select>
                </div>
                <div v-else class="v-table-checkbox-container" :class="opts.checkboxContainerClass">
                  <input
                    class="v-table-checkbox"
                    :class="opts.checkboxClass"
                    :type="head.editable"
                    :checked="nestedTitle(item, head.title)"
                    @input="$emit('editableInput', a, head.title, $event.target.checked)"
                    @change="$emit('editableChange', a, head.title, $event.target.checked)"
                  />
                </div>
              </template>
              <template v-else-if="head.callback">
                {{ head.callback(nestedTitle(item, head.title)) }}
              </template>
              <template v-else-if="head.dateFormat">
                {{
                  dateFormatting(
                    nestedTitle(item, head.title),
                    head.dateFormat,
                    head.dateFromFormat
                  )
                }}
              </template>
              <template
                v-else-if="head.truncate && nestedTitle(item, head.title).length >= head.truncate"
              >
                <span :title="nestedTitle(item, head.title)">
                  {{ nestedTitle(item, head.title).slice(0, head.truncate - 3) + '...' }}
                </span>
              </template>
              <template v-else>
                {{ nestedTitle(item, head.title) }}
              </template>
            </td>

            <td style="text-align: right">
              <div class="btn-group">
                <button class="btn btn-sm btn-white">
                  <i class="fa fa-ellipsis"></i>
                </button>
                <!-- <template v-for="(act, i) in actions">
                  <button
                    v-if="item[act.callback] !== false"
                    :key="i"
                    class="btn btn-sm"
                    :class="act.buttonClass"
                    @click="$emit(act.callback, item, a)"
                  >
                    <i :class="act.icon" />
                  </button>
                </template> -->
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td
              v-if="values.data && values.data.length <= 0"
              colspan="1000"
              style="text-align: center"
            >
              No hay elementos para mostrar.
            </td>
          </tr>
        </tfoot>
      </table>
    </div>

    <VueTablePager
      :from="values.from"
      :to="values.to"
      :total="values.total"
      :last-page="values.last_page"
      @changing_page="pageChanged"
    />
  </div>
</template>

<script>
/**
 * Valores recibidos
 *
 * # HEADERS
 * - title : string / nullable
 * - mask : string / nullable
 * - width: number(%) / nullable
 * - date: bool / unique (Solo un header con este campo, se utiliza para los filtros desde/hasta)
 * - sortable: bool
 * - hideable: bool
 *
 * # VALUES
 * - pagination from laravel (https://laravel.com/docs/5.8/pagination)
 *
 * # ACTIONS
 * - buttonClass
 * - callback
 * - tooltip
 *
 * # FILTERS
 * - title
 * - type: select/select-multiple/combobox/date/date-range
 * - options: array/null
 * - column // Column to filter
 * - module: string/null (only for combobox)
 *
 * # OPTIONS
 * - tableClass
 * - theadClass
 * - tbodyClass
 */

/**
 * Valores Emitidos
 * - changed (se modifican los parametros de busqueda)
 */
import './utils/ucwords'
import moment from 'moment'
import VueTableFilters from './VueTableFilters.vue'
import VueTablePager from './VueTablePager.vue'
import loader from './loader.vue'

export default {
  name: 'VueTables',
  components: {
    VueTableFilters,
    VueTablePager,
    loader
  },
  props: {
    headers: {
      type: Array,
      default: null
    },
    values: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    },
    actions: {
      type: Array,
      default: () => []
    },
    filters: {
      type: Array,
      default: () => []
    },
    searchMinLen: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      opts: {
        tableClass: 'table table-hover',
        theadClass: '',
        tbodyClass: '',
        checkeable: false,
        inputContainerClass: '',
        inputClass: '',
        checkboxContainerClass: '',
        checkboxClass: ''
      },
      sortedBy: '',
      sortedDir: 'asc',
      date_column: null,
      vTableParams: {
        page: 1,
        search: null,
        sort_by: null,
        sort_dir: null,
        per_page: 10,
        hidden_cols: [],
        filters: null
      },
      checkAll: false
    }
  },
  watch: {
    checkAll: {
      handler(val) {
        this.$emit('checkAll', val)
      }
    }
  },
  computed: {
    visibleHeaders() {
      return this.headers.filter((x) => !this.vTableParams.hidden_cols.includes(x.title))
    }
  },
  mounted() {
    if (!this.values)
      throw new Error('Input VALUES is empty, please add data. (eg.: :values="myData")')
    if (!this.headers)
      throw new Error('Input HEADERS is empty, please add data. (eg.: :headers="myHeaders")')

    if (this.options) {
      Object.keys(this.options).forEach((key) => {
        if (key in this.opts) {
          if (key === 'checkeable' && typeof this.options[key] !== 'boolean') {
            throw new Error('Options "checkeable" must be a Boolean')
          }
          if (key === 'searchable' && typeof this.options[key] !== 'boolean') {
            throw new Error('Options "searchable" must be a Boolean')
          }
          this.opts[key] = this.options[key]
        }
      })
    }
  },
  methods: {
    pageChanged(val) {
      this.vTableParams.page = val
      this.changed()
    },
    searched(val) {
      if (val && val.length <= this.searchMinLen) {
        this.$toast.error('Search value is too short')
        return
      }

      this.vTableParams.page = 1
      this.vTableParams.search = val
      this.changed()
    },
    filtered(val) {
      const { sort, showing, hidden, ...filters } = val

      if (sort && sort !== 'null') {
        const [by, dir] = sort.split('__')

        this.vTableParams.sort_by = by
        this.vTableParams.sort_dir = dir
      } else {
        this.vTableParams.sort_by = null
        this.vTableParams.sort_dir = null
      }

      if (showing !== this.vTableParams.per_page) {
        this.vTableParams.page = 1
        this.vTableParams.per_page = showing
      }

      if (hidden) {
        this.vTableParams.hidden_cols = hidden
      }

      const FILTERS_CHANGED = JSON.stringify(filters) !== JSON.stringify(this.vTableParams.filters)
      if (filters && FILTERS_CHANGED) {
        this.vTableParams.page = 1
        this.vTableParams.filters = filters
      }

      this.changed()
    },

    changed() {
      const { sort_by, sort_dir, page, per_page, filters } = this.vTableParams

      this.$emit('changed', {
        sort_by,
        sort_dir,
        page,
        per_page,
        ...this.parseFilters(filters)
      })
    },

    parseFilters(filters) {
      const aux = {}

      for (const key of Object.keys(filters)) {
        const filter = filters[key]

        if (typeof filter === 'object' && !Array.isArray(filter) && filter !== null) {
          for (const subkey of Object.keys(filters[key])) {
            aux[`${key}_${subkey}`] = filters[key][subkey]
          }
        } else {
          aux[key] = filters[key]
        }
      }

      return aux
    },

    nestedTitle(item, val) {
      const value = item[val]
      if (!value) {
        const array = val.split('.')
        let aux = item

        array.forEach((attr) => {
          aux = aux[attr] === null || aux[attr] === undefined ? '-' : aux[attr]
        })
        return aux
      }
      return value
    },

    dateFormatting(date, format, fromFormat = null) {
      if (!date || date === '-') return '-'
      let d = date
      if (!(date instanceof moment)) {
        if (fromFormat) d = moment(date, fromFormat, true)
        else d = moment(date)
      }
      return d.format(format)
    },

    init() {
      this.$emit('changed', {
        page: 1,
        search: null,
        sort_by: null,
        sort_dir: null,
        filters: null,
        per_page: 10
      })
    }
  }
}
</script>

<style scoped lang="scss">
.v-table-responsive-container {
  width: 100%;
  overflow: auto;
  margin-top: 1em;

  table {
    width: 100%;

    th {
      font-size: 90%;
      border: unset !important;
      font-weight: 500;
      opacity: 0.6;
    }
    td,
    th {
      padding: 0.5em 0.7em !important;
    }
    td {
      font-size: 85%;
      white-space: nowrap;
      vertical-align: middle !important;
    }

    .hide-btn {
      border: none;
      outline: none;
      background: transparent;
      padding: 0;
      display: none;
    }
    .v-table-input-container,
    .v-table-input-container .v-table-input {
      margin: 0;
      width: 100%;
      height: 100%;
      border: unset;
    }
    .v-table-input-container .v-table-input[type='checkbox'] {
      width: auto;
      height: unset;
    }
    .btn.btn-sm {
      padding: 4px;
      width: 25px;
      aspect-ratio: 1;
      display: grid;
      place-items: center;
    }

    tfoot tr td {
      padding-top: 20px !important;
    }
  }
}
</style>
