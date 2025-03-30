<template>
  <div class="d-flex align-items-center justify-content-center h-100">
    <div class="card mx-4">
      <div class="card-body px-4 pb-4">
        <h1 class="text-center mb-4">Crear cuenta de administrador</h1>
        <FormText
          label="Crear nombre de usuario"
          v-model="formulario.name"
          placeholder="Ingrese su nombre de usuario"
          icon="fa fa-user"
        />
        <FormText
          label="Ingrese su Gmail"
          v-model="formulario.email"
          placeholder="Ingrese su Gmail"
          icon="fa fa-envelope"
        />
        <FormText
          label="Cree una Contraseña"
          v-model="formulario.password"
          :password="!mostrarContraseña"
          placeholder="Ingrese su contraseña"
          icon="fa fa-lock"
        >
          <FormButton
            :icon="mostrarContraseña ? 'fa fa-eye' : 'fa fa-eye-slash'"
            @click="toggleMostrarContraseña"
            class="p-0 m-0"
          />
        </FormText>
        <FormButton
          class="btn btn-primary btn-block"
          @click="crearCuenta"
          theme="primary"
          block
        >
          Crear cuenta
        </FormButton>
        <FormButton
          class="btn btn-secondary btn-block"
          @click="irAtras"
          theme="secondary"
          block
        >
          Ir atrás
        </FormButton>
        <div class="text-center mt-3">
          <small> by GuidoB. </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormText from '../../components/Form/FormText.vue'
import FormButton from '../../components/Form/FormButton.vue'

export default {
  components: {
    FormText,
    FormButton
  },
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
      this.mostrarContraseña = !this.mostrarContraseña
    },
    irAtras() {
      this.$router.go(-1) // Navegar a la página anterior
    }
  }
}
</script>