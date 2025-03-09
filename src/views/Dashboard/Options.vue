<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">
          <h1>Cambiar Contraseña</h1>
        </div>
        <form @submit.prevent="savePassword">
          <div class="card-body">
            <!-- Campo de Nueva Contraseña -->
            <div class="form-group">
              <label class="form-label">Nueva Contraseña:</label>
              <div class="password-container">
                <input
                  :type="mostrarContraseña ? 'text' : 'password'"
                  v-model="form.new_password"
                  placeholder="Ingrese su nueva contraseña"
                  class="form-control"
                />
              </div>
            </div>

            <!-- Campo de Repetir Nueva Contraseña -->
            <div class="form-group">
              <label class="form-label">Repetir Nueva Contraseña:</label>
              <div class="password-container">
                <input
                  :type="mostrarContraseña ? 'text' : 'password'"
                  v-model="form.new_password_confirmation"
                  placeholder="Repita su nueva contraseña"
                  class="form-control"
                />
              </div>
            </div>

            <!-- Campo de Contraseña Actual -->
            <div class="form-group">
              <label class="form-label">Contraseña Actual:</label>
              <div class="password-container">
                <input
                  :type="mostrarContraseña ? 'text' : 'password'"
                  v-model="form.password"
                  placeholder="Ingrese su contraseña actual"
                  class="form-control"
                />
                <button
                  type="button"
                  @click="toggleMostrarContraseña"
                  class="btn btn-primary btn-block"
                >
                  {{ mostrarContraseña ? 'Ocultar contraseñas' : 'Mostrar contraseñas' }}
                </button>
              </div>
              <button class="btn btn-primary btn-block" type="submit">Guardar</button>
              <button type="button" @click="irAtras" class="btn btn-primary btn-block">
                Ir atrás
              </button>
              <div class="d-flex align-items-center">
                <div v-if="userIsAdmin" class="d-flex align-items-center">
                  <FormSwitch
                    label="Ocultar botón de registrarme"
                    v-model="showRegisterButton"
                    @change="toggleRegisterButton"
                  />
                  <i
                    class="fa fa-info-circle fa-2x ml-2"
                    title="Esta opción oculta el botón de registrarse en el login para evitar que cualquier usuario cree una cuenta con permisos especiales. Así, solo los administradores podrán hacer cambios importantes."
                    style="cursor: pointer"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div v-if="userIsAdmin" class="card-body px-4 pb-4">
          <h1>Crear cuenta de usuario</h1>
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
                  :type="mostrarContraseñaCrearCuenta ? 'text' : 'password'"
                  v-model="formulario.password"
                  placeholder="Ingrese su contraseña"
                  class="form-control"
                />
                <button
                  type="button"
                  @click="toggleMostrarContraseñaCrearCuenta"
                  class="btn btn-primary btn-block"
                >
                  {{ mostrarContraseñaCrearCuenta ? 'Ocultar contraseña' : 'Mostrar contraseña' }}
                </button>
              </div>
              <button type="submit" class="btn btn-primary btn-block">
                Crear cuenta de usuario
              </button>
            </div>

            <!-- Botón de Enviar -->
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormSwitch from '@/components/Form/FormSwitch.vue'

export default {
  components: {
    FormSwitch
  },
  data: () => ({
    form: {
      new_password: null,
      new_password_confirmation: null,
      password: null
    },
    formulario: {
      name: '',
      email: '',
      password: '',
      role: 'user' // Set role to user
    },
    mostrarContraseña: false, // Estado para mostrar/ocultar la contraseña en el formulario de cambiar contraseña
    mostrarContraseñaCrearCuenta: false, // Estado para mostrar/ocultar la contraseña en el formulario de crear cuenta
    formSubmitted: false // Estado para rastrear si se ha intentado enviar el formulario
  }),
  computed: {
    userIsAdmin() {
      const user = this.$store.state.auth && this.$store.state.auth.user
      return user && user.role === 'admin'
    },
    showRegisterButton: {
      get() {
        return !this.$store.getters.showRegisterButton
      },
      set(value) {
        this.$store.dispatch('toggleShowRegisterButton', value)
      }
    }
  },
  methods: {
    savePassword() {
      this.formSubmitted = true // Marcar que se ha intentado enviar el formulario
      this.$store.dispatch('updateProfile', this.form).then(() => {
        this.resetForm()
        this.formSubmitted = false // Restablecer el estado después de enviar el formulario
      })
    },
    irAtras() {
      this.$router.go(-1) // Navegar a la página anterior
    },
    async crearCuenta() {
      if (!this.formulario.name || !this.formulario.email || !this.formulario.password) {
        this.$toast.error('Por favor, complete todos los campos.')
        return
      }

      console.log(this.formulario)

      this.$store.dispatch('registrar', this.formulario).then((data) => {
        this.$toast.success(data)
        this.resetFormulario()
      })
    },
    toggleMostrarContraseña() {
      // Cambia el estado de mostrar/ocultar la contraseña en el formulario de cambiar contraseña
      this.mostrarContraseña = !this.mostrarContraseña
    },
    toggleMostrarContraseñaCrearCuenta() {
      // Cambia el estado de mostrar/ocultar la contraseña en el formulario de crear cuenta
      this.mostrarContraseñaCrearCuenta = !this.mostrarContraseñaCrearCuenta
    },
    resetForm() {
      this.form.new_password = null
      this.form.new_password_confirmation = null
      this.form.password = null
    },
    resetFormulario() {
      this.formulario.name = ''
      this.formulario.email = ''
      this.formulario.password = ''
      this.formulario.role = 'user'
    },
    toggleRegisterButton() {
      this.$store.dispatch('toggleShowRegisterButton', this.showRegisterButton)
    }
  }
}
</script>
