<template>
  <div class="d-flex align-items-center justify-content-center h-100">
    <div class="card mx-4">
      <div class="card-body px-4 pb-4">
        <h1>Escanea un producto</h1>
        <form @submit.prevent="scan">
          <!-- Campo de código de barras -->
          <div class="form-group">
            <label class="form-label">Código de barras:</label>
            <input
              type="text"
              v-model="codigoBarras"
              placeholder="Escanea un código de barras"
              class="form-control"
            />
          </div>

          <!-- Botón de Escanear -->
          <button type="submit" class="btn btn-primary btn-block">Escanear</button>
          <!-- Botón de Limpiar -->
        </form>
        
        <!-- Información del producto -->
        <div v-if="producto" class="mt-4">
            <h2>Producto: {{ producto.nombre }}</h2>
            <h3>Precio: {{ producto.precio }}</h3>
            <p>Código: {{ producto.codigo }}</p>
        </div>
        
        <button @click="limpiarFormulario" class="btn btn-primary btn-block">Limpiar</button>
        <!-- Botón para Ir Atrás -->
        <button @click="irAtras" class="btn btn-primary btn-block">Ir atrás</button>

        <div class="text-center mt-3">
          <small> by GuidoB. </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      codigoBarras: '',
      producto: null
    }
  },
  methods: {
scan() {
  console.log('Iniciando función scan()');
  const token = localStorage.getItem('token');
  console.log('Token obtenido:', token);
  if (token) {
    console.log('Token válido, haciendo solicitud GET a /products/scan');
    axios
      .get(`http://localhost:3001/products/scan/${this.codigoBarras}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log('Respuesta obtenida:', response);
        const data = response.data.data;
        console.log('Data:', data);
        if (data) {
          console.log('Data es un objeto válido');
          this.producto = {
            nombre: data.name_product,
            codigo: data.code,
            precio: data.price
          };
          console.log('Producto creado:', this.producto);
        } else {
          console.log('Data es nulo o no es un objeto válido');
          this.$toast.error('Error al buscar producto. Verifica el código.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        this.$toast.error('Error al buscar producto. Verifica el código.');
      });
  } else {
    console.error('No token found');
  }
},
    limpiarFormulario() {
      this.codigoBarras = ''
      this.producto = null
    },
    irAtras() {
      this.$router.go(-1)
    }
  }
}
</script>