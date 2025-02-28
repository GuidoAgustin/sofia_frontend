<template>
  <div class="calculadora" style="display: block; margin-left: auto; margin-right: auto;">
    <div class="pantalla">
      <input type="text" v-model="pantalla" />
    </div>
    <div class="botones">
      <button class="btn-calc" @click="borrarTodo()">C</button>
      <button class="btn-calc" @click="borrarUltimo()">DEL</button>
      <button class="btn-calc" @click="agregarPorcentaje()">%</button>
      <button class="btn-calc" @click="agregarOperador('/')">/</button>
      <button class="btn-calc" @click="agregarNumero('7')">7</button>
      <button class="btn-calc" @click="agregarNumero('8')">8</button>
      <button class="btn-calc" @click="agregarNumero('9')">9</button>
      <button class="btn-calc" @click="agregarOperador('*')">*</button>
      <button class="btn-calc" @click="agregarNumero('4')">4</button>
      <button class="btn-calc" @click="agregarNumero('5')">5</button>
      <button class="btn-calc" @click="agregarNumero('6')">6</button>
      <button class="btn-calc" @click="agregarOperador('-')">-</button>
      <button class="btn-calc" @click="agregarNumero('1')">1</button>
      <button class="btn-calc" @click="agregarNumero('2')">2</button>
      <button class="btn-calc" @click="agregarNumero('3')">3</button>
      <button class="btn-calc" @click="agregarOperador('+')">+</button>
      <button class="btn-calc" @click="agregarNumero('0')">0</button>
      <button class="btn-calc" @click="agregarNumero('000')">000</button>
      <button class="btn-calc btn-0" @click="calcular()">=</button>
    </div>
  </div>
  <button @click="irAtras" class="btn btn-primary" style="display: block; margin-left: auto; margin-right: auto; width: 70%; height: 50px;">Ir atras</button>
</template>

<script>
import { evaluate } from 'mathjs';

export default {
  data() {
    return {
      pantalla: '',
      historial: []
    }
  },
  methods: {
    agregarNumero(numero) {
      this.pantalla += numero;
    },
    agregarOperador(operador) {
      this.pantalla += operador;
    },
    agregarPorcentaje() {
      this.pantalla += '%';
    },
    borrarTodo() {
      this.pantalla = '';
    },
    borrarUltimo() {
      this.pantalla = this.pantalla.slice(0, -1);
    },
    calcular() {
      try {
        let expresion = this.pantalla;
        if (expresion.includes('%')) {
          const partes = expresion.split('%');
          if (partes.length === 2) {
            const porcentaje = parseFloat(partes[0]) / 100;
            const numero = parseFloat(partes[1]);
            expresion = porcentaje + '*' + numero;
          } else {
            throw new Error("Formato de porcentaje incorrecto");
          }
        }
        const resultado = evaluate(expresion);
        this.historial.push(this.pantalla + ' = ' + resultado);
        this.pantalla = resultado.toString();
      } catch (error) {
        this.pantalla = 'Error';
        console.error("Error al calcular:", error);
      }
    },
    irAtras() {
      this.$router.go(-1);
    }
  }
}
</script>
<style>
@import '../../assets/scss/_calculator.scss';
</style>
