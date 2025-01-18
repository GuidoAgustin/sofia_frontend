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
    />
  </Widget>
  <button @click="irAtras" class="btn btn-primary">Ir atrás</button>
</template>

<script>
import Widget from '@/components/Widget.vue'
import axios from 'axios'
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
          mask: 'id',
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
          mask: 'Precio'
        },
      ],
      actions: [
        {
          title: 'Delete item',
          callback: 'onDelete'
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
        /// Go to OPTIONS SECTION for explanation
      }
    }
  }),
  methods: {
getData(params) {
  const token = localStorage.getItem('token')
  if (token) {
    axios
      .get('http://localhost:3001/products', {
        params: {
          page: params.page,
          per_page: params.per_page,
          filter: params.filter
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        const data = response.data
        console.log('Data:', data)
        this.vTable.values = data.data
        console.log('vTable.values:', this.vTable.values);      
      })
      .catch(error => {
        console.error(error);
      });
  } else {
    console.error('No token found');
  }
},
    onShowDetails(item, index) {
      console.log({ item, index })
    },
    irAtras() {
      this.$router.go(-1) // Navegar a la página anterior
    }
  }
}
</script>

<style></style>
