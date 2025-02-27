<template>
  <div class="bg-image">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-8 overlay" style="background-color: white; border-radius: 10px">
          <h1 class="text-center mb-4">Punto de Venta</h1>

          <div class="mb-3">
            <label for="buscarProducto" class="form-label">Buscar producto:</label>
            <div class="input-group">
              <!-- Al presionar Enter se llama a buscarYAgregarProducto -->
              <input
                type="text"
                id="buscarProducto"
                v-model="buscarProducto"
                @keyup.enter="buscarYAgregarProducto"
                class="form-control"
                placeholder="Ingrese nombre o código"
              />
              <!-- El botón sigue llamando a la búsqueda tradicional -->
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
              <!-- Se agrega @keyup.enter para que al presionar Enter se llame a agregarMontoManual -->
              <input
                type="number"
                id="montoManual"
                v-model="montoManual"
                @keyup.enter="agregarMontoManual"
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
              <option value="transferencia">Transferencia</option>
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
    ...mapActions(['scanSimple', 'allProducts', 'guardarVenta']),

    irAtras() {
      this.$router.go(-1)
    },

    formatoMoneda(valor) {
      return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
      }).format(valor)
    },

    // Función para búsqueda y agregar producto al presionar Enter en el input de búsqueda
    buscarYAgregarProducto() {
      const busqueda = this.buscarProducto.trim()
      if (!busqueda) {
        this.resultadosBusqueda = []
        return
      }

      const esCodigo = /^\d+$/.test(busqueda)

      if (esCodigo) {
        this.scanSimple(busqueda)
          .then((producto) => {
            console.log('Producto encontrado por código:', producto)
            if (producto) {
              this.agregarProductoALista(producto)
            } else {
              console.error('Producto no encontrado por código')
              this.$toast.error('Producto no encontrado.')
            }
          })
          .catch((error) => {
            console.error('Error buscando por código:', error)
            this.$toast.error('Error al buscar producto.')
          })
      } else {
        this.allProducts({ search: busqueda.toLowerCase() })
          .then((productos) => {
            console.log('Productos encontrados por nombre:', productos)
            const resultados = productos.data || []
            if (resultados.length === 1) {
              this.agregarProductoALista(resultados[0])
            } else if (resultados.length > 1) {
              this.resultadosBusqueda = resultados
            } else {
              this.$toast.error('No se encontró ningún producto.')
            }
          })
          .catch((error) => {
            console.error('Error en la búsqueda por nombre:', error)
            this.$toast.error('Error al buscar productos.')
          })
      }
    },

    // Función utilizada por el botón "Buscar"
    filtrarProductos() {
      const busqueda = this.buscarProducto.trim()
      if (!busqueda) {
        this.resultadosBusqueda = []
        return
      }

      const esCodigo = /^\d+$/.test(busqueda)

      if (esCodigo) {
        this.scanSimple(busqueda)
          .then((producto) => {
            console.log('Producto encontrado por código:', producto)
            if (producto) {
              this.agregarProductoALista(producto)
            } else {
              console.error('Producto no encontrado por código')
              this.$toast.error('Producto no encontrado.')
            }
          })
          .catch((error) => {
            console.error('Error buscando por código:', error)
            this.$toast.error('Error al buscar producto.')
          })
      } else {
        this.allProducts({ search: busqueda.toLowerCase() })
          .then((productos) => {
            console.log('Productos encontrados por nombre:', productos)
            const resultados = productos.data || []
            if (resultados.length === 1) {
              this.agregarProductoALista(resultados[0])
            } else if (resultados.length > 1) {
              this.resultadosBusqueda = resultados
            } else {
              this.$toast.error('No se encontró ningún producto.')
            }
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
      // Limpia la búsqueda y el select
      this.buscarProducto = ''
      this.resultadosBusqueda = []
      this.productoSeleccionado = null
    },

    // Función llamada al seleccionar un producto del select
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
        this.$toast.error('Ingrese un monto válido')
        return
      }
      const codigoManual = `manual-${Date.now()}`
      this.productos.push({
        name_product: 'Monto manual',
        code: codigoManual,
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
        this.$toast.error('No hay productos en la venta')
        return
      }
      const venta = {
        total: this.total,
        metodo_pago: this.metodoPago,
        productos: this.productos.map((producto) => ({
          code: producto.code,
          cantidad: producto.cantidad,
          price: producto.price,
          product: producto.name_product
        }))
      }
      this.guardarVenta(venta)
        .then(() => {
          const mensaje =
            `Venta confirmada por ${this.formatoMoneda(this.total)}\n` +
            `Método de pago: ${this.metodoPago.toUpperCase()}`
          this.$toast.success(mensaje)
          this.productos = []
          this.metodoPago = 'efectivo'
        })
        .catch((error) => {
          console.error('Error al guardar la venta:', error)
          this.$toast.error('Error al confirmar la venta.')
        })
    }
  }
}
</script>
