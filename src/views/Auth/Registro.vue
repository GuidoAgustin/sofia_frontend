<template>
  <div class="d-flex align-items-center justify-content-center h-100">
    <div class="card mx-4">
      <div class="card-body px-4 pb-4">
        <h1>Crear cuenta de administrador</h1>
        <form @submit.prevent="crearCuenta">
          <!-- Campo de Usuario -->
          <div class="form-group">
            <label class="form-label">Crear usuario:</label>
            <input
              type="text"
              v-model="formulario.name"
              placeholder="Ingrese su nombre de usuario"
              class="form-control"
            />
          </div>

          <!-- Campo de Gmail -->
          <div class="form-group">
            <label class="form-label">Ingrese su Gmail:</label>
            <input
              type="email"
              v-model="formulario.email"
              placeholder="Ingrese su Gmail"
              class="form-control"
            />
          </div>

          <!-- Campo de Contraseña -->
          <div class="form-group">
            <label class="form-label">Cree una Contraseña:</label>
            <div class="password-container">
              <input
                :type="mostrarContraseña ? 'text' : 'password'"
                v-model="formulario.password"
                placeholder="Ingrese su contraseña"
                class="form-control"
              />
              <button
                type="button"
                @click="toggleMostrarContraseña"
                class="btn btn-primary btn-block"
              >
                {{ mostrarContraseña ? 'Ocultar contraseña' : 'Mostrar contraseña' }}
              </button>
            </div>
          </div>

          <!-- Botón de Enviar -->
          <button type="submit" class="btn btn-primary btn-block">Crear cuenta</button>
        </form>
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
export default {
  data() {
    return {
      formulario: {
        name: '',
        email: '',
        password: '',
        role: 'admin' // Set role to admin
      },
      mostrarContraseña: false // Estado para mostrar/ocultar la contraseña
    }
  },
  methods: {
    async crearCuenta() {
      if (!this.formulario.name || !this.formulario.email || !this.formulario.password) {
        this.$toast.error('Por favor, complete todos los campos.')
        return
      }

      this.$store.dispatch('registrar', this.formulario).then((data) => {
        this.$toast.success(data)
        this.$router.push('/login')
      })
    },

    toggleMostrarContraseña() {
      // Cambia el estado de mostrar/ocultar la contraseña
      this.mostrarContraseña = !this.mostrarContraseña
    },
    irAtras() {
      this.$router.go(-1) // Navegar a la página anterior
    }
  }
}
</script>
