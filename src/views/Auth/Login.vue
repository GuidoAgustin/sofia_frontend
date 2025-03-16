<template>
  <div class="d-flex align-items-center justify-content-center h-100">
    <div class="card mx-4">
      <div class="card-header text-center">
        <img src="/img/logosofia.png" alt="Logo Despensa Sofia" class="brand-logo my-3" />
        <small class="logo-text">Sistema de Gestión</small>
      </div>
      <div class="card-body px-4 pb-4">
        <FormText label="Email" v-model="form.email" icon="fa fa-envelope" />
        <FormText label="Contraseña" v-model="form.password" :password="!mostrarContraseña" icon="fa fa-lock">
          <FormButton
            :icon="mostrarContraseña ? 'fa fa-eye' : 'fa fa-eye-slash'"
            @click="toggleMostrarContraseña"
            class="p-0 m-0"
          />
        </FormText>
        <FormSwitch label="Recordarme" v-model="form.remember" small />
        <FormButton
          class="btn btn-primary btn-block"
          @click="signIn"
          theme="primary"
          block
        >
          Ingresar
        </FormButton>
        <FormButton
          v-if="showRegisterButton"
          class="btn btn-primary btn-block"
          @click="$router.push('/registro')"
          theme="primary"
          block
        >
          Registrarme
        </FormButton>

        <div class="text-center mt-3">
          <small> by GuidoB. </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormSwitch from '@/components/Form/FormSwitch.vue'
import FormText from '../../components/Form/FormText.vue'
import FormButton from '../../components/Form/FormButton.vue'

export default {
  components: {
    FormSwitch,
    FormText,
    FormButton
  },
  data: () => ({
    form: {
      email: null,
      password: null,
      remember: true
    },
    mostrarContraseña: false // Estado para mostrar/ocultar la contraseña
  }),
  beforeMount() {
    this.$store.dispatch('setCredentials')
    const isLoggedIn = this.$store.getters.isLoggedIn

    if (isLoggedIn) {
      this.$router.push('/dashboard')
    }

    const default_email = localStorage.getItem('default_email')
    const default_pw = localStorage.getItem('default_pw')
    if (default_email) this.form.email = default_email
    if (default_pw) this.form.password = default_pw
  },
  computed: {
    showRegisterButton() {
      return this.$store.getters.showRegisterButton
    }
  },
  methods: {
    signIn() {
      this.$store
        .dispatch('login', this.form)
        .then(() => {
          this.$router.push('/dashboard')
        })
        .catch((err) => {
          const errorMessage = err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : 'Error al iniciar sesión';
          this.$toast.error(errorMessage);
        });
    },
    toggleMostrarContraseña() {
      this.mostrarContraseña = !this.mostrarContraseña
    }
  }
}
</script>
