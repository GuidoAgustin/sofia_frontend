<template>
  <Widget>
    <template #title>Productos</template>
    <vue-table
      v-if="vTable.headers"
      :values="vTable.values"
      :headers="vTable.headers"
      :actions="vTable.actions"
      :options="vTable.options"
      :filters="vTable.filters"
      @changed="getData"
      ref="vtable"
      @onShowDetails="onShowDetails"
      @itemChecked="onItemChecked"
      @checkAll="onCheckAll"
      @onDelete="onDelete"
    />
  </Widget>
  <button @click="irAtras" class="btn btn-primary">Ir atrás</button>
</template>

<script>
import Widget from '@/components/Widget.vue'

export default {
  components: {
    Widget
  },
  data: () => ({
    vTable: {
      filters: [],
      headers: [
        {
          title: 'product_id',
          sortable: true,
          hideable: true,
          mask: 'id'
        },
        {
          title: 'provider',
          sortable: true,
          hideable: true,
          mask: 'Proveedor'
        },
        {
          title: 'code',
          sortable: true,
          hideable: true,
          mask: 'Codigo'
        },
        {
          title: 'name_product',
          sortable: true,
          hideable: true,
          mask: 'Nombre del producto'
        },
        {
          title: 'price',
          sortable: true,
          hideable: true,
          mask: 'Precio',
          pre: '$'
        }
      ],
      actions: [
        {
          title: 'Borrar Producto',
          callback: 'onDelete'
        },
        {
          title: 'Editar Producto',
          callback: 'onShowDetails'
        }
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
    }
  }),
  methods: {
    getData(params) {
      console.log(params)
      this.$store.dispatch('allProducts', params).then((response) => {
        this.vTable.values = response
      })
    },
    onShowDetails(item) {
      console.log('Valor de item.product_id:', item.product_id)
      this.$router.push({ name: 'Editar Producto', params: { id: item.product_id } })
    },
    irAtras() {
      this.$router.go(-1) // Navegar a la página anterior
    },
    onItemChecked(index, checked) {
      console.log(`Fila ${index} seleccionada: ${checked}`)
    },
    onCheckAll(checked) {
      console.log(`Todas las filas seleccionadas: ${checked}`)
    },
    onDelete(item) {
      console.log('Valor de item.product_id:', item.product_id)
      this.$store.dispatch('onDelete', item.product_id).then(() => {
        this.getData({ page: 1, per_page: 10 })
      })
    }
  }
}
</script>

<style></style>
