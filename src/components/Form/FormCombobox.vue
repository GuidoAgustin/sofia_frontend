<template>
  <div class="form-container form-combobox" :class="{ disabled, 'flex-field': flexField }">
    <label :for="itemId">{{ label }}</label>
    <div class="form-wrapper">
      <div class="icon" v-if="icon">
        <i :class="icon"></i>
      </div>
      <input
        type="text"
        v-model="search"
        :id="itemId"
        @focus="openDropdown"
        @blur="closeDropdown"
        @input="onSearch"
        @keydown.up="onArrowUp"
        @keydown.down="onArrowDown"
        @keydown.enter="onEnter"
        ref="input"
      />
      <div class="loader" v-if="isLoading">
        <slot name="loader">
          <div class="spinner"></div>
        </slot>
      </div>

      <ul v-if="dropdownOpen" ref="dropdown">
        <li
          v-for="(option, index) in options"
          :key="option[this.optionValue]"
          :class="{ highlighted: index === highlightedIndex }"
          @mousedown.prevent="selectOption(option)"
          ref="options"
        >
          {{ option[this.optionLabel] }}
        </li>
        <li v-if="!options.length">{{ noDataMsg }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import debounce from '@/utils/debounce.js'

export default {
  emits: ['onSelectOption'],
  props: {
    value: {
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
    },
    minLen: {
      type: Number,
      default: 3
    },
    noDataMsg: {
      type: String,
      default: 'No entries were found'
    },
    options: {
      type: Array,
      default: () => []
    },
    optionGetter: {
      type: Function,
      default: () => ({})
    },
    optionLabel: {
      type: String,
      default: 'label'
    },
    optionValue: {
      type: String,
      default: 'value'
    },
    flexField: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      itemId: null,
      search: '',
      dropdownOpen: false,
      highlightedIndex: -1,
      isLoading: false,
      optGetter: null,
      fullSearched: false
    }
  },
  created() {
    this.optGetter = debounce({
      callback: this.optionGetter,
      delay: 500,
      startedCallback: () => {
        this.isLoading = true
      },
      finalCallback: () => {
        this.isLoading = false
      }
    })
  },
  mounted() {
    this.itemId = Math.floor(Math.random() * Date.now())
    if (this.value?.[this.optionLabel]) {
      this.search = this.value[this.optionLabel]
    }
  },
  beforeUnmount() {
    this.optGetter.cancel && this.optGetter.cancel()
  },
  methods: {
    fullSearch() {
      if (this.fullSearched) return

      this.fullSearched = true
      this.optGetter(null)
    },
    openDropdown() {
      this.dropdownOpen = true
      this.fullSearch()
    },
    closeDropdown() {
      setTimeout(() => {
        this.dropdownOpen = false
        this.highlightedIndex = -1
      }, 200) // Small delay to allow click event to register
    },
    selectOption(option) {
      this.search = option[this.optionLabel]
      this.dropdownOpen = false
      this.$emit('onSelectOption', option)
    },
    onSearch() {
      if (!this.search || this.search === '') {
        this.search = null
        this.fullSearch()
      } else if (this.search.length >= this.minLen) {
        this.fullSearched = false
        this.optGetter(this.search)
      }
    },

    // Keyboard events
    onArrowDown() {
      if (!this.dropdownOpen) return

      if (this.highlightedIndex < this.options.length - 1) {
        this.highlightedIndex++
        this.scrollIntoView()
      }
    },
    onArrowUp() {
      if (!this.dropdownOpen) return

      if (this.highlightedIndex > 0) {
        this.highlightedIndex--
        this.scrollIntoView()
      }
    },
    onEnter() {
      if (!this.dropdownOpen) {
        this.openDropdown()
        return
      }

      if (this.highlightedIndex >= 0 && this.highlightedIndex < this.options.length) {
        this.selectOption(this.options[this.highlightedIndex])
      }
    },
    scrollIntoView() {
      this.$nextTick(() => {
        const options = this.$refs.options
        const highlightedOption = options[this.highlightedIndex]
        if (highlightedOption) {
          const dropdown = this.$refs.dropdown
          const optionTop = highlightedOption.offsetTop
          const optionBottom = optionTop + highlightedOption.offsetHeight
          const dropdownScrollTop = dropdown.scrollTop
          const dropdownHeight = dropdown.offsetHeight

          if (optionTop < dropdownScrollTop) {
            dropdown.scrollTop = optionTop
          } else if (optionBottom > dropdownScrollTop + dropdownHeight) {
            dropdown.scrollTop = optionBottom - dropdownHeight
          }
        }
      })
    }
  }
}
</script>
