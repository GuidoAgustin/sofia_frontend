<template>
  <div class="d-flex align-items-center justify-content-center h-100">
    <div class="card mx-4">
      <div class="card-header text-center">
        <img src="/img/logosofia.png" alt="Logo Despensa Sofia" class="brand-logo my-3" />
        <small class="logo-text">Sistema de Gestión</small>
      </div>
      <div class="card-body px-4 pb-4">
        <div class="input-group" style="position: relative; text-align: right">
          <div
            class="input-group-prepend"
            style="position: absolute; top: 50%; right: 1px; transform: translateY(-50%)"
          >
            <span class="input-group-text">
              <i class="fa fa-envelope" aria-hidden="true"></i>
            </span>
          </div>
          <input
            type="email"
            v-model="form.email"
            class="form-control"
            placeholder="Ingrese su email "
          />
        </div>
        <div class="input-group">
  <div class="input-group-prepend" style="position: absolute; top: 56%; right: 25px; transform: translateY(-50%);">
    <span class="input-group-text">
      <i class="fa fa-lock" aria-hidden="true"></i>
    </span>
  </div>
  <input
    :type="mostrarContraseña ? 'text' : 'password'"
    v-model="form.password"
    @keyup.enter="signIn"
    class="form-control"
    placeholder="Ingrese su contraseña"
  />
</div>

        <button type="button" @click="toggleMostrarContraseña" class="btn btn-primary btn-block">
          {{ mostrarContraseñaTexto }}
        </button>
        <FormSwitch label="Recordarme" v-model="form.remember" small />

        <button class="btn btn-primary btn-block" @click="signIn">Ingresar</button>
        <button class="btn btn-primary btn-block" @click="$router.push('/registro')">
          Registrarme
        </button>

        <div class="text-center mt-3">
          <small> by GuidoB. </small>
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
    mostrarContraseñaTexto() {
      return this.mostrarContraseña ? 'Ocultar contraseña' : 'Mostrar contraseña'
    }
  },
  methods: {
    signIn() {
      this.$store
        .dispatch('login', this.form)
        .then(() => {
          this.$router.push('/dashboard')
        })
        .catch((err) => this.$toast.error(err))
    },
    toggleMostrarContraseña() {
      this.mostrarContraseña = !this.mostrarContraseña
    }
  }
}
</script>
