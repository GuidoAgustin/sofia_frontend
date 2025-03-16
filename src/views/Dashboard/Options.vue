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
            <FormText
              label="Nueva Contraseña"
              v-model="form.new_password"
              :password="!mostrarContraseña"
              placeholder="Ingrese su nueva contraseña"
            >
              <FormButton
                :icon="mostrarContraseña ? 'fa fa-eye' : 'fa fa-eye-slash'"
                @click.prevent="toggleMostrarContraseña"
                class="p-0 m-0"
              />
            </FormText>

            <!-- Campo de Repetir Nueva Contraseña -->
            <FormText
              label="Repetir Nueva Contraseña"
              v-model="form.new_password_confirmation"
              :password="!mostrarContraseña"
              placeholder="Repita su nueva contraseña"
            >
              <FormButton
                :icon="mostrarContraseña ? 'fa fa-eye' : 'fa fa-eye-slash'"
                @click.prevent="toggleMostrarContraseña"
                class="p-0 m-0"
              />
            </FormText>

            <!-- Campo de Contraseña Actual -->
            <FormText
              label="Contraseña Actual"
              v-model="form.password"
              :password="!mostrarContraseña"
              placeholder="Ingrese su contraseña actual"
            >
              <FormButton
                :icon="mostrarContraseña ? 'fa fa-eye' : 'fa fa-eye-slash'"
                @click.prevent="toggleMostrarContraseña"
                class="p-0 m-0"
              />
            </FormText>

            <FormButton
              class="btn btn-primary btn-block"
              type="submit"
              theme="primary"
              block
            >
              Guardar
            </FormButton>
            <FormButton
              type="button"
              @click="irAtras"
              class="btn btn-primary btn-block"
              theme="primary"
              block
            >
              Ir atrás
            </FormButton>
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
        </form>
        <div v-if="userIsAdmin" class="card-body px-4 pb-4">
          <h1>Crear cuenta de usuario</h1>
          <form @submit.prevent="crearCuenta">
            <!-- Campo de Usuario -->
            <FormText
              label="Crear usuario"
              v-model="formulario.name"
              placeholder="Ingrese su nombre de usuario"
            />

            <!-- Campo de Gmail -->
            <FormText
              label="Ingrese su Gmail"
              v-model="formulario.email"
              type="email"
              placeholder="Ingrese su Gmail"
            />

            <!-- Campo de Contraseña -->
            <FormText
              label="Cree una Contraseña"
              v-model="formulario.password"
              :password="!mostrarContraseñaCrearCuenta"
              placeholder="Ingrese su contraseña"
            >
              <FormButton
                :icon="mostrarContraseñaCrearCuenta ? 'fa fa-eye' : 'fa fa-eye-slash'"
                @click.prevent="toggleMostrarContraseñaCrearCuenta"
                class="p-0 m-0"
              />
            </FormText>

            <FormButton
              type="submit"
              class="btn btn-primary btn-block"
              theme="primary"
              block
            >
              Crear cuenta de usuario
            </FormButton>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormSwitch from '@/components/Form/FormSwitch.vue'
import FormText from '@/components/Form/FormText.vue'
import FormButton from '@/components/Form/FormButton.vue'

export default {
  components: {
    FormSwitch,
    FormText,
    FormButton
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