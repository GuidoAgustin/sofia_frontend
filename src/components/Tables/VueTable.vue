<template>
  <div>
    <page-functions
      :actual-page="values.current_page"
      :last-page="values.last_page"
      :searchable="opts.searchable"
      @changing_page="pageChanged"
      @searching="searched"
      @changing_showing="showChanged"
    />

    <div class="v-table-responsive-container">
      <table :class="opts.tableClass">
        <thead :class="opts.theadClass">
          <tr>
            <th v-if="opts.checkeable">
              <input v-model="checkAll" type="checkbox" class="mt-2" />
            </th>
            <template v-for="head in headers" :key="head.key">
              <th
                :style="{ width: head.width ? head.width + '%' : 'auto' }"
                :class="head.sortable ? 'sortable' : ''"
                @click="sorted(head)"
              >
                {{ (head.mask || head.title).ucwords() }}

                <i
                  v-if="
                    head.sortable &&
                    (sortedBy === head.title || sortedBy === head.sort_value)
                  "
                  class="fa"
                  :class="sortedDir === 'desc' ? 'fa-sort-down' : 'fa-sort-up'"
                />
                <i
                  v-if="
                    head.sortable &&
                    sortedBy !== head.title &&
                    sortedBy !== head.sort_value
                  "
                  class="fa fa-sort"
                />
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
              (Object.keys(values).length === 0 &&
                values.constructor === Object)
            "
          >
            <tr>
              <td :colspan="headers.length + 1" style="text-align: center">
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
              v-for="(head, b) in headers"
              :key="b"
              :class="{
                'v-table-editable-td': head.editable,
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
                    @input="
                      $emit('editableInput', a, head.title, $event.target.value)
                    "
                    @change="
                      $emit(
                        'editableChange',
                        a,
                        head.title,
                        $event.target.value
                      )
                    "
                  />
                  <select
                    v-if="head.editable === 'select'"
                    :class="opts.inputClass"
                    class="v-table-input"
                    :value="nestedTitle(item, head.title)"
                    @input="
                      $emit('editableInput', a, head.title, $event.target.value)
                    "
                    @change="
                      $emit(
                        'editableChange',
                        a,
                        head.title,
                        $event.target.value
                      )
                    "
                  >
                    <option v-for="o in head.options" :key="o.id" :value="o.id">
                      {{ o.label }}
                    </option>
                  </select>
                </div>
                <div
                  v-else
                  class="v-table-checkbox-container"
                  :class="opts.checkboxContainerClass"
                >
                  <input
                    class="v-table-checkbox"
                    :class="opts.checkboxClass"
                    :type="head.editable"
                    :checked="nestedTitle(item, head.title)"
                    @input="
                      $emit(
                        'editableInput',
                        a,
                        head.title,
                        $event.target.checked
                      )
                    "
                    @change="
                      $emit(
                        'editableChange',
                        a,
                        head.title,
                        $event.target.checked
                      )
                    "
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
                v-else-if="
                  head.truncate &&
                  nestedTitle(item, head.title).length >= head.truncate
                "
              >
                {{
                  nestedTitle(item, head.title).slice(0, head.truncate - 3) +
                  "..."
                }}
                <span class="v-table-tooltip">{{
                  nestedTitle(item, head.title)
                }}</span>
              </template>
              <template v-else>
                {{ nestedTitle(item, head.title) }}
              </template>
            </td>

            <td style="text-align: right">
              <div class="btn-group">
                <template v-for="(act, i) in actions">
                  <button
                    v-if="item[act.callback] !== false"
                    :key="i"
                    class="btn btn-sm"
                    :class="act.buttonClass"
                    @click="$emit(act.callback, item, a)"
                  >
                    <i :class="act.icon" />
                    <span class="v-table-tooltip">{{ act.tooltip }}</span>
                  </button>
                </template>
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td
              v-if="values.data && values.data.length > 0"
              colspan="1000"
              style="text-align: center"
            >
              Mostrando desde
              <b>{{ values.from }}</b> hasta <b>{{ values.to }}</b> de
              <b>{{ values.total }}</b>
              elementos.
            </td>
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
 * - sortable: bool
 * - date: bool / unique (Solo un header con este campo, se utiliza para los filtros desde/hasta)
 *
 * # VALUES
 * - pagination from laravel (https://laravel.com/docs/5.8/pagination)
 *
 * # ACTIONS
 * - buttonClass
 * - callback
 * - tooltip
 * - icon
 *
 * # OPTIONS
 * - tableClass
 * - theadClass
 * - tbodyClass
 * - customFilters / Object array
 *      - title / nombre de columna
 *      - options / array de options
 *      # ej:
 *          - {
 *              title:'Tipos de Movimiento',
 *              column:'id_tipo_movimiento',
 *              options:[
 *                  {value:1,label:'Orden de Compra'}
 *              ]
 *          }
 */

/**
 * Valores Emitidos
 * - changed (se modifican los parametros de busqueda)
 */
import "./utils/ucwords";
import moment from "moment";
import PageFunctions from "./PageFunctions.vue";
import loader from "./loader.vue";

export default {
  name: "VueTables",
  components: {
    PageFunctions,
    loader,
  },
  props: {
    headers: {
      type: Array,
      default: null,
    },
    values: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
    actions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      opts: {
        tableClass: "table table-hover",
        theadClass: "",
        tbodyClass: "",
        checkeable: false,
        inputContainerClass: "",
        inputClass: "",
        checkboxContainerClass: "",
        checkboxClass: "",
      },
      sortedBy: "",
      sortedDir: "asc",
      date_column: null,
      vTableParams: {
        page: 1,
        search: null,
        sortBy: null,
        sortDir: null,
        filters: null,
        per_page: 10,
      },
      checkAll: false,
    };
  },
  watch: {
    checkAll: {
      handler(val) {
        this.$emit("checkAll", val);
      },
    },
  },
  mounted() {
    if (!this.values)
      throw new Error(
        'Input VALUES is empty, please add data. (eg.: :values="myData")'
      );
    if (!this.headers)
      throw new Error(
        'Input HEADERS is empty, please add data. (eg.: :headers="myHeaders")'
      );

    if (this.options) {
      Object.keys(this.options).forEach((key) => {
        if (key in this.opts) {
          if (key === "checkeable" && typeof this.options[key] !== "boolean") {
            throw new Error('Options "checkeable" must be a Boolean');
          }
          if (key === "searchable" && typeof this.options[key] !== "boolean") {
            throw new Error('Options "searchable" must be a Boolean');
          }
          this.opts[key] = this.options[key];
        }
      });
    }
  },
  methods: {
    pageChanged(val) {
      this.vTableParams.page = val;
      this.changed();
    },
    searched(val) {
      this.vTableParams.page = 1;
      this.vTableParams.search = val;
      this.changed();
    },
    showChanged(val) {
      this.vTableParams.page = 1;
      this.vTableParams.per_page = val;
      this.changed();
    },
    sorted(item) {
      if (item.sortable) {
        if (this.sortedBy === item.title || this.sortedBy === item.sort_value) {
          this.sortedDir = this.sortedDir === "asc" ? "desc" : "asc";
        } else {
          this.sortedDir = "asc";
        }

        this.sortedBy = item.sort_value || item.title;

        this.vTableParams.sortBy = this.sortedBy;
        this.vTableParams.sortDir = this.sortedDir;

        this.changed();
      }
    },

    changed() {
      this.$emit("changed", this.vTableParams);
    },

    nestedTitle(item, val) {
      const value = item[val];
      if (!value) {
        const array = val.split(".");
        let aux = item;

        array.forEach((attr) => {
          aux = aux[attr] === null || aux[attr] === undefined ? "-" : aux[attr];
        });
        return aux;
      }
      return value;
    },

    dateFormatting(date, format, fromFormat = null) {
      if (!date || date === "-") return "-";
      let d = date;
      if (!(date instanceof moment)) {
        if (fromFormat) d = moment(date, fromFormat, true);
        else d = moment(date);
      }
      return d.format(format);
    },

    init() {
      this.$emit("changed", {
        page: 1,
        search: null,
        sortBy: null,
        sortDir: null,
        filters: null,
        per_page: 10,
      });
    },
  },
};
</script>

