<template>
  <Widget>
    <template #title>Productos</template>
    <vue-table
      v-if="vTable.headers"
      :values="vTable.values"
      :headers="vTable.headers"
      :actions="userIsAdmin ? vTable.actions : []"
      :options="userIsAdmin ? vTable.options : { checkeable: false }"
      :filters="vTable.filters"
      @changed="getData"
      ref="vtable"
      @onShowDetails="onShowDetails"
      @itemChecked="onItemChecked"
      @checkAll="onCheckAll"
      @onDelete="onDelete"
    >
      <template #cambio_precio="{ item }">
        <span v-if="shouldShowArrow(item)">
          <i
            v-if="item.price > item.last_price"
            class="fas fa-arrow-up text-success"
            title="Precio aumentó"
          ></i>
          <i
            v-else-if="item.price < item.last_price"
            class="fas fa-arrow-down text-danger"
            title="Precio bajó"
          ></i>
        </span>
      </template>
      <template #fecha="{ item }">
        <input
          type="checkbox"
          :checked="item.fecha_corta"
          @change="toggleFavorite(item)"
          style="width: auto"
        />
      </template>
    </vue-table>

    <button @click="irAtras" class="btn btn-sm btn-primary mt-1">Ir atrás</button>

    <button v-if="userIsAdmin" @click="abrirModal" class="btn btn-sm btn-primary float-right mt-1">
      editar precios <i class="fa-solid fa-pencil"></i>
    </button>
  </Widget>

  <ProductsModal
    v-if="showModal"
    @close="showModal = false"
    :idsChecked="idsChecked"
    @update-precios="updateProductPrices"
  />
</template>

<script>
import Widget from '@/components/Widget.vue'
import ProductsModal from './ProductsModal.vue'
import moment from 'moment'

export default {
  components: {
    Widget,
    ProductsModal
  },
  data: () => ({
    params: {},
    vTable: {
      filters: [
        {
          title: 'Fecha corta primero',
          type: 'select',
          options: [
            { value: 'true', label: 'Si' },
            { value: 'false', label: 'No' }
          ],
          column: 'fecha_corta',
        }
      ], // Filtros que se pasarán al componente VueTable
      headers: [
        { title: 'product_id', sortable: true, hideable: true, mask: 'id' },
        { title: 'provider', sortable: true, hideable: true, mask: 'Proveedor' },
        { title: 'code', sortable: true, hideable: true, mask: 'Codigo' },
        { title: 'name_product', sortable: true, hideable: true, mask: 'Nombre del producto' },
        { title: 'price', sortable: true, hideable: true, mask: 'Precio', pre: '$' },
        { slot: 'cambio_precio', mask: 'Aumento/Bajo' },
        { title: 'fecha_corta', mask: 'Fecha corta', slot: 'fecha' }
      ],
      actions: [
        { title: 'Borrar Producto', callback: 'onDelete' },
        { title: 'Editar Producto', callback: 'onShowDetails' }
      ],
      values: {
        total: 5,
        per_page: 15,
        current_page: 1,
        last_page: 1,
        from: 1,
        to: 15,
        data: []
      },
      options: {
        checkeable: true
      }
    },
    showModal: false,
    idsChecked: []
  }),
  computed: {
    userIsAdmin() {
      const user = this.$store.state.auth && this.$store.state.auth.user
      return user && user.role === 'admin'
    }
  },
  mounted() {
    this.initTable()
  },
  methods: {
    initTable() {
      this.$refs.vtable.init()
    },
    getData(params) {
      this.params = params
      console.log('params', params)
      // Aquí se envía la petición al store.
      // 'params' contendrá fecha_corta=true o false cuando el usuario active el filtro
      this.$store.dispatch('allProducts', params).then((response) => {
        this.vTable.values = response
      })
    },
    refreshTable() {
      this.getData(this.params)
    },
    onShowDetails(item) {
      this.$router.push({ name: 'Editar Producto', params: { id: item.product_id } })
    },
    irAtras() {
      this.$router.go(-1)
    },
    onItemChecked(index, value) {
      const { product_id, price } = this.vTable.values.data[index] // ◀️ ¡Agrega price!
      if (value) {
        this.idsChecked.push({ id: product_id, price }) // ◀️ Objeto con id y precio
      } else {
        this.idsChecked = this.idsChecked.filter((item) => item.id !== product_id)
      }
    },

    onCheckAll(value) {
      this.idsChecked = value
        ? this.vTable.values.data.map((x) => ({ id: x.product_id, price: x.price }))
        : []
    },

    onDelete(item) {
      this.$store.dispatch('onDelete', item.product_id).then(() => {
        this.refreshTable()
      })
    },

    updateProductPrices(nuevosPrecios) {
      this.showModal = false
      this.$store
        .dispatch('updatePrices', nuevosPrecios)
        .then(() => {
          this.idsChecked = []
          this.refreshTable()
        })
        .catch((error) => {
          this.$toast.error('Error al actualizar precios:', error)
        })
    },

    abrirModal() {
      if (this.idsChecked.length === 0) {
        this.$toast.warning('Primero debes seleccionar al menos un producto.')
      } else {
        this.showModal = true
      }
    },
    shouldShowArrow(item) {
      if (!item.updated_at) return false // Si no hay fecha de actualización, no mostrar flecha

      const updatedAt = moment(item.price_updated_at) // Fecha de actualización
      const now = moment() // Fecha actual
      const diffInDays = now.diff(updatedAt, 'days') // Diferencia en días
      // Mostrar flecha solo si la diferencia es menor a 2 días
      return diffInDays < 2
    },
    async toggleFavorite(item) {
    try {
      await this.$store.dispatch('toggleFavorite', item.product_id)
      // Actualizar solo el estado de fecha_corta del item
      const updatedItem = this.vTable.values.data.find(product => product.product_id === item.product_id)
      if (updatedItem) {
        updatedItem.fecha_corta = !updatedItem.fecha_corta
      }
    } catch (error) {
      this.$toast.error('Error al cambiar el estado de favorito:', error)
    }
  }
  }
}
</script>
