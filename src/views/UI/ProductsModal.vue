<template>
  <VueModal size="md">
    <template #title>Modificar Precios</template>

    <template #body>
      <div class="calculadora" style="display: block; margin-left: auto; margin-right: auto">
        <div class="pantalla">
          <input type="text" v-model="pantalla" />
        </div>
        <div class="botonescalcu">
          <button class="btn-calc" @click="borrarTodo">C</button>
          <button class="btn-calc" @click="borrarUltimo">DEL</button>
          <button class="btn-calc" @click="agregarOperador('%')">%</button>
          <button class="btn-calc" @click="agregarOperador('+')">+</button>
          <button class="btn-calc" @click="agregarNumero('7')">7</button>
          <button class="btn-calc" @click="agregarNumero('8')">8</button>
          <button class="btn-calc" @click="agregarNumero('9')">9</button>
          <button class="btn-calc" @click="agregarOperador('-')">-</button>
          <button class="btn-calc" @click="agregarNumero('3')">3</button>
          <button class="btn-calc" @click="agregarNumero('4')">4</button>
          <button class="btn-calc" @click="agregarNumero('5')">5</button>
          <button class="btn-calc" @click="agregarNumero('6')">6</button>
          <button class="btn-calc btn-0" @click="agregarNumero('0')">0</button>
          <button class="btn-calc" @click="agregarNumero('1')">1</button>
          <button class="btn-calc" @click="agregarNumero('2')">2</button>
        </div>
      </div>
    </template>

    <template #footer>
      <button class="btn btn-sm btn-primary float-right mt-1" @click="calcular">
        Editar precios
      </button>
    </template>
  </VueModal>
</template>

<script>
import VueModal from '@/components/Modal/VueModal.vue'

export default {
  components: { VueModal },
  props: {
    idsChecked: Array // Lista de precios seleccionados
  },
  data() {
    return {
      pantalla: '', // Valor ingresado por el usuario en la calculadora
      showModal: false,
      preciosModificados: [] // Se inicializa vacío para evitar problemas de acceso a props
    }
  },
  mounted() {
    // Se copia la lista de precios en el montaje para evitar modificar la prop directamente
    this.preciosModificados = [...this.idsChecked]
  },
  methods: {
    agregarNumero(numero) {
      this.pantalla += numero
    },
    agregarOperador(operador) {
      if (operador === '%') {
        // Permite agregar % solo si ya hay un número antes y no hay otro %
        if (this.pantalla.length > 0 && !this.pantalla.includes('%')) {
          this.pantalla += operador
        }
      } else {
        // Permite agregar + o - solo al inicio si la pantalla está vacía
        if (this.pantalla.length === 0) {
          this.pantalla = operador
        }
      }
    },
    borrarTodo() {
      this.pantalla = ''
    },
    borrarUltimo() {
      this.pantalla = this.pantalla.slice(0, -1)
    },
    calcularPrecio(precioActual, valorIngresado) {
      const match = valorIngresado.match(/^([+-])?(\d+(\.\d+)?)(%)?$/)
      if (!match) {
        this.$toast.error('Valor ingresado no válido')
        return precioActual
      }

      let [, signo, cantidad, , esPorcentaje] = match
      const valorNumerico = parseFloat(cantidad)

      if (!signo) {
        signo = '+'
      }

      let nuevoPrecio
      if (esPorcentaje) {
        nuevoPrecio =
          signo === '-'
            ? precioActual - (precioActual * valorNumerico) / 100
            : precioActual + (precioActual * valorNumerico) / 100
      } else {
        nuevoPrecio = signo === '-' ? precioActual - valorNumerico : precioActual + valorNumerico
      }

      return Math.round(nuevoPrecio) // Redondea al entero más cercano
    },
    calcular() {
      if (!this.pantalla) {
        this.$toast.warning('Ingrese un valor antes de calcular')
        return
      }

      const nuevosPrecios = this.idsChecked.map((producto) => ({
        id: producto.id,
        price: this.calcularPrecio(producto.price, this.pantalla)
      }))

      this.$emit('update-precios', nuevosPrecios)
    }
  }
}
</script>

<style>
@import '../../assets/scss/_calculator.scss';
</style>