<style scoped>
.v-table-responsive-container {
  width: 100%;
  overflow: auto;
}
table {
  width: 100%;
}
table th {
  font-size: 98%;
}
table td,
table tr {
  font-size: 90%;
}

tfoot tr td {
  padding-top: 20px !important;
}

.sortable {
  cursor: pointer;
}

td,
th {
  padding: 5px !important;
}

.btn-group {
  margin: 5px 1px !important;
  display: flex;
  gap: 0.25em;
}

td {
  border-top: none;
  white-space: nowrap;
  vertical-align: middle !important;
}

.btn {
  position: relative;
}

.btn.btn-sm {
  padding: 4px;
  width: 25px;
}

.btn-sm i {
  font-size: 100% !important;
}

.table-responsive {
  overflow-y: hidden;
}

.v-table-tooltip {
  position: absolute;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 8px 10px;
  border-radius: 0.25rem;
  top: 50%;
  left: 30px;
  transform: translate(-100%, -50%);
  opacity: 0;
  transition: ease 0.5s;
  pointer-events: none;
}

.v-table-input-container,
.v-table-input-container .v-table-input {
  margin: 0;
  width: 100%;
  height: 100%;
  border: unset;
}
.v-table-input-container .v-table-input[type="checkbox"] {
  width: auto;
  height: unset;
}

.btn:hover .v-table-tooltip,
span:hover .v-table-tooltip {
  opacity: 1;
  transition: ease 0.5s;
  left: 0;
}

thead th {
  border-top: unset !important;
}
</style>
