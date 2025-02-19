<template>
  <div class="bg-image">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-8 overlay" style="background-color: white; border-radius: 10px">
          <h1 class="text-center mb-4">Punto de Venta</h1>

          <div class="mb-3">
            <label for="buscarProducto" class="form-label">Buscar producto:</label>
            <div class="input-group">
              <input
                type="text"
                id="buscarProducto"
                v-model="buscarProducto"
                @keyup.enter="filtrarProductos"
                class="form-control"
                placeholder="Ingrese nombre o código"
              />
              <button @click="filtrarProductos" class="btn btn-outline-secondary">Buscar</button>
            </div>
          </div>

          <div v-if="resultadosBusqueda.length > 0" class="mb-3">
            <label class="form-label">Seleccione un producto:</label>
            <select
              v-model="productoSeleccionado"
              @change="agregarProducto"
              class="form-select"
              style="
                background-color: #ef6367;
                border: 1px solid #ced4da;
                color: white;
                padding: 0.375rem 0.75rem;
              "
            >
              <option value="">Seleccione un producto</option>
              <option
                v-for="producto in resultadosBusqueda"
                :key="producto.product_id || producto.code"
                :value="producto"
              >
                {{ producto.name_product }} - {{ formatoMoneda(producto.price) }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="montoManual" class="form-label">Agregar monto manual:</label>
            <div class="input-group">
              <input
                type="number"
                id="montoManual"
                v-model="montoManual"
                class="form-control"
                placeholder="Ingrese un monto"
                min="0"
              />
              <button @click="agregarMontoManual" class="btn btn-outline-secondary">Agregar</button>
            </div>
          </div>

          <table class="table">
            <thead class="bg-primary text-white">
              <tr>
                <th>Código</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(producto, index) in productos" :key="index">
                <td>{{ producto.code || 'N/A' }}</td>
                <td>{{ producto.name_product || 'Monto manual' }}</td>
                <td>{{ formatoMoneda(producto.price) }}</td>
                <td>
                  <button
                    @click="disminuirCantidad(index)"
                    class="btn btn-sm btn-outline-secondary"
                    style="padding: 4px 8px; font-size: 15px"
                  >
                    -
                  </button>
                  <span class="mx-2">{{ producto.cantidad }}</span>
                  <button
                    @click="aumentarCantidad(index)"
                    class="btn btn-sm btn-outline-secondary"
                    style="padding: 4px 8px; font-size: 15px"
                  >
                    +
                  </button>
                </td>
                <td>{{ formatoMoneda(producto.subtotal) }}</td>
              </tr>
            </tbody>
          </table>

          <p class="text-end fw-bold fs-5 mt-3">Total: {{ formatoMoneda(total) }}</p>

          <div class="mb-3">
            <label for="metodoPago" class="form-label">Método de pago:</label>
            <select
              id="metodoPago"
              v-model="metodoPago"
              class="form-select"
              style="
                background-color: #ef6367;
                border: 1px solid #ced4da;
                color: white;
                padding: 0.375rem 0.75rem;
              "
            >
              <option value="efectivo">Efectivo</option>
              <option value="tarjeta">Tarjeta</option>
              <option value="mercadopago">Mercado Pago</option>
            </select>
          </div>

          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button @click="irAtras" class="btn btn-primary">Ir atrás</button>
            <button @click="confirmarVenta" class="btn btn-primary me-md-2">Confirmar Venta</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'PuntoDeVenta',
  data() {
    return {
      buscarProducto: '',
      resultadosBusqueda: [],
      productoSeleccionado: null,
      montoManual: null,
      productos: [],
      metodoPago: 'efectivo'
    }
  },
  computed: {
    total() {
      return this.productos.reduce((sum, producto) => sum + producto.subtotal, 0)
    }
  },
  methods: {
    ...mapActions(['scanSimple', 'allProducts']),

    irAtras() {
      this.$router.go(-1)
    },

    formatoMoneda(valor) {
      return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
      }).format(valor)
    },

    filtrarProductos() {
      const busqueda = this.buscarProducto.trim()
      if (!busqueda) {
        this.resultadosBusqueda = []
        return
      }

      // Verificar si la búsqueda parece un código (solo números)
      const esCodigo = /^\d+$/.test(busqueda) // Expresión regular para verificar solo números

      if (esCodigo) {
        this.scanSimple(busqueda)
          .then((producto) => {
            console.log('Producto encontrado por código:', producto)
            if (producto) {
              this.agregarProductoALista(producto)
            } else {
              throw new Error('Producto no encontrado por código')
            }
          })
          .catch((error) => {
            console.error('Error buscando por código:', error)
            // No es necesario buscar por nombre si no es un código
          })
      } else {
        this.allProducts({ search: busqueda.toLowerCase() })
          .then((productos) => {
            console.log('Productos encontrados por nombre:', productos)
            this.resultadosBusqueda = productos.data || []
          })
          .catch((error) => {
            console.error('Error en la búsqueda por nombre:', error)
            this.$toast.error('Error al buscar productos.')
          })
      }
    },

    agregarProductoALista(producto) {
      const productoEnCarrito = this.productos.find((p) => p.code === producto.code)
      if (productoEnCarrito) {
        productoEnCarrito.cantidad++
        productoEnCarrito.subtotal = productoEnCarrito.cantidad * productoEnCarrito.price
      } else {
        this.productos.push({
          ...producto,
          cantidad: 1,
          subtotal: producto.price
        })
      }

      this.buscarProducto = ''
      this.resultadosBusqueda = []
      this.productoSeleccionado = null
    },

    agregarProducto() {
      if (!this.productoSeleccionado) return
      const productoEnCarrito = this.productos.find(
        (p) => p.code === this.productoSeleccionado.code
      )

      if (productoEnCarrito) {
        productoEnCarrito.cantidad++
        productoEnCarrito.subtotal = productoEnCarrito.cantidad * productoEnCarrito.price
      } else {
        this.productos.push({
          ...this.productoSeleccionado,
          cantidad: 1,
          subtotal: this.productoSeleccionado.price
        })
      }

      this.buscarProducto = ''
      this.resultadosBusqueda = []
      this.productoSeleccionado = null
    },

    agregarMontoManual() {
      if (!this.montoManual || this.montoManual <= 0) {
        alert('Ingrese un monto válido')
        return
      }

      const codigoManual = `manual-${Date.now()}` // Genera un código único

      this.productos.push({
        name_product: 'Monto manual',
        code: codigoManual, // Usa el código único
        price: parseFloat(this.montoManual),
        cantidad: 1,
        subtotal: parseFloat(this.montoManual)
      })
      this.montoManual = null
    },

    aumentarCantidad(index) {
      this.productos[index].cantidad++
      this.productos[index].subtotal = this.productos[index].cantidad * this.productos[index].price
    },

    disminuirCantidad(index) {
      if (this.productos[index].cantidad > 1) {
        this.productos[index].cantidad--
        this.productos[index].subtotal =
          this.productos[index].cantidad * this.productos[index].price
      } else {
        this.productos.splice(index, 1)
      }
    },

    confirmarVenta() {
      if (this.productos.length === 0) {
        alert('No hay productos en la venta')
        return
      }
      const mensaje = `Venta confirmada por ${this.formatoMoneda(this.total)}
Método de pago: ${this.metodoPago.toUpperCase()}`
      alert(mensaje)

      this.productos = []
      this.metodoPago = 'efectivo'
    }
  }
}
</script>
