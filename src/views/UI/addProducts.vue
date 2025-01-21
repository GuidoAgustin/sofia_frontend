<template>
  <div class="d-flex align-items-center justify-content-center h-100">
    <div class="card mx-4">
      <div class="card-body px-4 pb-4">
        <h1>Agregar nuevo producto</h1>
        <form @submit.prevent="addProduct" @submit="reloadPage">
          <!-- Campo de nombre del producto -->
          <div class="form-group">
            <label class="form-label">Nombre del producto:</label>
            <input
              type="text"
              v-model="formulario.name_product"
              placeholder="Ingrese el nombre del producto"
              class="form-control"
            />
          </div>

          <!-- Campo de precio -->
          <div class="form-group">
            <label class="form-label">Precio:</label>
            <input
              type="number"
              v-model="formulario.price"
              placeholder="Ingrese el precio del producto"
              class="form-control"
            />
          </div>

          <!-- Campo de proveedor -->
          <div class="form-group">
            <label class="form-label">Proveedor:</label>
            <input
              type="text"
              v-model="formulario.provider"
              placeholder="Ingrese el proveedor del producto"
              class="form-control"
            />
          </div>
          <!-- Campo de código -->
          <div class="form-group">
            <label class="form-label">Código:</label>
            <input
              type="text"
              v-model="formulario.code"
              placeholder="Ingrese el código del producto"
              class="form-control"
            />
          </div>

          <!-- Botón de Enviar -->
          <button type="submit" class="btn btn-primary btn-block">Crear producto</button>
        </form>
        <!-- Botón para Ir Atrás -->
        <button @click="irAtras" class="btn btn-primary btn-block">Ir atrás</button>
        <button @click="$router.push('/products')" class="btn btn-primary btn-block">Ir a Productos</button>

        <div class="text-center mt-3">
          <small> by GuidoB. </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formulario: {
        name_product: '',
        price: '',
        provider: '',
        code: ''
      }
    }
  },
  methods: {
    async addProduct() {
      if (
        !this.formulario.name_product ||
        !this.formulario.price ||
        !this.formulario.provider ||
        !this.formulario.code
      ) {
        this.$toast.error('Por favor, complete todos los campos.')
        return
      }

      const token = localStorage.getItem('token')
      if (token) {
        this.$store.dispatch('addProduct', this.formulario).then((data) => {
          console.log('Response:', data)
          this.$toast.success('Producto agregado con éxito')
        })
      } else {
        console.error('No token found')
      }
    },
    irAtras() {
      this.$router.go(-1) // Navegar a la página anterior
    }
  },
  reloadPage() {
    location.reload()
  }
}
</script>
