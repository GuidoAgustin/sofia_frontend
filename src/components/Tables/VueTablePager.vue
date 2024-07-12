<template>
  <div class="v-table-pager">
    <div class="vt-results">
      <span v-if="from">
        Showing from
        <b>{{ from }}</b> to <b>{{ to }}</b> of
        <b>{{ total }}</b>
        entries.
      </span>
    </div>
    <ul>
      <li
        class="vt-desktop"
        :class="current_page - 1 === 0 ? 'disabled' : ''"
        @click.prevent="changePage(1)"
      >
        First
      </li>
      <li
        v-for="page in pages_list"
        :key="page.number"
        class="vt-desktop vt-number"
        :class="current_page === page.number ? 'active' : ''"
        @click.prevent="changePage(page.number)"
      >
        {{ page.number }}
      </li>
      <li
        class="vt-desktop"
        :class="!lastPage || current_page + 1 > lastPage ? 'disabled' : ''"
        @click.prevent="changePage(lastPage)"
      >
        Last
      </li>

      <li
        class="vt-mobile"
        :class="current_page - 1 === 0 ? 'disabled' : ''"
        @click.prevent="changePage(current_page - 1)"
      >
        Prev
      </li>
      <li
        class="vt-mobile"
        :class="current_page + 1 > lastPage ? 'disabled' : ''"
        @click.prevent="changePage(current_page + 1)"
      >
        Next
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    from: {
      type: [Number, String],
      default: null
    },
    to: {
      type: [Number, String],
      default: null
    },
    total: {
      type: [Number, String],
      default: null
    },
    lastPage: {
      type: [Number, String],
      default: 1
    },
    actualPage: {
      type: [Number, String],
      default: 1
    }
  },
  data() {
    return {
      current_page: 1,
      pages_list: []
    }
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    lastPage(oldVal, newVal) {
      this.doPagesList()
    },
    actualPage(val) {
      this.current_page = val
    }
  },
  mounted() {
    this.doPagesList()
  },
  methods: {
    doPagesList() {
      // Reseteo la lista
      this.pages_list = []

      // Agrego los items antes del actual
      if (this.current_page > 3) {
        for (let i = this.current_page; i >= this.current_page - 2; i -= 1) {
          this.pages_list.unshift({
            number: i
          })
        }
      } else {
        for (let i = 1; i <= this.current_page; i += 1) {
          this.pages_list.push({
            number: i
          })
        }
      }

      // Agrego los items despues del actual
      let rest = this.lastPage - this.current_page

      if (rest !== 0) {
        // reasigno a la cantidad maxima de paginas por delante
        rest = rest > 2 ? 2 : rest

        for (let i = this.current_page + 1; i <= this.current_page + rest; i += 1) {
          this.pages_list.push({
            number: i
          })
        }
      }
    },

    changePage(number) {
      if (number > 0 || number <= this.lastPage()) {
        this.current_page = number
        this.doPagesList()
        this.$emit('changing_page', number)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.v-table-pager {
  display: flex;
  flex-direction: column;
  gap: 1em;

  .vt-results {
    font-size: 0.8em;
    text-align: center;
    color: rgba(0, 0, 0, 0.6);
  }
  ul {
    display: flex;
    gap: 0.25em;
    justify-content: center;
    margin: 0;

    li {
      padding: 0.25em 0.5em;
      border: 1px solid var(--color-medium);
      height: 30px;
      border-radius: var(--radius);
      font-size: 90%;
      cursor: pointer;
      transition: 0.5s ease;

      &.active {
        border: 1px solid transparent;
        color: var(--color-medium-text);
        background-color: var(--color-medium);
      }

      &:hover {
        border: 1px solid transparent;
        color: var(--color-medium-text);
        background-color: var(--color-medium-shade);
      }

      &.disabled {
        opacity: 0.5;
        pointer-events: none;
      }

      &.vt-number {
        aspect-ratio: 1;
        display: grid;
        place-items: center;
      }
    }

    .vt-mobile {
      display: none;

      @media (max-width: 767px) {
        display: block;
      }
    }
    .vt-desktop {
      display: block;

      @media (max-width: 767px) {
        display: none !important;
      }
    }
  }

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
