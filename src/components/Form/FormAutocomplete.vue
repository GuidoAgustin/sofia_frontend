<template>
  <div class="form-container form-autocomplete" :class="{ disabled }">
    <i class="icon" :class="icon" v-if="icon"></i>
    <input
      type="text"
      placeholder=" "
      :id="itemId"
      v-model="searchValue"
      @keyup.enter="onSearch"
    />
    <label :for="itemId">{{ label }}</label>
    <small v-if="searching && !options.length">{{ noDataMsg }}</small>
    <ul
      class="search_results"
      :id="itemId + '_results'"
      v-if="searching && options.length"
    >
      <li v-for="o in options" :key="getId(o)" @click="onSelectOption(o)">
        {{ getLabel(o) }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "Nombre",
    },
    icon: {
      type: String,
      default: "fa-solid fa-search",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default: () => [],
    },
    minLen: {
      type: Number,
      default: 3,
    },
    minLenErrorMsg: {
      type: String,
      default: "El valor de busqueda es muy corto",
    },
    noDataMsg: {
      type: String,
      default: "No se encontraron resultados",
    },
    getLabel: {
      type: Function,
      default: (val) => (!val ? null : val.name),
    },
    getId: {
      type: Function,
      default: (val) => (!val ? null : val.id),
    },
  },
  data: () => ({
    itemId: null,
    searching: false,
    searchValue: "",
  }),
  mounted() {
    this.fillId();

    document.body.addEventListener("click", this.clickOutside);
  },
  beforeUnmount() {
    document.body.removeEventListener("click", this.clickOutside);
  },
  methods: {
    fillId() {
      this.itemId = Math.floor(Math.random() * Date.now());
    },
    clickOutside() {
      if (this.searching) this.searching = false;
    },
    onSearch() {
      if (this.searchValue.length >= this.minLen) {
        this.searching = true;
        this.$emit("onSearch", this.searchValue);
      } else {
        this.$toast.warning(this.minLenErrorMsg);
      }
    },
    onSelectOption(o) {
      this.searchValue = this.getLabel(o);
      this.searching = false;
      this.$emit("onSelectOption", o);
    },
  },
};
</script>

<style></style>
